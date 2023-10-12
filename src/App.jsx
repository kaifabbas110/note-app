import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import "./App.css";
import NotesList from "./NotesList";
import EditModal from "./EditModal";

export const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);
function App() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState(() => {
    const storedNotes = getNotesFromLocalStorage();
    return storedNotes.length > 0 ? storedNotes : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const addRef = useRef();

  const addNote = () => {
    if (input) {
      setNotes([...notes, { note: input }]);
      setInput("");
    }
  };

  const enterKeyToAdd = (event) => {
    if (event.key === "Enter") {
      addNote();
      addRef.current.blur();
      if (editIndex !== null) {
        saveNote();
        setEditModal(!editModal);
      }
    }
  };

  // const enterKeyToSave = (event) => {
  //   if (event.key === "Enter") {
  //     if (editIndex !== null) {
  //       saveNote();
  //       setEditModal(!editModal);
  //     }
  //   }
  // };

  //useCallBack() creates function only on initial render not on every render & updates function in response to notes array.
  const editNote = useCallback(
    (e, i) => {
      // e.note = "";

      setInput(e.note);
      setEditIndex(i);
      setEditModal(!editModal); // Show the edit modal
      // document.querySelector(".body").style.filter = "blur(1rem)";
      // document.querySelector(".modal").style.filter = "blur(1rem)";
    },
    [notes]
  );
  // useEffect(() => {
  //   saveRef.current.focus();
  // }, [editModal]);

  // Function to save the edited note
  const saveNote = () => {
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
    setEditIndex(null);
    setEditModal(!editModal);
  };

  //useCallBack() creates function only on initial render not on every render & updates function in response to notes array.
  const deleteNote = useCallback(
    (i) => {
      setNotes(notes.filter((e, index) => i !== index));
      if (editIndex === i) {
        setEditIndex(null);
        setInput("");
      }
    },
    [notes]
  );

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
    addRef.current.focus();
  }, []);

  useEffect(() => {
    saveNotesToLocalStorage(notes);
    console.log("render");
  }, [notes]);

  return (
    <>
      <MyContext.Provider
        value={{ enterKeyToAdd, input, setInput, saveNote, cancelNote }}
      >
        <div className="body">
          <h1>My Note App</h1>
          {/* {editModal && <EditModal editModal={editModal} />} */}
          {editModal && (
            <EditModal
              notes={notes}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          )}
          <div className="addInput">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={enterKeyToAdd}
              ref={addRef}
            />
            <button type="button" onClick={addNote}>
              add note
            </button>
          </div>
          <NotesList
            notes={notes}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        </div>
      </MyContext.Provider>
    </>
  );
}

export default App;
