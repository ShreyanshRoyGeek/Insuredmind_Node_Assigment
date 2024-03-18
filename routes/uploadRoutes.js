const express = require("express")
const router = require('express').Router()

const path = require("path")
const multer = require("multer")
const bodyParser = require("body-parser")

const app = express() 

app.use(bodyParser.urlencoded({ extended : true }))

app.use(express.static(path.resolve(__dirname, "public")))



let storageDisk = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname)
    }
})


let upload = multer({ storage : storageDisk })


const uploadContoller = require("../controllers/uploadController")

router.post("/importData", upload.single("file"), uploadContoller.importData)



module.exports = router



