/*
Awesome Nodejs CommandLine Note application created by
Himel Rana
email: contact@himelrana-swe.com
blog: https://blog.himelrana-swe.com
portfolio: https://himelrana-swe.com
Creation Date: 01-11-2018
*/

const fs = require('fs');
const notes = require('./notes');
const yargs = require('yargs');

// Always try to maintain Law of DRY (Don't repeat yourself)
const titleOptions = {
    describe: 'Title Of Note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Note body',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List All Notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove [delete] a Note', {
        title: titleOptions
    })
    .help()
    .argv;
let command = argv._[0];

if (command) {
    console.log('Command: ' + command);
} else {
    console.log(" ====================================\n open help by typting: node app.js --help \n ====================================");
    console.log(" ====================================\n for how to add : node app.js add --help \n ====================================");
    process.exit();

}



if (command === 'add') {
    let conf = notes.addNote(argv.title, argv.body)
    if (conf) {
        console.log("Note Added");
        notes.logNotes(conf);
    } else {
        console.log("Title already taken")
    }

} else if (command === 'list') {
    let allNotes = notes.getAll();
    allNotes.forEach((note, index) => {
        console.log(index + 1 + ` - ${note.title}`);
    });
} else if (command === 'read') {
    let status = notes.getNote(argv.title);
    if (status) {
        notes.logNotes(status);
    } else {
        console.log("Note Not Found!");
    }
} else if (command === 'remove') {
    notes.removeNote(argv.title);
} else {
    console.log("Command not Recognized!");
}