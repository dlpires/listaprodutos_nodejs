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
            Logger.writeLog("Error:", error);
            return undefined;
        }
    }

    async convertToJSON(){
        this.table = await this.getTable();

        this.table.forEach(elem => {
            this.convertedTable[elem.n] = {
                produto: elem.produto,
                specs: elem.specs,
                link: elem.link,
                link_imagem: elem.link_imagem
            };
        });

        return this.convertedTable;
    }
}

module.exports = Reader;