import React, { Component } from 'react';
import './noteForm.css';

class NoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: '',
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      newNoteContent: e.target.value,
    });
  }

  writeNote() {

    this.props.addNote(this.state.newNoteContent);

    // reset 
    this.setState({
      newNoteContent: '',
    });
  }

  render () {
    return (
      <div className="formWrapper">
        <input 
          type="text" 
          className="noteInput" 
          placeholder="Write a new note..." 
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
        />
        <button 
          className="noteButton"
          onClick={this.writeNote}
        >Add Note</button>
      </div>
    );
  }

}

export default NoteForm;