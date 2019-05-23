//After installing yargs via npm, we must include it as a node module.
const yargs = require('yargs');
const notes = require('./notes');


//Customize yargs version
yargs.version('1.1.0');

//Create custom yargs add command
yargs.command({
    command: 'add',
    describe: '->Add a new note.',
    builder: {
        title:{
            describe: 'note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Overview of note',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) =>{
        notes.addNote(argv.title, argv.body);
    }
});

//Create custom yargs remove command
yargs.command({
    command: 'remove',
    describe: '->Remove a new note.',
    builder:{
      title: {
          describe: 'note title',
          demandOption: true,
          type: 'string',
      }
    },
    handler: (argv) =>{
        notes.removeNote(argv.title)
    }
});

//Create custom yargs list command
yargs.command({
    command: 'list',
    describe: '->List notes.',
    handler: () =>{
        notes.listNotes();
    }
});

//Create custom read command
yargs.command({
    command: 'read',
    describe: '->Read note.',
    builder:{
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) =>{
        notes.getNotes(argv.title);
    }
});

yargs.parse();