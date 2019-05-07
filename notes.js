const fs = require( 'fs' );
const chalk = require( 'chalk' );

const getNotes = () => {
    return 'Your notes...';
}

const addNote = ( title, body ) => {
    const notes = loadNotes( 'notes.json' );
    const duplicateNotes = notes.filter( ( note ) => {
        return note.title === title;
    });

    if ( duplicateNotes.length === 0 ) {
        notes.push( { 
            title: title,
            body: body
        });

        saveNotes( notes, 'notes.json' );

        console.log( chalk.green.inverse( 'New note added!' ) );
    }
    else {
        console.log( chalk.red.inverse( 'Note title is taken!' ) );
    }
}

const removeNote = ( title, file ) => {
    const notes = loadNotes( file );
    const notesToKeep = notes.filter( ( note ) => {
        return note.title !== title;
    });

    if ( notes.length > notesToKeep.length ) {
        console.log( chalk.green.inverse( 'Note removed' ) );
    }
    else {
        console.log ( chalk.red.inverse( 'no notes removed' ) );
    }

    saveNotes( notesToKeep, 'notes.json' );
}

const saveNotes = ( notes, file ) => {
    const dataJSON = JSON.stringify( notes );
    fs.writeFileSync( file, dataJSON );
}

const loadNotes = ( file ) => {
    try {
        const dataBuffer = fs.readFileSync( 'notes.json' );
        const dataJSON = dataBuffer.toString();
        const notes = JSON.parse( dataJSON );
        return notes;
    } 
    catch( error ) {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote
};