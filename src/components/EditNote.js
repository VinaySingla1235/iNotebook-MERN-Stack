import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
const EditNote = (props) => {
  const context = useContext(noteContext);
  const { editNote } = context;
  const { Note } = props;
  const [note, setNote] = useState({
    _eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const UpdateNote = () => {
    document.getElementById("etitle").value = Note.title;
    document.getElementById("edescription").value = Note.description;
    document.getElementById("etag").value = Note.tag;
    document.getElementById("launch-edit-modal").click();
    setNote({
      _eid: Note._id,
      etitle: Note.title,
      edescription: Note.description,
      etag: Note.tag,
    })
  };
  useEffect(() => {
    if (props.editModalStatus >= 0) {
      UpdateNote();
    }
    // eslint-disable-next-line
  }, [props.editModalStatus]);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._eid, note.etitle, note.edescription, note.etag);
    document.getElementById("close-button").click();
    props.showAlert("Updated successfully","success");
  };
  const onChange = (e) => {
    // console.log("onChange clicked")
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(note)
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="launch-edit-modal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    onChange={onChange}
                    name="etitle"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    rows="7"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                id="close-button"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNote;
