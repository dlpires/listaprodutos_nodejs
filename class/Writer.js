require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config/loveyoumyladysith.json');
const Logger = require('./Logger');
const Connection = require('./Connection');

class Writer{
    async setInformationInProduct(product_number, data){
        try {
            var table = await Connection.getConnection();

            table.forEach(prod => {
                if(parseInt(prod.n) == product_number){
                    prod.nome = data.nome;
                    prod.mensagem = data.mensagem;
                }
            });
        } catch (error) {
            Logger.writeLog("Error:", error);
        }
    }
}

module.exports = Writer;