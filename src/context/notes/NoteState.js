import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //getAllNotes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('iNotebook-token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO api call
    // console.log('adding a new notes')
    if (tag === "") tag = "general";
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('iNotebook-token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }), // body data type must match "Content-Type" header
    });
    const data = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(data);
    setNotes(notes.concat(data));
  };
  //delete a Note
  const deleteNote = async (id) => {
    //TODO: API call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('iNotebook-token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // const data = await response.json();
    // if(response.status()!=200){
    //   console.log("Error")
    //   return;
    // }
    // console.log(`deleted note with id ${id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note4
  const editNote = async (id, title, description, tag) => {
    // Default options are marked with *
    // console.log(`editing note with ${id}`)
    // console.log(id,title,description,tag);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('iNotebook-token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        _id: id,
        title: title,
        description: description,
        tag: tag,
      }), // body data type must match "Content-Type" header
    });
    await response.json(); // parses JSON response into native JavaScript objects

    //Logic to edit in client
    let editedNotes=[...notes];
    for (let index = 0; index < editedNotes.length; index++) {
      const element = editedNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
    setNotes(editedNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
