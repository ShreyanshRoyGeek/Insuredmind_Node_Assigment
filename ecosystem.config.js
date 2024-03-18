module.exports = {
 
    apps: [
        {
            name: 'Insuredmind',
            script: 'app.js', // or the entry point of your application
            instances: 'max', // or specify the number of instances you want to run
            autorestart: true,
            watch: true, // set it to true if you want PM2 to watch for file changes and automatically restart your app
            max_memory_restart: '1G', // maximum memory threshold before a restart
            env: {
                NODE_ENV: 'production' // set your environment variables here
            },
            env_production: {
                NODE_ENV: 'production' // environment variables for production
            }
        }
    ]

    /*

        "start": "nodemon app.js"
        "start": "pm2 start app.js --watch",
        process.exit() 

        # Start all applications
        pm2 start ecosystem.config.js

        # Stop all
        pm2 stop ecosystem.config.js

        # Restart all
        pm2 restart ecosystem.config.js

    */

};
