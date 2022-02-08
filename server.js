const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML ROUTES 
// GET /notes
app.get('/notes', (req, res) => {
    // should return notes.html
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// API ROUTES
// GET /api/notes
app.get('/api/notes', (req, res) => {
    // should read db.json file
    // return all saved notes as JSON
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
})

// POST /api/notes
app.post('/api/notes', (req, res) => {
    // receive a new note to save on the request body
    // add it to the db.json file
    // return the new note to the client with a unique id when it's saved (body-parser)
    const note = req.body;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const allNotes = JSON.parse(data);
            allNotes.push(note);
            console.log(allNotes);
            fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(note);
                }
            })
        }
    })

})
// give id to new note
// push to all notes

// DELETE /api/notes/:id
app.delete('/api/notes/:id', (req, res) => {

})

// GET * 
app.get('*', (req, res) => {
    // should return index.html
    res.sendFile(path.join(__dirname, './public/index.html'));
})


// // updating one
// app.post('/:id', (req, res) => {

// })
// // Deleting one
// app.delete('/:id', (req, res) => {

// })

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));