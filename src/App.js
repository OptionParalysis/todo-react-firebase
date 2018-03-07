import React, { Component } from 'react';
import './App.css';

import Note from './component/note';
import NoteForm from './component/noteForm';
import { DB_CONFIG } from './config';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    }
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.db.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.db.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  renderNote() {
    return (this.state.notes.map((note) => {
      return (
        <Note 
          noteContent={note.noteContent} 
          noteId={note.id} 
          key={note.id} 
          removeNote={this.removeNote}
        />
      )
    }))
  }

  addNote(note) {
    this.db.push().set({
      noteContent: note
    });
  }

  removeNote(noteId) {
    this.db.child(noteId).remove();
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>React Firebase Todo App</h1>
        </header>
        <main>
          <ul className="note-list">
            { this.renderNote() }
          </ul>
        </main>
        <footer>
          <NoteForm addNote={this.addNote} />
        </footer>
      </div>
    );
  }

}

export default App;
