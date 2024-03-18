
const { parentPort, workerData } = require("worker_threads")
const TestData = require("../../models/TestData")


const uploadDocuments = async (response) => {

    try {

        console.log("Upload documents called")

        // console.log("respone[0]", response[0])

        let dataList = []
        response?.map(async (data) => {

            const sampleObj = {

                agent : data.agent,
                userType : data.userType,
                policyMode : data.policy_mode,
                producer : data.producer,
                policyNumber : data.policy_number,
                premiumAmountWritten : data.premium_amount_written,
                premiumAmount : data.premium_amount,
                policyType : data.policy_type,
                companyName : data.company_name,
                categoryName : data.category_name,
                policyStartDate: data.policy_start_date,
                policyEndDate: data.policy_end_date,
                csr : data.csr,
                accountName : data.account_name,
                email : data.email,
                gender : data.gender,
                firstName : data.firstname,
                city : data.city,
                accountType : data.account_type,
                phone : data.phone,
                address : data.address,
                state : data.state,
                zip : data.zip,
                dob : data.dob,
                primary : data.primary,
                applicantId : data.Applicant_ID,
                agencyId : data.agency_id,
                hasActiveClientPolicy : data.hasActive_ClientPolicy

            }

            dataList.push(sampleObj)
        })

        if(dataList.length > 0) {

            await TestData.create(dataList)
    
            const documentsCount = await TestData.countDocuments()
    
            console.log("documentsCount", documentsCount)

            parentPort?.postMessage(documentsCount)
    
           return documentsCount

        }
        else {

            parentPort?.postMessage(0)

            return {
                msg : "Please upload correct csv/excel file"
            }
        }

    
    } catch (error) {

        console.log("error while uploading", error)
        throw error
    
    }

}

uploadDocuments(workerData)


module.exports  =  uploadDocuments

