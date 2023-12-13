require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const Logger = require('./Logger');

//INSERT YOUR CREDENTIALS
//REFERENCE --> https://www.npmjs.com/package/google-spreadsheet
const creds = require('../config/loveyoumyladysith.json');

class Connection{
    static async getConnection(){
        try {
            const serviceAccountAuth = new JWT({
                email: creds.client_email,
                key: creds.private_key,
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            });
            const doc = new GoogleSpreadsheet(process.env.SPREAD_ID, serviceAccountAuth) //Got this from google spreadsheet URI
    
            //await doc.useServiceAccountAuth(creds);
            
            await doc.loadInfo()
            //Logger.writeLog('### Lendo arquivo: ' + doc.title);
        
            var sheet = doc.sheetsByTitle[process.env.SHEET_NAME];
        
            //console.log(await sheet.getRows());

            return await sheet.getRows();

        } catch (error) {
            Logger.writeLog("Error:" + error);
            return undefined;
        }
    }
}

module.exports = Connection;