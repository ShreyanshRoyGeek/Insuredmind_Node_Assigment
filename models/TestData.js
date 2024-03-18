
const mongoose = require("mongoose")

let testDataSchema = new mongoose.Schema({
    agent : {
        type : String
    },
    userType : {
        type : String
    },
    policyMode : {
        type : String
    },
    producer : {
        type : String
    },
    policyNumber : {
        type : String
    },
    premiumAmountWritten : {
        type : String
    },
    premiumAmount : {
        type : String
    },
    policyType : {
        type : String
    },
    companyName : {
        type : String
    },
    categoryName : {
        type : String
    },
    policyStartDate : {
        type : String
    },
    policyEndDate : {
        type : String
    },
    csr : {
        type : String
    },
    accountName : {
        type : String
    },
    email : {
        type : String
    },
    gender : {
        type : String
    },
    firstName : {
        type : String
    },
    city : {
        type : String
    },
    accountType : {
        type : String
    },
    phone : {
        type : String
    },
    address : {
        type : String
    },
    state : {
        type : String
    },
    zip : {
        type : String
    },
    dob : {
        type : String
    },
    primary : {
        type : String
    },
    applicantId : {
        type : String
    },
    agencyId : {
        type : String
    },
    hasActiveClientPolicy : {
        type : String
    },
})


const TestData = new mongoose.model("TestData", testDataSchema)
module.exports = TestData

