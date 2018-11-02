const fs = require('fs');

let fetchNotes = () => {
    try {
        let notestring = fs.readFileSync('note-data.json');
        return JSON.parse(notestring);
    } catch (e) {
        // No need to print anything just ignore this
    }
}

let saveNote = (notes) => {
    fs.writeFileSync("note-data.json", JSON.stringify(notes));
}
let addNote = (title, body) => {
    console.log('Adding: ', title, body);

    let notes = [];
    // After first time
    if (fetchNotes()) {
        notes = fetchNotes();
    }

    let note = {
        title,
        body
    }

    // checking duplicate
    let duplicateNotes = notes.filter((note) => note.title === title);



    // console.log(duplicateNotes);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }
};

let getAll = () => {
    return fetchNotes();
};

let removeNote = (title) => {
    console.log("Removing: ", title);
    let allnotes = fetchNotes();
    let remainingNotes = allnotes.filter((x) => x.title !== title);
    saveNote(remainingNotes);
    console.log("done");
};

let getNote = (title) => {
    console.log("Reading: ", title);
    let allnotes = fetchNotes();
    let specifique = allnotes.filter((n) => n.title === title);
    return specifique[0];

}

let logNotes = (note) => {
    console.log("--");
    console.log("Title: " + note.title);
    console.log("Body: " + note.body);
}
module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    logNotes
}