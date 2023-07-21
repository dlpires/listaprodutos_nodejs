const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Reader = require("./class/Reader");
const Writer = require("./class/Writer");
const { version } = require("./package.json");
//const axios = require("axios");

//View engine
app.set('view engine', 'ejs');

//BODYPARSER - TO RECEIVE FORM DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Static
app.use(express.static('public'));

//PAGINATION - SET VALUES
var page = 1;
const limit = 9;

//OBJECTS
const reader = new Reader();
const writer = new Writer();

//ROUTES

app.get('/', (req, res) => {
    res.redirect("/list/1");
});

app.get('/convite', (req, res) => {
    setTimeout(() => {
        res.render("convite");
    }, 1000);
});

app.get('/obrigado', (req, res) => {
    setTimeout(() => {
        res.render("thanks");
    }, 1000);
});

app.get("/list/:page", async (req,res,next) => {
    page = req.params.page;

    setTimeout(async () => {
        try {
          var table = await reader.convertToJSON();
          var startIndex = (page - 1) * limit;
          var endIndex = page * limit;
  
          var result = Object.values(table).slice(startIndex, endIndex);
  
          //console.log(Object.keys(table).length);
  
          res.render("index", {result: result, page: page, limit: limit, total: Object.keys(table).length});
        } catch (err) {
          console.log(err);
          Logger.writeLog("Error:" + err);
          next(err)
        }
      }, 300);
});

//SAVE MESSAGE
app.post("/comprei/mensagem", async (req,res) => {
    var id = parseInt(req.body.numeroComprei);

    var data = {
        nome: req.body.nomeComprei,
        mensagem: req.body.mensagemComprei
    };

    //WRITE IN SPREADSHEET
    writer.setInformationInProduct(id, data);

    res.status(200);
    res.redirect("/obrigado");
});

//SERVER LISTENING
app.listen(process.env.PORT || 8000, () => {
    console.log("################################");
    console.log("## ListaCasamento - Started! ###");
    console.log('##          v'+version+'           ###');
    console.log("################################");
});