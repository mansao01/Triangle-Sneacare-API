'use strict'
import {Storage} from "@google-cloud/storage";
import dateFormat from "dateformat"
import path from "path"

const pathKey = path.resolve('./serviceaccountkey.json')

// TODO: Sesuaikan konfigurasi Storage
const gcs = new Storage({
    projectId: 'coffeebid-capstone',
    keyFilename: pathKey
})

// TODO: Tambahkan nama bucket yang digunakan
const bucketName = 'triangle-senacare'
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {}

ImgUpload.uploadToGcs = (req, res, next) => {
    if (!req.file) return next()

    const gcsName = dateFormat(new Date(), "yyyymmdd-HHMMss")
    const file = bucket.file(gcsName)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsName
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsName)
        next()
    })

    stream.end(req.file.buffer)
}

export default ImgUpload
