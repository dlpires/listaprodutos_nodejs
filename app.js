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

//ROUTES
app.get("/", async (req,res) => {
    var table = await reader.getTable();
    writer.setInformationInProduct(30, {nome: "Diego", mensagem: "Teste 123"});
    res.render("index", {table: table});
});

app.listen(process.env.PORT || 8000, () => {
    console.log("App rodando!");
});