const os = require('os')
const { exec } = require('child_process')

const MAX_CPU_USAGE_PERCENTAGE = 70

let lastIdleTime = 0
let lastTotalTime = 0

function calculateCPUUsagePercentage() {

    console.log("calculateCPUUsagePercentage called")

    const cpus = os.cpus()

    let idleTime = 0
    let totalTime = 0

    cpus.forEach(cpu => {
        Object.keys(cpu.times).forEach(time => {
            totalTime += cpu.times[time]
        });
        idleTime += cpu.times.idle
    });

    const idleDifference = idleTime - lastIdleTime
    const totalDifference = totalTime - lastTotalTime

    const cpuUsage = 100 - ((100 * idleDifference) / totalDifference)

    lastIdleTime = idleTime 
    lastTotalTime = totalTime

    console.log(`Overall CPU Usage: ${cpuUsage.toFixed(2)}%`)

    if (parseInt(cpuUsage) > MAX_CPU_USAGE_PERCENTAGE) {
        console.log(`CPU usage exceeds ${MAX_CPU_USAGE_PERCENTAGE}%, restarting server...`)

        restartServerByKillingNodeMonProcess()

        // restartServerByPowerShellEnvironment()

        // restartServerUsing_pm2()

    }

}



function restartServerByKillingNodeMonProcess() {

    console.log('Restarting server...')

    // const killCommand = 'pkill -f nodemon'
    // const killCommand ='taskkill /F /IM node /T'
    // const killCommand ='taskkill /f /im nodemon.exe'
    // const killCommand = 'powershell.exe Get-Process nodemon | ForEach-Object { Stop-Process -Force $_.Id }';

    const killCommand = 'powershell.exe Get-Process nodemon';

    exec(killCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping server: ${error}`)
        } else {
            console.log('Server stopped successfully')
        }


        // Pause for 5 seconds before starting the server
        // setTimeout(() => {
            exec('nodemon app.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error starting server: ${error}`);
                    return;
                }
                console.log(`Server restarted successfully`);
            })
        // }, 5000)
    })

}


function restartServerByPowerShellEnvironment() {

    console.log('Restarting server...')

    function simulateCtrlC() {
        const child = spawn(process.platform === 'win32' ? 'cmd' : 'bash');
    
        // Wait for some time before sending Ctrl+C
        setTimeout(() => {
            // Send Ctrl+C signal
            child.kill('SIGINT');
        }, 2000); // Adjust the delay as needed
    
        // Handle process exit
        child.on('exit', (code, signal) => {

            console.log(`Process exited with code ${code} and signal ${signal}`);
            
            // Here you can add further actions based on the exit signal
            runNpmStart();
            
        });
    
        // Handle process output
        child.stdout.on('data', (data) => {
            console.log(`Child stdout:\n${data}`);
        });
    
        child.stderr.on('data', (data) => {
            console.error(`Child stderr:\n${data}`);
        });
    }
    
    simulateCtrlC();


    function runNpmStart() {
        // Execute 'npm start'
        const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start']);
    
        // Log stdout and stderr
        child.stdout.on('data', data => {
            console.log(`stdout: ${data}`);
        });
    
        child.stderr.on('data', data => {
            console.error(`stderr: ${data}`);
        });
    
        // Handle process exit
        child.on('exit', (code, signal) => {
            console.log(`Process exited with code ${code} and signal ${signal}`);
        });
    }

}


function restartServerUsing_pm2() {

    // 2nd way - If we are using pm2 rather than nodemon

    //pm2 start ecosystem.config.js  // To run with pm2 we have to add it in start script of package.json

    exec('pm2 stop app', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping server: ${error}`);
            return;
        }

        console.log('Server stopped successfully');

        // Pause for 5 seconds before starting the server
        setTimeout(() => {
            exec('pm2 start app', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error starting server: ${error}`);
                    return;
                }
                console.log(`Server restarted successfully`);
            })
        }, 5000)
    })


}



module.exports = { calculateCPUUsagePercentage }