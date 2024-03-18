const router = require('express').Router()

const scheduleJobContoller = require("../controllers/scheduleJobContoller")


router.post("/scheduleByDateAndTime", scheduleJobContoller.jobAtCertainDateAndTime)

module.exports = router