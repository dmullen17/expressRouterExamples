// Base Express set up 
// ====================================================
const express = require('express');
const app = express();
const port = process.env.PORT || 8008;

// Routes 
//====================================================

app.get('/sample', (req, res) => {
    res.send('this is a sample!');
});

// Create an instance of the router 
const router = express.Router();

// Define routes
router.get('/', (req, res) => {res.send("I'm the home page!")});
router.get('/about', (req, res) => {res.send("I'm the aobut page!")});

// Apply the routes 
app.use('/', router);

// Start the server
//====================================================
app.listen(port);
console.log('App listening on ' + port);


// Router Middleware 
//====================================================
const routerMiddleware = express.Router();

// define middleware
routerMiddleware.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

routerMiddleware.get('/middle', (req, res) => {
    res.send('Activated the middleware!');
})
routerMiddleware.get('/metoo', (req, res) => res.send('I also triggered the middleware!'));

app.use('/middleware', routerMiddleware);


// Router with parameters  
//====================================================
const routerParameters = express.Router();

// we can also add middleware to parameter routes - for instance for validation
// we need to use the .params() method
routerParameters.param('name', (req, res, next, name) => {
    // do some validation 
    console.log('Validating: ' + name);

    // once validation is done save the item in the req object
    name = name + ' the greatest!';
    req.name = name; // this is different than req.params.name

    // go to the next function
    next();
})

routerParameters.get('/hello/:name', (req, res) => {
    res.send('hello ' + req.params.name + ', your new name is: ' + req.name);
});

// We can omit the path if we want it to use '/' by default
app.use(routerParameters);


// Route method 
//====================================================
app.route('/login')

    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
        res.send('this is the login form');
        console.log('this is the login form\n');
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
        console.log('processing the form!\n');
    });


