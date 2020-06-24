const ApiCallHandler = require("./ApiCallHandler");
const TelegramReportService = require("./telegramReporter");
TelegramReportService.checkActivation();
const TestsHandler = require("./testsHandler");
const { config } = require("./config.js");
require("dotenv").config();
class MainClass {
    static mainMethod() {
        // setInterval(() => {
            try {
                const curentConfig = config.filter((item) => {
                    if (item.ticker) return item;
                });
                curentConfig.forEach((item) => {
                    for (const method in item.methods) {
                        const params = {
                            ticker: item.ticker,
                            server: item.server,
                            port: item.port,
                            params: item.methods[method],
                            getInterval: item.getMethodsInterval,
                        };
                        params['method'] = method
                        ApiCallHandler[method](params).then((res) => {
                        });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        // }, 3000);
    }

}
module.exports = MainClass;
MainClass.mainMethod();
