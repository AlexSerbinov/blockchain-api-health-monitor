require("dotenv").config();
if (process.env.NODE_ENV === "development") {
    var DefaultUrl = process.env.IP_ADDRESS_DEV;
    var DefaultPort = process.env.PORT;
    var defaultGetInterval = 2500;
    var defaultSendTxInterval = 1500;
} else if (process.env.NODE_ENV === "production") {
    var DefaultUrl = process.env.IP_ADDRESS_PROD;
    var DefaultPort = "38635";
    var defaultGetInterval = 25000;
    var defaultSendTxInterval = 1800000;
}

module.exports.config = [
    {
        ticker: "XLM", // comment for disable currency
        server: DefaultUrl,
        port: DefaultPort,
        getMethodsInterval: defaultGetInterval,
        methods: {
            getAdminBalance: true,
            getBlockNumber: true,
            // validateAddress: {
            //     address:
            //         "GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER",
            // },
            sendCurrency: {
                sendCurrencyInteval: 4000,
                address:
                    "GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER",
                amount: 0.00001,
                memo: "HealthMonitor",
            },
        },
    },
    {
        ticker: 'XRP', // comment for disable currency
        server: DefaultUrl,
        port: DefaultPort,
        getMethodsInterval: defaultGetInterval,
        methods: {
            // getAdminBalance: true,
            // getBlockNumber: true,
            validateAddress: {
                address:
                    "GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER",
            },
            sendCurrency: {
                sendCurrencyInteval: 4000,
                address:
                    "GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER",
                amount: 0.00001,
                memo: "HealthMonitor",
            },
        },
    },
];
