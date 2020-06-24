require("dotenv").config();
const fetch = require("node-fetch");
const { AUTH_TOKEN } = process.env;
const { GET, POST, PUT, DELETE } = require("./constants");
const TestsHandler = require("./testsHandler");
const TelegramReportService = require("./telegramReporter");

// const MainClass = require("./index");

class ApiCallHandler {
    static async sendCurrency(values) {
        try {
            // console.log(values)

            const {
                ticker,
                server,
                port,
                method,
                params,
            } = values;
            const methodUrl = "send";
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                methodUrl,
            });
            // console.log(params)
            setInterval(async () => {
                // console.log(`setInterva working ${ticker} ${params.sendCurrencyInteval}`)
                let result = await ApiCallHandler.fetchUrl(url, POST, params);
                const testResult = TestsHandler[method](result);
                let res = testResult
                if(res === undefined) res = false
                TelegramReportService.messageParser({ticker, port, method, res});
            }, params.sendCurrencyInteval);
            return ApiCallHandler.fetchUrl(url, POST, params);
        } catch (e) {
            return e;
        }
    }

    static async getAdminBalance(values) {
        try {
            const {
                ticker,
                server,
                port,
                getInterval,
                method,
            } = values;
            const methodUrl = "admin/balance";
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                methodUrl,
            });
            setInterval(async () => {
                let result = await ApiCallHandler.fetchUrl(url);
                const testResult = TestsHandler[method](result);
                TelegramReportService.messageParser({ticker, port, method, 'res':testResult});
            }, getInterval);
            return ApiCallHandler.fetchUrl(url);
        } catch (e) {
            return e;
        }
    }
    // let telegramMessage = {
    //     ticker: item.ticker,
    //     port: item.port,
    //     method: item.method,
    //     res: item.res,
    // };

    static async getBlockNumber(values) {
        try {
            const {
                ticker,
                server,
                port,
                getInterval,
                method,
            } = values;
            const methodUrl = "block/count";
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                methodUrl,
            });
            setInterval(async () => {
                let result = await ApiCallHandler.fetchUrl(url);
                const testResult = TestsHandler[method](result);
                // console.log(ticker, port, method, testResult)
                TelegramReportService.messageParser({ticker, port, method, 'res':testResult});
            }, getInterval);
        } catch (e) {
            return e;
        }
    }

    static async validateAddress(values) {
        try {
            const {
                ticker,
                server,
                port,
                getInterval,
                method,
            } = values;
            const methodUrl = `address/validate/${address}`;
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                methodUrl,
            });
            setInterval(async () => {
                let result = await ApiCallHandler.fetchUrl(url);
                const testResult = TestsHandler[method](result);
                cosnsole.log(`testRes ${testResult}`)
                TelegramReportService.messageParser({ticker, port, method, 'res':testResult});
            }, getInterval);
        } catch (e) {
            return e;
        }
    }

    static composeUrl(values) {
        try {
            const { ticker, methodUrl, data, server, port } = values;
            return `${server}:${port}/${ticker}/${methodUrl}`;
        } catch (error) {
            return error;
        }
    }
    //
    static fetchUrl(url, methodUrl = GET, params = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let formBody;
                if (methodUrl === POST || methodUrl === PUT) {
                    formBody = [];
                    for (var property in params) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(params[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                }
                fetch(url, {
                    method: methodUrl,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: AUTH_TOKEN,
                    },
                    body: formBody,
                })
                    .then((res) => {
                        let bufferBody =
                            res.body._readableState.buffer.head.data;
                        let fromBuffer = bufferBody.toString("utf8");
                        let result;
                        try {
                            JSON.parse(fromBuffer);
                            result = JSON.parse(fromBuffer);
                        } catch {
                            result = false;
                        }
                        return resolve(result);
                    })
                    .catch((e) => {
                        let result = false;
                        resolve(result);
                    });
            } catch (e) {
                return resolve(false);
            }
        });
    }
}

module.exports = ApiCallHandler;
