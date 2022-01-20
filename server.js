const express = require('express');
const db = require('db');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML ROUTES 
// GET * 
app.get('/', (req, res) => {
    // should return index.html
})
// GET /notes
app.get('/notes', (req, res) => {
    // should return notes.html
})

// API ROUTES
// GET /api/notes
app.get('/api/notes', (req, res) => {
    // should read db.json file
    // return all saved notes as JSON
})
// POST /api/notes
app.post('/api/notes', (req, res) => {
    // receive a new note to save on the request body
    // add it to the db.json file
    // return the new note to the client with a unique id when it's saved (body-parser)
})


// // updating one
// app.post('/:id', (req, res) => {

// })
// // Deleting one
// app.delete('/:id', (req, res) => {

// })

// app.post('/api/notes', )

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));