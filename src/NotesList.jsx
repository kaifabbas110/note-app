import React, { memo } from "react";

import "./App.css";
const NotesList = ({ notes, editNote, deleteNote }) => {
  console.log("list");
  return (
    <div className="notes">
      {notes.map((e, i) => {
        return (
          <div key={i} className="note">
            <p>{e.note}</p>
            <div>
              <button type="button" onClick={() => editNote(e, i)}>
                edit
              </button>
              <button type="button" onClick={() => deleteNote(i)}>
                delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(NotesList);
