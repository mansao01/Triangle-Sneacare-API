import midTransClient from 'midtrans-client'

const coreApiConfig = new midTransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
})

export default coreApiConfig
