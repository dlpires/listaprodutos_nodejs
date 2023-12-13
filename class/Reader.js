require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config/loveyoumyladysith.json');
const Logger = require('./Logger');
const Connection = require('./Connection');

class Reader{
    constructor (){
        this.table = {};
        this.convertedTable = {};
    }
    
    async getTable(){
        try {
            return await Connection.getConnection();
        } catch (error) {
            Logger.writeLog("Error:" + error);
            return undefined;
        }
    }

    async convertToJSON(){
        try {
            this.table = await this.getTable();

            this.table.forEach(elem => {
                this.convertedTable[elem.get('n')] = {
                    n: elem.get('n'),
                    produto: elem.get('produto'),
                    specs: elem.get('specs'),
                    link: elem.get('link'),
                    link_imagem: elem.get('link_imagem'),
                    nome: elem.get('nome')
                };
            });

            return this.convertedTable;
        } catch (error) {
            Logger.writeLog("Error:" + error);
            return undefined;
        }
    }
}

module.exports = Reader;