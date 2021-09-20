import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title } = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {
        if ( note.id !== activeId.current ){
            reset(note);
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        dispatch( activeNote( formValues.id, { ...formValues }) )
    }, [formValues, dispatch])

    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='what happened today'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    note.url
                    &&
                    <div className='notes__image'>
                        <img
                            src='data:image/jpeg;base64,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'
                            alt='imagen'
                        />
                    </div>
                }
            </div>

        </div>
    )
}
