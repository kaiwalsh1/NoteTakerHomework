const express = require('express');
const db = require('db');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.send('')
})

// app.post('/api/notes', )

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));