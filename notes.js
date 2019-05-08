const fs = require( 'fs' );
const chalk = require( 'chalk' );

// add note
const addNote = (title, body) => {
    const notes = loadNotes( 'notes.json' );
    const duplicateNote = notes.find( (note) => note.title === title );
    
    if ( !duplicateNote ) {
        notes.push( { 
            title: title,
            body: body
        });

        saveNotes( notes, 'notes.json' );

        console.log( chalk.green.inverse('New note added!') );
    }
    else {
        console.log( chalk.red.inverse('Note title is taken!') );
    }
}

// remove note
const removeNote = (title, file) => {
    const notes = loadNotes( file );
    const notesToKeep = notes.filter( (note) => {
        return note.title !== title;
    });

    if ( notes.length > notesToKeep.length ) {
        console.log( chalk.green.inverse('Note removed') );
    }
    else {
        console.log ( chalk.red.inverse('no notes removed') );
    }

    saveNotes( notesToKeep, 'notes.json' );
}

// save note
const saveNotes = (notes, file) => {
    const dataJSON = JSON.stringify( notes );
    fs.writeFileSync( file, dataJSON );
}

// load notes
const loadNotes = (file) => {
    try {
        const dataBuffer = fs.readFileSync( file );
        const dataJSON = dataBuffer.toString();
        const notes = JSON.parse( dataJSON );
        return notes;
    } 
    catch( error ) {
        return [];
    }
}

// list notes
const listNotes = (file) => {
    const notes = loadNotes( file );

    console.log( chalk.inverse('Your Notes') );

    notes.forEach( (note) => {
        console.log( note.title );
    });
}

// read note
const readNote = (title, file) => {
    const notes = loadNotes( file );
    const note = notes.find( (note) => {
        return note.title === title;
    });

    if ( note ) {
        console.log( chalk.inverse.green('Title:', note.title) );
        console.log( note.body );
    }
    else {
        console.log( chalk.inverse.red('Note not found.') );
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};