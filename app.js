const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Reader = require("./class/Reader");
const Writer = require("./class/Writer");
//const axios = require("axios");

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//OBJECTS
const reader = new Reader();
const writer = new Writer();

//PAGINATION
var page = 1;
const limit = 9;

//ROUTES
app.get("/", async (req,res) => {
    var table = await reader.convertToJSON();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const result = Object.values(table).slice(startIndex, endIndex);
    //writer.setInformationInProduct(30, {nome: "Diego", mensagem: "Teste 123"});
    res.render("index", {result: result, page: page, limit: limit, total: Object.keys(table).length});
});

app.get("/:page", async (req,res) => {
    page = req.params.page;

    //writer.setInformationInProduct(30, {nome: "Diego", mensagem: "Teste 123"});
    res.redirect("/");
});

app.listen(process.env.PORT || 8000, () => {
    console.log("App rodando!");
});