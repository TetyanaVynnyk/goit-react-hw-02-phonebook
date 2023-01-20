import { Component } from 'react';

import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

import initialContacts from '../../data.json';

class Phonebook extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = ({name, number}) => {
    // console.log(text)
    const newContact = {
      id: nanoid(),
      name,
      number
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  render() {
    const {contacts} = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {/* <Filter /> */}
        <ContactList contacts={contacts} onDeleteContacts={this.deleteContact}/>
      </div>
    );
  }
}

export default Phonebook;
