require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config/loveyoumyladysith.json');
const Logger = require('./Logger');
const Connection = require('./Connection');

class Reader{
    async getTable(){
        try {
            return await Connection.getConnection();
        } catch (error) {
            Logger.writeLog("Error:", error);
            return undefined;
        }
    }
}

module.exports = Reader;