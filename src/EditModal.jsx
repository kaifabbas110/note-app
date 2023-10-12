import React, { memo, useEffect, useRef } from "react";
import { useMyContext } from "./App";

const EditModal = () => {
  const { enterKeyToAdd, input, setInput, saveNote, cancelNote } =
    useMyContext();
  const saveRef = useRef();
  useEffect(() => {
    saveRef.current.focus();
  }, []);
  console.log("modal");

  return (
    <>
      <div className="modal">
        <div className="editModal">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={enterKeyToAdd}
            value={input}
            ref={saveRef}
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
    </>
  );
};

export default memo(EditModal);
