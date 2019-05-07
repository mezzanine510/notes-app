const chalk = require( 'chalk' );
const yargs = require( 'yargs' );
const notesUtils = require( './notes.js' );

// create add command
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
    handler: ( argv ) => {
        notesUtils.addNote( argv.title, argv.body );
    }
});

// create remove command
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
    handler: ( argv ) => {
        notesUtils.removeNote( argv.title, 'notes.json' );
    }
});

// create list notes command
yargs.command( {
    command: 'list',
    describe: 'List notes',
    handler: () => {
        console.log( 'Listing notes' );
    }
});

yargs.command( {
    command: 'read',
    describe: 'Read notes',
    handler: () => {
        console.log( 'Title: ', argv.title );
    }
});

yargs.parse();