
const schedule = require("node-schedule")
const TestData = require("../models/TestData")
const moment = require("moment")


const jobAtRecurrentInterval =  async (timeInerval) => {

    /* At Recurrent Interval  - Using Crown */  
    
    // "*/5 * * * *" // --> At every 5 minutes  -> crown expression
    // "*/1 * * * * *" // --> At every 1 Second (seconds info are provided by schedule module)


    try {

        let { crownEpression, numberOfTimesJobExecute } = req.body
    
        // crownEpression = "*/1 * * * *"  // (Every 1 minute) Sample data 
        // numberOfTimeJobExecute = 4 // Sample data
        
    
        let count = 0
        
        const mjob = schedule.scheduleJob(crownEpression, async () => {
        
            console.log("I ran @", new Date().toString())
    
            const data = {
                "agent":"Alex Watson",
                "userType":"Active Client",
                "policyMode":"12",
                "producer":"Brandie Placencia",
                "policyNumber":"YEEX9MOIBU7X",
                "premiumAmountWritten":"",
                "premiumAmount":"1180.83",
                "policyType":"Single",
                "companyName":"Integon Gen Ins Corp",
                "categoryName":"Commercial Auto",
                "csr":"Tami Ellison",
                "accountName":"Lura Lucca & Owen Dodson",
                "email":"madler@yahoo.ca",
                "gender":"",
                "firstName":"Lura Lucca",
                "city":"MOCKSVILLE",
                "accountType":"Commercial",
                "phone":"8677356559",
                "address":"170 MATTHIAS CT",
                "state":"NC",
                "zip":"27028",
                "dob":"1960-02-11",
                "primary":"",
                "agencyId":"",
            }
    
            await TestData.create(data)
    
            
            if(count == numberOfTimesJobExecute){
    
                mjob.cancel()
    
                res.status(200).send({ success: true,  msg: "Schedule Jobs Completed" })
            }
        
            count++
        })
        
    } 
    catch (error) {
        
        console.log("jobAtRecurrentInterval Error", error)
        throw error
    }
}    




const jobAtCertainDateAndTime = async(req, res, next)  => {

    /* At Particular Date and Time */

    try {
        
        let  { date, time, data } = req.body

        // date = '2014-03-18' // smaple date  (YYYY-MM-DD) 
        // time = "14:21:01" // sample time  (hh-mm-ss) 
        // data = { "agent":"Alex Watson", "userType":"Active Client", }  // sample data to insert



        // let mydate = new Date(date)
        // console.log("mydate", mydate)

        // time = time.split(":")
        // console.log("time", time)

        // let mydate = new Date(date + "T00:00:00")
        // mydate.setHours(15, 35, 1)

        // s = "01.20 PM",
        // parts = s.match(/(\d+)\.(\d+) (\w+)/),
        // hours = /am/i.test(parts[3]) ? parseInt(parts[1], 10) : parseInt(parts[1], 10) + 12,
        // minutes = parseInt(parts[2], 10);

        // mydate.setHours(time[0])
        // mydate.setMinutes(time[1])

        // const timeData = moment("2015-01-16T01:29:00").format("hh:mm:ss a")
        // const someDate = new Date(dateAndTime)

        // var gmtDateTime = moment.utc("2015-10-24 20:00", "YYYY-MM-DD HH")
        // var local = gmtDateTime.local().format('YYYY-MMM-DD h:mm A');

        // console.log("gmtDateTime", gmtDateTime)


        

        
        dateAndTime = `${date}T${time}.000+5.30`
        
        // dateAndTime = "2024-03-18T03:32:00.000+5.30" // sample data

        console.log("dateAndTime", dateAndTime)
        
        someDate = new Date(dateAndTime)

        console.log("jobAtCertainDateAndTime Called") 

    
        schedule.scheduleJob(someDate, async() => {
    
            console.log("Job Ran @", new Date().toString())
    
            data = {
                "agent":"Alex Watson",
                "userType":"Active Client",
                "policyMode":"12",
                "producer":"Brandie Placencia",
                "policyNumber":"YEEX9MOIBU7X",
                "premiumAmountWritten":"",
                "premiumAmount":"1180.83",
                "policyType":"Single",
                "companyName":"Integon Gen Ins Corp",
                "categoryName":"Commercial Auto",
                "csr":"Tami Ellison",
                "accountName":"Lura Lucca & Owen Dodson",
                "email":"madler@yahoo.ca",
                "gender":"",
                "firstName":"Lura Lucca",
                "city":"MOCKSVILLE",
                "accountType":"Commercial",
                "phone":"8677356559",
                "address":"170 MATTHIAS CT",
                "state":"NC",
                "zip":"27028",
                "dob":"1960-02-11",
                "primary":"",
                "agencyId":"",
            }
    
            await TestData.create(data)
    
            res.status(200).send({ success: true,  msg: "Schedule Jobs Completed" })
    
        })

    } 
    catch (error) {

        console.log("jobAtCertainDateAndTime Error", error)
        throw error
    }

}




module.exports = { jobAtCertainDateAndTime, jobAtRecurrentInterval }