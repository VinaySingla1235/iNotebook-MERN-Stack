import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    document.getElementById("title").value="";
    document.getElementById("description").value="";
    document.getElementById("tag").value="";
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={onChange}
            name="title"
            minLength={3}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            rows="7"
            minLength={5}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button type="submit" disabled={note.title.length<3 || note.description.length<5} onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
