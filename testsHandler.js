const { config } = require("./config.js");
const TelegramReportService = require("./telegramReporter");

class ApiResultHandler {
    static sendCurrency(res) {
        try {
            if (res.result === true && res.txHash) {
                // console.log("Test passed:)");
                return true;
            } else if (res.result === false && res.message) {
                // console.log(`test failed:(`);
                return {
                    result: false,
                    message: res.message
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    static getAdminBalance(res) {
        try {
            if (res && (res.result === true && res.balance)) {
                // console.log("Test passed");
                return true;
            } else {
                // console.log(`test failed`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    static validateAddress(res) {
        try {
            if (res.result === true && res.balance) {
                // console.log("Test passed");
                return true;
            } else {
                // console.log(`test failed`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    static getBlockNumber(res) {
        try {
            if (res.result === true && res.number) {
                // console.log("Test passed");
                return true;
            } else {
                // console.log(`test failed`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ApiResultHandler;