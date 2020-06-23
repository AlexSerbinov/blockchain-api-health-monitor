const { config } = require("./config.js");
const TelegramReportService = require("./TelegramReporter");

class ApiResultHandler {
    static sendCurrency(values) {
        try {
            const { ticker, server, port, res } = values;
            // console.log(`=-=--=-=-=-=-=-=-=- sendCurrency -=-=-=-=-=-=-=-=-`);
            if (res.result === true && res.txHash) {
                // console.log("Test passed:)");
                return true;
            } else if (res.result === false && res.message) {
                // console.log(`test failed:(`);
                return res.message;
            }
        } catch (error) {
            console.log(error);
        }
    }

    static getAdminBalance(values) {
        try {
            const { ticker, server, port, res } = values;
            // console.log(`=-=--=-=-=-=-=-=-=- getAdminBalance -=-=-=-=-=-=-=-=`);
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

    static validateAddress(values) {
        try {
            const { ticker, server, port, res } = values;
            // console.log(`=-=--=-=-=-=-=-=-=- validateAddress -=-=-=-=-=-=-=-=-`);
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

    static getBlockNumber(values) {
        try {
            const { ticker, server, port, res } = values;
            // console.log(`=-=--=-=-=-=-=-=-=- getBlockNumber -=-=-=-=-=-=-=-=-`);
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