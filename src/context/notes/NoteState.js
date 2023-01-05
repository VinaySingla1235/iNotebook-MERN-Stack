import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "63b6bff09778559dff7cc905",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 1",
          "description": "Adding a new title 1",
          "tag": "General",
          "date": "2023-01-05T12:17:52.063Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        },
        {
          "_id": "63b6c0099778559dff7cc907",
          "user": "63b266435a1d9aba8ffbd15a",
          "title": "New title 2",
          "description": "Adding a new title 2",
          "tag": "General",
          "date": "2023-01-05T12:18:17.845Z",
          "__v": 0
        }
      ]
    const [notes,setNotes]=useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;