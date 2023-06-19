require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./config/loveyoumyladysith.json');

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

async function getGoogleSpreadsheets(){

    const doc = new GoogleSpreadsheet(process.env.SPREAD_ID) //Got this from google spreadsheet URI

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo()
    console.log('### Lendo arquivo: ' + doc.title);

    var sheet = doc.sheetsByTitle[process.env.SHEET_NAME];

    return await sheet.getRows();
}

//ROUTES
app.get("/", async (req,res) => {
    var table = await getGoogleSpreadsheets();
    res.render("index", {table: table});
});

app.listen(process.env.PORT || 8000, () => {
    console.log("App rodando!");
});