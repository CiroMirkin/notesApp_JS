"use strict"

let notes = [{
    id: '0',
    title: 'drink',
    description: 'I need to drink some whater :)',
}]

export default class Note {
    constructor() {
        this.noteView = new View()
        this.storage = new StorageNotes('notes')
    }

    async createNote(newNote) {
        notes.push(newNote)
        await this.noteView.showNotes()
        this.storage.saveNotes()
    }

    async deleteNote(id) {
        notes = notes.filter(note => note.id !== id)
        await this.noteView.showNotes()
        this.storage.saveNotes()
    }
}

class View {
    constructor() {
        this.taskList = document.getElementById('notes')
    }
    
    async showNotes() {
        this.taskList.innerHTML = ''

        const taskListFragment = document.createDocumentFragment()
        notes.map(note => {
            taskListFragment.appendChild(this.createHTMLNote(note))
        })
        
        this.taskList.appendChild(taskListFragment)
    }

    createHTMLNote(note) {
        const noteNode = document.createElement('LI')

        noteNode.setAttribute('id', note.id)
        noteNode.classList.add('note')
        noteNode.innerHTML = `
            <h3 class="note__title">${note.title}</h3>
            <p class="note__description">${note.description}</p>
            <input type="button" name="delete-note" value="Delete">
        `

        return noteNode
    }
}

class StorageNotes {
    constructor(notesName) {
        this.storageName = notesName
    }

    saveNotes() {
        localStorage.setItem(this.storageName, JSON.stringify(notes))
    }

    updateNotes() {
        notes = JSON.parse(localStorage.getItem(this.storageName)) || notes
    }
}