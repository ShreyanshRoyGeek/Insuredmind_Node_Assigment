const csv = require("csvtojson")
const { Worker } = require("worker_threads")

const uploadDocuments = require("./workerThreads/TestDataImport")


const  importData =  async (req, res) => {
    
    try {
        
        csv().fromFile(req.file.path).then(async response => {

            // const documentsCount = await uploadDocuments(response)

            let workerData = response

            let worker = new Worker('./controllers/workerThreads/TestDataImport', { workerData })

            worker.on('message', (documentsCount) => {
                console.log("documentsCount worker emit", documentsCount)
                res.status(200).send({ success : true, uploadedCount: documentsCount, msg: "CSV Imported Successfully!" })
            })

            worker.on("error", (msg) => {
                res.status(404).send(`An error occurred: ${msg}`);
            })


        })

    } 
    catch (err) {
        res.send({ status: 400, success : false, msg: err.message })
    }

}

module.exports = { importData }

