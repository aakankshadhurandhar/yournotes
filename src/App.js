import { useState, useEffect } from "react";
import Editor from "./Components/Editor";
import Sidebar from "./Components/Sidebar";
import { projectFirestore, timestamp } from "./firebase/config";

function App() {
    const [notes, setNotes] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [newNoteId, setNewNoteId] = useState(null);

    useEffect(() => {
        projectFirestore
            .collection("notes")
            .orderBy("title", "desc")
            .onSnapshot((serverUpdate) => {
                const notes = serverUpdate.docs.map((_doc) => {
                    const data = _doc.data();
                    data["id"] = _doc.id;
                    return data;
                });
                // console.log(notes);
                setNotes(notes);
                setNewNoteId(null);
            });
    }, []);

    const selectNote = (note, index) => {
        setSelectedNote(note);
        setSelectedNoteIndex(index);
    };

    const newNote = async (title) => {
        const note = {
            title: title,
            body: "",
        };
        const newFromDB = await projectFirestore.collection("notes").add({
            title: note.title,
            body: note.body,
           timestamp,
        });
        const newId = newFromDB.id;
        setNotes([...notes, note]);
        setNewNoteId(newId);
    };

    useEffect(() => {
        if (newNoteId) {
            const newNoteIndex = notes.findIndex((_note) => _note.id === newNoteId);
            
            selectNote(notes[newNoteIndex], newNoteIndex);
            
        }
    }, [newNoteId, notes]);

    const deleteNote = async (note) => {
        const noteIndex = notes.indexOf(note);
        setNotes(notes.filter((_note) => _note.id !== note.id));
        if (selectedNoteIndex === noteIndex) {
            selectNote(null, null);
        } else {
            if (notes.length > 1) {
                setSelectedNoteIndex(selectedNoteIndex - 1);
            }
        }

        await projectFirestore.collection("notes").doc(note.id).delete();
    };

    const noteUpdate = async (id, note) => {
        if (id && note) {
            await projectFirestore.collection("notes").doc(id).update({
                title: note.title,
                body: note.body,
                timestamp,
            });
        }
        // console.log(id, note);
    };

    return (
        <div className="app-container">
            <Sidebar
                selectedNoteIndex={selectedNoteIndex}
                notes={notes}
                selectNote={selectNote}
                newNote={newNote}
                deleteNote={deleteNote}
            />
            {selectedNote ? (
                <Editor
                    selectedNote={selectedNote}
                    selectedNoteIndex={selectedNoteIndex}
                    notes={notes}
                    noteUpdate={noteUpdate}
                />
            ) : null}
        </div>
    );
}

export default App;
