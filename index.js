"use strict"

import Note from "./note.js"
import getId from "./noteId.js"

const note = new Note()
note.storage.updateNotes()
note.noteView.showNotes()

const form = document.getElementById('form')
const inputText = document.getElementById('input-title')
const inputDescription = document.getElementById('input-description')
const inputBtnSubmit = document.getElementById('input-submit')

inputBtnSubmit.addEventListener('click', (e) => {
    e.preventDefault()

    const validation = validateInputs(inputText.value, inputDescription.value)
    
    if (validation) {
        note.createNote({
            id: getId(),
            title: inputText.value,
            description: inputDescription.value,
        })

        inputText.value = ''
        inputDescription.value = ''
    }
})

const validateInputs = (...inputs) => {
    const inputsWithSomeText = inputs.filter(input => !!input)

    return inputs.length == inputsWithSomeText.length
}

const notesElement = document.getElementById('notes')

notesElement.addEventListener('click', (e) => {
    if (e.target.name === 'delete-note') {
        note.deleteNote(e.target.parentElement.id)
    }
})