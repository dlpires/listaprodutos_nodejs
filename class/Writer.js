require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config/loveyoumyladysith.json');
const Logger = require('./Logger');
const Connection = require('./Connection');

class Writer{
    async setInformationInProduct(product_number, data){
        try {
            Logger.writeLog("New message: "+ JSON.stringify(data));
            var table = await Connection.getConnection();
            // set values
            //table[product_number-1].set('nome') = data.nome;
            //table[product_number-1].set('mensagem') = data.mensagem;
            table[product_number-1].assign(data);

            await table[product_number-1].save(); // save updates on a row

        } catch (error) {
            Logger.writeLog("Error: " + error);
        }
    }
}

module.exports = Writer;