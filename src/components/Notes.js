import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import EditNote from "./EditNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [editModalStatus, setEditModalStatus] = useState(-1);
  const [editNoteValue, seteEditNoteValue] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("iNotebook-token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const editNote = (note) => {
    setEditModalStatus((editModalStatus + 1) % 10);
    seteEditNoteValue(note);
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <EditNote
        key={editNoteValue._id}
        editModalStatus={editModalStatus}
        Note={editNoteValue}
        showAlert={props.showAlert}
      />
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              editNote={editNote}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
