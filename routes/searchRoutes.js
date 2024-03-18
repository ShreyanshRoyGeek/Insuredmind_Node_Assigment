const router = require('express').Router()

const searchControllers = require("../controllers/searchController")

router.post("/searchPolicyInfoByUserName", searchControllers.searchPolicyByUserName)

router.post("/aggregatedPolicyByEachUser", searchControllers.aggregatedPolicyByEachUser)

module.exports = router
