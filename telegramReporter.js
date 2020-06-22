require("dotenv").config();
const fs = require("fs");
const token = process.env.TELEGRAM_BOT_TOKEN
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(token, { polling: true });

const chatIdFilePath = process.env.TELEGRAM_CHAT_ID_FILE_PATH;
const maxOneObjectValueLength = process.env.TELEGRAM_MAX_ONE_OBJECT_VALUE_LEGTH;
const maxStringLength = process.env.TELEGRAM_MAX_STRING_LENGTH;

class TelegramReporter {
    constructor() {
        if (process.env.TELEGRAM_BOT_ENABLE == "true") {
            TelegramReporter.checkActivation();
        }
    }

    static checkActivation() {
        try {
            bot.onText(/\/start/, (msg) => {
                if (TelegramReporter.writeDataTofile(msg.chat.id)) {
                    bot.sendMessage(
                        msg.chat.id,
                        `Telegram chat id saved:"${msg.chat.id}"`,
                        { parse_mode: "HTML" }
                    );
                }
            });
        } catch (e) {
            return reject(e);
        }
    }

    static async sendMessage(data) {
        try {
            const text = await TelegramReporter.parseMessage(data);
            const chatId = await TelegramReporter.readDataFromFile();
            if (!chatId)
                throw new Error(
                    'Telegram chat id not saved, add bot to chat and write "/start" command'
                );
            bot.sendMessage(chatId, `${text}`, {
                parse_mode: "HTML",
            }).catch((e) => {
                throw new Error(
                    "Error pasting message inside TelegagramReportService"
                );
            });
        } catch (e) {
            return reject(e);
        }
    }

    static async parseMessage(data) {
        try {
            if (typeof data === "string") {
                data = await TelegramReporter.parseString(data);
            }
            if (typeof data === "object") {
                data = await TelegramReporter.parseObject(data);
            }
            return data;
        } catch (e) {
            return e;
        }
    }

    static parseString(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (data.length > maxStringLength) {
                    const cutedLength = data.length - maxStringLength;
                    const data = data.substr(0, data.length - cutedLength);
                }
                console.log(data);
                return resolve(data);
            } catch (e) {
                return e;
            }
        });
    }

    static parseObject(object) {
        try {
            let result = ``;
            for (let key in object) {
                let value = object[key];
                if (typeof value === "object") {
                    value = JSON.stringify(value);
                }
                if (typeof value === "string") {
                    if (value.length > maxOneObjectValueLength) {
                        let cutedLength =
                            value.length - maxOneObjectValueLength;
                        value = value.substr(0, value.length - cutedLength);
                    }
                }
                result += `\n<b>${key}</b>: <code>${value} </code>`;
            }
            return result;
        } catch (e) {
            return e;
        }
    }

    static async writeDataTofile(data) {
        fs.writeFile(chatIdFilePath, data, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }

    static async readDataFromFile() {
        return new Promise(async (resolve, reject) => {
            await fs.readFile(chatIdFilePath, (err, data) => {
                return resolve(data.toString());
            });
        });
    }
}

module.exports = TelegramReporter;
