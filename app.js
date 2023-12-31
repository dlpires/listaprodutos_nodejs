const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var lodash = require("lodash");
const Reader = require("./class/Reader");
const Writer = require("./class/Writer");
const { version } = require("./package.json");
const Logger = require("./class/Logger");

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

//FILTER VARIABLE
//var text = "";

//OBJECTS
const reader = new Reader();
const writer = new Writer();

//ROUTES

app.get('/', (req, res) => {
    res.redirect("/list/1");
});

app.get('/clearFilter', (req, res) => {
    //text = "";
    res.redirect("/list/1");
});

app.get('/convite', (req, res) => {
    setTimeout(() => {
        res.render("convite");
        //res.redirect("https://bit.ly/casamentoalinediego");
    }, 1000);
});

app.get('/obrigado', (req, res) => {
    setTimeout(() => {
        res.render("thanks");
    }, 1000);
});

app.get("/list/:page", async (req,res,next) => {
    page = req.params.page;
    var text = req.query.search;

    setTimeout(async () => {
        try {
          var table = await reader.convertToJSON();

          //FILTERING
          var tableFiltered = lodash.filter(table, (res) => { return res.produto.toLowerCase().includes(text) });

          var total = Object.keys(tableFiltered).length == 0 ? Object.keys(table).length : Object.keys(tableFiltered).length;
          var startIndex = (page - 1) * limit;
          var endIndex = page * limit;
          
          //IF TABLEFILTERED HAVE A LIST FILTER, INCLUDE, ELSE INCLUDE ALL ROWS
          var result = Object.values(tableFiltered.length > 0 ? tableFiltered : table).slice(startIndex, endIndex);
  
          //CLEAN VARIABLE
          text = "";
          res.render("index", {result: result, page: page, limit: limit, total: total});
        } catch (TypeError) {
            Logger.writeLog("Error:" + TypeError);
            next(TypeError);
        }

      }, 300);
});

app.post("/filter", async (req,res) => {
    const search = req.body.search_filter_text.toLowerCase();

    setTimeout(async () => {
        try {
          res.redirect("/list/1?search="+search);
        } catch (err) {
          Logger.writeLog("Error:" + err);
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