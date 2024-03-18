const TestData = require("../models/TestData")


const searchPolicyByUserName = async (req, res, next) => {

    try {

        const { userName } = req.body

        console.log("searchedUserName", userName)

        let data = []
        if(userName) {

            data = await TestData.find(
                { firstName: { $regex: userName, $options:"i" } },
                { policyMode: 1, policyNumber: 1, premiumAmount: 1, policyType: 1, policyStartDate: 1, policyEndDate: 1, firstName : 1 }
            )

        }

        console.log("searchPolicyByUserName Data::", data)

        res.status(200).send({ success: true, records: data?.length, msg: "Users successfully fetched!" })

    }
    catch (error) {

        console.log("Error in policySearchByUserName", error)
        throw error

    }

}



const aggregatedPolicyByEachUser = async (req, res, next) => {

    try {

        const data = await TestData.aggregate([

            /*  Aggregated User by PolicyType */
            // {
            //     $group: {
            //         _id: "$policyType", firstName: { $addToSet: '$firstName' }, count: { $sum: 1 }
            //     }
            // },

            // Output -> 2 // Single and Package type policy and all belonging users(firstName) list are there for these two policies 




            /* Aggregated Policy by Each User(firstname) - no duplicate user's exist) */
            // {
            //     $group: {
            //         _id: "$firstName", policy: { $addToSet: '$policyType' }, count: { $sum: 1 }
            //     }
            // },

            // Output -> 1198 // As user(firstname is all records are unique only, so all records are getting filtered)




            /* Aggregated Policy Info(ploicy_number, policyType, totalpremiumAmountByCompany) by Each User(company_name) ) */
            {
                $group: {
                    _id: { companyName : "$companyName"}, 
                    policyNumber: { $addToSet: '$policyNumber' }, policyType: { $addToSet: '$policyType' },  
                    totalpremiumAmountByCompany: { $sum : '$premiumAmount' },
                    count: { $sum: 1 }
                }
            },

            // Output -> 46 (As 46 unique companyName are there)
 
        ])


        res.status(200).send({ success: true, records: data?.length, msg: "Users Grouped by policies" })

    }
    catch (error) {

        console.log("aggregatedPolicyByEachUser error", error)
        throw error
    }

}


module.exports = { searchPolicyByUserName, aggregatedPolicyByEachUser } 