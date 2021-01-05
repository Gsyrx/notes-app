// // to load a module we need 'require' function
// const fs = require('fs');

// // if file(notes.txt) doesnot exist it will create a file
// // and if a file exist it will add the new content
// fs.writeFileSync('notes.txt', 'Myself Gaurav Kumar,');

// fs.appendFileSync('notes.txt', ' I live in Bangalore');

// const add = require('./notes');

// const sum = add(4, 2);

// // console.log(name);
// console.log(sum);

// const getNotes = require('./notes');

// const message = getNotes();

// console.log(message);

// const validator = require('validator');
// console.log(validator.isEmail('gaurav@gmail.com')); // true/false
// console.log(validator.isURL('https://gaurav.io')); // true/false

// const chalk = require('chalk');

// console.log(chalk.green('Success'));
// console.log(chalk.blue.bold('Success'));

// console.log(process.argv);
// console.log(process.argv[1]);

const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    // console.log('Title: ', argv.title);
    // console.log('Body: ', argv.body);
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
// console.log(yargs.argv);
