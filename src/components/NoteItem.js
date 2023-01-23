import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;
  const formatDate = () => {
    const mongoDateString = note.date;

    const date = new Date(mongoDateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const userReadableDate = date.toLocaleDateString("en-US", options);

    return userReadableDate;
  };

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  props.editNote(note);
                }}
              ></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
          <div className="card-footer ">
            <div style={{ float: "left", display: "inline-block" }}>
              {note.tag}
            </div>
            <div
              className="text-muted"
              style={{ float: "right", display: "inline-block" }}
            >
              {formatDate()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
