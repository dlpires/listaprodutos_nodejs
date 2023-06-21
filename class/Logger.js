const fs = require('fs/promises');

class Logger{

    static async writeLog(text){
        let currentDate = new Date().toJSON()//.slice(0, 10);
        //console.log(currentDate);
        let filename = currentDate+'.txt';
        let filePath = "logs/"+filename;

        //await fs.writeFile(filePath,text);
    }
}

module.exports = Logger;