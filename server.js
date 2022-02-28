const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');

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
    const { title, text } = req.body;
    if (title && text) {
        const note = {
            title,
            text,
            id: uuid
        }
        fs.readFile('./db/db.json', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const allNotes = JSON.parse(data);
                allNotes.push(note);
                fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(allNotes);
                    }
                })
            }
        })
    }
})
// give id to new note
// push to all notes

// DELETE /api/notes/:id 
// should receive a query parameter that 
// contains the id of a note to delete. 
// To delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, 
// and then rewrite the notes to the db.json file.

// // Deleting one
app.delete('/api/notes/:id', (req, res) => {
    let noteData = JSON.parse(fs.readFileSync('./db/db.json'));
    let note = (req.params.id).toString();
    const notesSaved = note.find(n => n.id === parseInt(req.params.id));
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData));
    res.json(noteData);
});

// GET * 
app.get('*', (req, res) => {
    // should return index.html
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));


// app.delete("/api/notes/:id", (req, res) => {
//     // Each note is given a unique id when it's saved
//     // To delete a note, read all notes from the db.json file
//     let noteData = fs.readFileSync('./db/db.json');
//     let noteTaker = JSON.parse(noteData);
//     // const notesSaved = noteTaker.filter(note => parseInt(note.id) !== parseInt(req.params.id));
//     const notesSaved = noteTaker.find(n => n.id === parseInt(req.params.id));
//     // select and delete selected note by removing the note with the given id property
//     const notesIndex = noteTaker.indexOf(notesSaved);
//     noteTaker.splice(notesIndex);

//     // rewrite the notes to the db.json file
//     fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteTaker), (err, data) => {
//         if (err) throw err;
//         //send response back to client
//         res.json(noteTaker)
//     });
// });