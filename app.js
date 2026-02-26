//Import the Express module
import express from 'express';

//Create an instance of an Express application
const app = express();

//Define a port number where server will listen
const PORT = 3000;

//enable static file serving
app.use(express.static('public'));

//Set EJS as the view engine
app.set('view engine', 'ejs');

//"Middleware" that allows express to read the data in the form
// form data and store it in req.body
app.use(express.urlencoded({ extended:true }));

//Create a temporary array to store orders
const orders = [];


//Define our main route ("/")
app.get('/', (req, res) => {
    res.render('home');
});

//  contact Route
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

//  Comfirmation Route
app.get('/thank-you', (req, res) => {
    res.render('confirmation');
});

// Admin Route
app.get('/admin', (req,res) => {
    res.render('admin', { orders });
});

//  Submit Order Route
//{"fname":"paris","lname":"d","email":"df","method":"pickup","toppings":["pepperoni"],"size":"small","comment":"jhk,","discount":"on"}
app.post('/submit-order', (req, res) => {

    //Create a json object to store the order data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings ? req.body.toppings : "none",
        size: req.body.size,
        comment: req.body.comment, 
        timestamp : new  Date()
    };

    // Add order object to orders array
    orders.push(order);
    res.render('confirmation', { order : order });
});

//Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running gloriously on http://localhost:${PORT}`);
});