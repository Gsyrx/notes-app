// console.log('notes.js');

// const name = 'Gaurav';

// const add = function (a, b) {
//   return a + b;
// };

// // module.exports = name;
// module.exports = add;

// const getNotes = function () {
//   return 'Your Notes...';
// };

// module.exports = getNotes;

const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(function (note) => {
  //   return note.title === title;
  // });

  // filter run for all the elements whether it statify the condition at the starting or not
  // so we can use find method here, find exits after the first match condition
  // const duplicateNotes = notes.filter((note) => note.title === title);

  // if (duplicateNotes.length === 0) {
  //   notes.push({
  //     title: title,
  //     body: body,
  //   });

  //   saveNotes(notes);
  //   console.log(chalk.green.inverse('New note added'));
  // } else {
  //   console.log(chalk.red.inverse('Note title exists'));
  // }
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse('No note found'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note does not exist'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
