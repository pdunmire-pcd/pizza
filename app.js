//Import the Express module
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import { validateForm } from './validation.js';


//Load environment variables from .env file
dotenv.config();
console.log(process.env.DB_HOST);

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

//Create a pool bucket of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//Database test route
app.get('/db-test', async (req, res) => {
    try {
        const pizza_orders = await pool.query("SELECT * FROM orders");
        res.send(pizza_orders[0]);
    }catch (err) {
        console.error("Database Error:", err);
    }
});

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
app.get('/admin', async(req,res) => {
    //read all orderes from the database
    //newest first
    let sql = "SELECT * FROM orders ORDER BY timestamp DESC";
    const orders = await pool.query(sql);
    console.log(orders);
    res.render('admin', { orders: orders[0] });
});

//  Submit Order Route
//{"fname":"paris","lname":"d","email":"df","method":"pickup","toppings":["pepperoni"],"size":"small","comment":"jhk,","discount":"on"}
app.post('/submit-order', async (req, res) => {

    const order = req.body;

    const valid = validateForm(order);
    if (!valid.isValid) {
       console.log(valid); 
       res.render('home', {errors: valid.errors});
       return;
    }
    

    //Create an array of order data
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.method,
        Array.isArray(order.toppings) ? order.toppings.join(",") : "none",
        order.size,
    ];

    //insert a new order into the database
    const sql = `INSERT INTO orders (fname, lname, email, method, toppings, size)
    VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await pool.execute(sql, params);
    // Add order object to orders array
    // orders.push(order);
    res.render('confirmation', { order: order });
});

//Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running gloriously on http://localhost:${PORT}`);
});