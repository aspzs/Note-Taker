const path = require('path');
const fs = require('fs');
//We gonna require uniqid to have different ids for delete a single note with an id
const uniqid = require('uniqid');

module.exports = (app) => {
    app.get('/api/notes', (req,res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'))
    });

//Gonna receive a note and gonna added to our json file
    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);
//We gonna use this 3 values for our notes, title, text and id
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };
        //Gonna push it to our json file
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);
    });

//Here we gonna delete the note with an specific id
    app.delete('/api/notes/:id', (req, res) => {
        //Gonna read our json file
        let db = JSON.parse(fs.readFileSync('db/db.json'))
        //Gonna delete the note with their id
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        //Gonna delete in our json file
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);
    })
};