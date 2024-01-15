import midTransClient from 'midtrans-client'

const coreApiConfig = new midTransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-WXjU7MLJdediHomo1VXs_-oL',
    clientKey: 'SB-Mid-client-2YtbHkr4INRVggbc'
})

export default coreApiConfig
