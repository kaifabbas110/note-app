import { useState, useEffect } from "react";
import "./App.css";
// import { notes } from "./data";
function App() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState(() => {
    const storedNotes = getNotesFromLocalStorage();
    return storedNotes.length > 0 ? storedNotes : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const addOrUpdateNote = () => {
    if (input) {
      setNotes([...notes, { note: input }]);
      setInput("");
    }
  };

  const pressEnterKey = (event) => {
    if (event.key === "Enter") {
      addOrUpdateNote();
    }
  };
  const editNote = (e, i) => {
    // e.note = "";
    setInput(e.note);
    setEditIndex(i);
    setEditModal(!editModal); // Show the edit modal
    // document.querySelector(".body").style.filter = "blur(1rem)";
    // document.querySelector(".modal").style.filter = "blur(1rem)";
  };

  // Function to save the edited note
  const saveNote = () => {
    // document.querySelector(".body").style.filter = "blur(0rem)";
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = { note: input };
      setNotes(updatedNotes);
      setEditIndex(null);
      setInput("");
      setEditModal(!editModal); // Close the edit modal
    }
  };
  const cancelNote = () => {
    // document.querySelector(".body").style.filter = "blur(0rem)";
    setInput("");
    setEditModal(!editModal);
  };

  const deleteNote = (i) => {
    setNotes(notes.filter((e, index) => i !== index));
    if (editIndex === i) {
      setEditIndex(null);
      setInput("");
    }
  };

  function saveNotesToLocalStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  function getNotesFromLocalStorage() {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  }

  useEffect(() => {
    const storedNotes = getNotesFromLocalStorage();
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    saveNotesToLocalStorage(notes);
  }, [notes]);

  return (
    <>
      <div className="body">
        <h1>My Note App</h1>
        {editModal && (
          <div className="modal">
            <div className="editModal">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <div>
                <button type="button" onClick={saveNote}>
                  save
                </button>
                <button type="button" onClick={cancelNote}>
                  cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="addInput">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={pressEnterKey}
          />
          <button type="button" onClick={addOrUpdateNote}>
            add note
          </button>
        </div>
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
      </div>
    </>
  );
}

export default App;
