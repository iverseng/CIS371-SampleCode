// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')


const ToyController = require('./ToyController');
const toyController = new ToyController();

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object*/
const app = express()
const port = 3000


/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');


/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));



/* Display all toys */
app.get('/toys', (req, res) => {
    toyController.index(req, res);
});

/* Create a new toy */
app.post('/toys', (req, res) => {
    toyController.create(req, res);
});

/* Display a form to create a new toy */
app.get('/toys/new', (req, res) => {
    toyController.newToy(req, res);
});


/* Display details for one toy.  
   :id represents a "route parameter" */
app.get('/toys/:id', (req, res) => {
    toyController.show(req, res);
});

/* Edit a toy */
app.get('/toys/:id/edit', (req, res) => {
    toyController.edit(req, res);
});

/* Update a toy */
app.post('/toys/:id', (req, res) => {
    toyController.update(req, res);
});


app.get('/init', (req, res) => {
    require('./SqliteToyDB').initialize();
    res.send("Initialized.");
});

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))