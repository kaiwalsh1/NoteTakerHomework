const express = require('express');
const dbdata = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');
const res = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML ROUTES 
// GET /notes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    // should return notes.html
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API ROUTES
// GET /api/notes
app.get('/api/notes', (req, res) => {
    // should read db.json file
    // return all saved notes as JSON
    res.sendFile(path.join(__dirname, './db/db.json'));
});

// display single note
app.get('/api/notes/:note', (req, res) => {
    let noteSelected = req.params.note;
    console.log(noteSelected);
    res.json(noteSelected);
});

// POST /api/notes
app.post('/api/notes', (req, res) => {
    // receive a new note to save on the request body
    // add it to the db.json file
    // return the new note to the client with a unique id when it's saved (body-parser)
    // console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (title && text) {
        const note = {
            title,
            text,
            id: uuid(),
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const allNotes = JSON.parse(data);
                allNotes.push(note);
                fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(allNotes)
                    }
                });
            }
        });
    }
});

// Deleting one
app.delete('/api/notes/:id', (req, res) => {
    JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let note = (req.params.id).toString();
    noteData = noteData.filter (selected => {
        return selected.id !=noteId;
    })    
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData));
    res.json(noteData);
});

// GET * 
app.get('*', (req, res) => {
    // should return index.html
    res.redirect('index.html');
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));