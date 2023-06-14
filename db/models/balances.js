const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
    userId: {type: String, default: "0"},
    date: {type: Date, default: Date.now()},
    stocks: {
        real: {type: Number, default: 0.0},
        invested: {type: Number, default: 0.0}
    },
    bank: {type: Number, default: 0.0},
    cash: {type: Number, default: 0.0},
    crypto: {
        real: {type: Number, default: 0.0},
        invested: {type: Number, default: 0.0}
    }
});

/* ==================== Template queries ==================== */

/**
 * Adds a balance
 * @param {Object} data - data of the new Balance document 
 * @returns Balance document
 */
async function addOne(data) {
    const balance = new Balance(data);
    return await balance.save();
}

/**
 * Gets a list of balances that match a filter
 * @param {Object} where - filter to match
 * @param {String} select - fields to return
 * @param {Object} sort - fields to sort by and their order
 * @param {BigInt} limit - maximum number of results
 * @returns List of Balance documents
 */
async function getLastNSorted(where, select, sort, limit) {
    let balances = [];
    const result = await Balance.find(where, select).sort(sort).limit(limit).exec();
    for (let r of result)
        balances.push(r)
    return balances;
}

/* ==================== Specific queries ==================== */

/**
 * Adds a balance associated to a user
 * @param {String} user_id - ID of the user
 * @param {Date} date - timestamp of the insertion
 * @param {Number} stocks_real - real stocks amount
 * @param {Number} stocks_invested - invested stocks amount
 * @param {Number} bank - bank amount
 * @param {Number} cash - cash amount
 * @param {Number} crypto_real - real crypto amount
 * @param {Number} crypto_invested - invested crypto amount
 * @returns Balance document
 */
async function insertNew(user_id, date, stocks_real, stocks_invested, bank, cash, crypto_real, crypto_invested) {
    const data = {
        userId: user_id,
        date: date,
        stocks: {
            real: stocks_real,
            invested: stocks_invested
        },
        bank: bank,
        cash: cash,
        crypto: {
            real: crypto_real,
            invested: crypto_invested
        }
    };
    return await addOne(data);
}

/**
 * Gets the latest balance of a user
 * @param {String} user_id - ID of the user
 * @returns Balance document
 */
async function getLatestByUserId(user_id) {
    return await getLastNSorted({userId: user_id}, "-_id", {date: -1}, 1);
}

/**
 * Gets the yearly balance of a user
 * @param {String} user_id - ID of the user
 * @returns List of Balance documents
 */
async function getYearlyBalanceByUserId(user_id) {
    return await getLastNSorted({userId: user_id}, "-_id", {date: -1}, 12);
}

/**
 * Balance model
 */
const Balance = mongoose.model("Balance", balanceSchema);

module.exports = {
    Balance,
    insertNew,
    getLatestByUserId,
    getYearlyBalanceByUserId
};