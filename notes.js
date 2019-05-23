const fs = require('fs');
const getNotes = (title) => {
  const notes = loadNotes();
  const checkForNote = notes.find(note => note.title === title);
  if (checkForNote){
      console.log(`Title: ${checkForNote.title} Body: ${checkForNote.body}`);
  } else {
      console.log(`${title} not found.`);
  }
};

const addNote = (title, body) => {
    //Load current notes
    const notes = loadNotes();
    //Create a new array to filter all notes to find if the title is already taken.
    const duplicateNote = notes.find((note) =>{
        return note.title === title;
    });
    if (!duplicateNote){
        //add new object note to notes array
        notes.push({
            title: title,
            body: body,
        });
        //save the new notes
        saveNotes(notes);
        console.log(`${title} note added!`);
    } else {
        console.log(`Unable to store ${title} note, that title is already taken.`);
    }


};

const saveNotes = (notes) => {
    const noteToAdd = JSON.stringify(notes);
    fs.writeFileSync('notes.json', noteToAdd);
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

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note, i) => {
        console.log(`Note ${i + 1} ${note.title}: ${note.body}`);
  });
};

const removeNote = (title) => {
    //Load current notes
    const notes = loadNotes();
    //Create a new array to filter all notes and include the notes in the new array only if the notes title does not match the title being
    //passed in as this is the one we wish to remove.
    const NotesToSave = notes.filter((note) =>{
        return note.title !== title;
    });
    //compare the length of the two arrays to figure out if an element was found and removed.
    if (notes.length === NotesToSave.length){
        console.log(`${title} note NOT found.`);
    } else {
        //save the new array of notes that does not include the note specified from the param passed.
        saveNotes(NotesToSave);
        console.log(`${title} note removed.`);
    }
};


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
};