require("dotenv").config();
const fetch = require("node-fetch");
const { AUTH_TOKEN } = process.env;
const { GET, POST, PUT, DELETE } = require("./constants");

class ApiCallHandler {
    static async sendCurrency(values) {
        try {
            const { ticker, params, server, port } = values;
            const method = "send";
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                method,
            });
            return ApiCallHandler.fetchUrl(url, POST, params);
        } catch (e) {
            return e;
        }
    }

    static async getAdminBalance(values) {
        try {
            const { ticker, server, port } = values;
            const method = "admin/balance";
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                method,
            });
            return ApiCallHandler.fetchUrl(url);
        } catch (e) {
            return e;
        }
    }

    static async getBlockNumber(values) {
        try {
            const { ticker, server, port } = values;
            const method = "block/count";
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                method,
            });
            return ApiCallHandler.fetchUrl(url);
        } catch (e) {
            return e;
        }
    }

    static async validateAddress(values) {
        try {
            const { ticker, address, server, port } = values;
            const method = `address/validate/${address}`;
            const url = ApiCallHandler.composeUrl({
                server,
                port,
                ticker,
                method,
            });
            return ApiCallHandler.fetchUrl(url);
        } catch (e) {
            return e;
        }
    }

    static composeUrl(values) {
        try {
            const { ticker, method, data, server, port } = values;
            return `${server}:${port}/${ticker}/${method}`;
        } catch (error) {
            return error;
        }
    }
    //
    static fetchUrl(url, method = GET, params = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let formBody;
                if (method === POST || method === PUT) {
                    formBody = [];
                    for (var property in params) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(params[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                }
                fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: AUTH_TOKEN,
                    },
                    body: formBody,
                }).then((res) => {
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
                        let result = false
                        resolve (result)
                    });
            } catch (e) {
                return reject(e);
            }
        });
    }
}

module.exports = ApiCallHandler;
