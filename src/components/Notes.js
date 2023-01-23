import React, { useContext, useState, useEffect} from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import EditNote from "./EditNote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [editModalStatus,setEditModalStatus]=useState(-1);
  const [editNoteValue,seteEditNoteValue]=useState({});
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const editNote=(note)=>{
    setEditModalStatus((editModalStatus+1)%10);
    seteEditNoteValue(note);
  }
  return (
    <>
      <AddNote />
      <EditNote key={editNoteValue._id} editModalStatus={editModalStatus} Note={editNoteValue}/>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} editNote={editNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
