const chalk = require( 'chalk' );
const yargs = require( 'yargs' );
const notesUtils = require( './notes.js' );

const notesFile = 'notes.json';

// add note
yargs.command( {
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.addNote( argv.title, argv.body );
    }
});

// remove note
yargs.command( {
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.removeNote( argv.title, notesFile );
    }
});

// list notes
yargs.command( {
    command: 'list',
    describe: 'List notes',
    handler() {
        notesUtils.listNotes( notesFile );
    }
});

// read notes
yargs.command( {
    command: 'read',
    describe: 'Read notes',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.readNote( argv.title, notesFile );
    }
});



yargs.parse();