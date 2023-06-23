require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config/loveyoumyladysith.json');
const Logger = require('./Logger');

class Connection{
    static async getConnection(){
        try {
            const doc = new GoogleSpreadsheet(process.env.SPREAD_ID) //Got this from google spreadsheet URI
    
            await doc.useServiceAccountAuth(creds);
            await doc.loadInfo()
            Logger.writeLog('### Lendo arquivo: ' + doc.title);
        
            var sheet = doc.sheetsByTitle[process.env.SHEET_NAME];
        
            //console.log(await sheet.getRows());

            return await sheet.getRows();

        } catch (error) {
            Logger.writeLog("Error:", error);
            return undefined;
        }
    }
}

module.exports = Connection;