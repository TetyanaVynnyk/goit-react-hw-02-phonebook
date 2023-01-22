import { Component } from 'react';

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import initialContacts from '../../data.json';

class Phonebook extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = contact => {
    const auditName = this.state.contacts.find(
      e => e.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (auditName) return alert(auditName.name + ' is already in contacts.');

    contact.id = nanoid();
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} changeFilter={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContacts={this.deleteContact}
        />
      </div>
    );
  }
}

export default Phonebook;

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  addContact: PropTypes.func,
  deleteContact: PropTypes.func,
  changeFilter: PropTypes.func,
};
