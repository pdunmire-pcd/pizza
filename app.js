//Import the Express module
import express from 'express';

//Create an instance of an Express application
const app = express();

//Define a port number where server will listen
const PORT = 3000;

//enable static file serving
app.use(express.static('public'));

//Define our main route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running gloriously on http://localhost:${PORT}`);
});