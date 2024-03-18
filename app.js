require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()


app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use(cors())


/* MongoDB Atlas Connection  */
mongoose.connect(process.env.MONGO_DB_ATLAS_CONNECTION_STRING, {
    useNewUrlParser : true,
    useUnifiedTopology : true 
})
.then(() => {
    console.log("Connected with MongoDB Atlas 👍")
})
.catch((err) => {
    console.log("Error connecting to mongodb", err)
})


/* Routes Imports  */
const uploadRoutes = require("./routes/uploadRoutes")
const searchRoutes = require("./routes/searchRoutes")
const scheduleJobRoutes  = require("./routes/scheduleJobRoute")


/* Routes Path  */
app.use("/", uploadRoutes)
app.use("/search", searchRoutes)
app.use("/schedule", scheduleJobRoutes)



const cpuUsage = require("./checkCPUUsage")
setInterval(cpuUsage.calculateCPUUsagePercentage, 60000); //60 seconds



const port = 8080
app.listen(port, () => {
    console.log(`Server is litening om port ${port} ✋`)
})



module.exports = app
