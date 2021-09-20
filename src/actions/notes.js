import  { db }  from "../firebase/firebase-config";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";

import { loadNotes } from "../helpers/loadNotes";

import { types } from '../types/types';

export const startNewNotes = () => {
  return async ( dispatch, getState ) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const docRef = await addDoc(collection(db, uid, 'journal', 'notes'), newNote)
  
    dispatch( activeNote ( docRef.id, newNote ))
    console.log(docRef)
  }
}


export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const startLoadingNotes = ( uid ) => {
  return async ( dispatch ) => {
    const notes = await loadNotes( uid );

    dispatch( setNotes(notes))
  }
}

export const setNotes = ( notes ) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = ( note ) => {
  return async( dispatch, getState ) => {
    const { uid } = getState().auth;

    if ( !note.url ) {
      delete note.url
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await updateDoc(doc(db, uid, 'journal', 'notes', note.id), noteToFirestore)
    
  }
}

