import { Component } from 'react';

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import styles from './contactForm.module.css';

import initialContacts from '../../../data.json';

class ContactForm extends Component {
  state = {
    contacts: initialContacts,
    name: '',
    number: '',
  };

  handleChange = e => {
    const newName = e.target.form[0].value;
    const newPhone = e.target.form[1].value;
    this.setState({
      name: newName,
      number: newPhone,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.formWrapper} onSubmit={this.handleSubmit}>
        <label className={styles.inputTitle} htmlFor="nameId">
          Name
        </label>
        <input
          className={styles.formInput}
          type="text"
          name={name}
          nameid={nanoid()}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleChange}
        />
        <label className={styles.inputTitle} htmlFor="phoneId">
          Number
        </label>
        <input
          className={styles.formInput}
          type="tel"
          name={number}
          phoneid={nanoid()}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleChange}
        />
        <button className={styles.btn} type="submit">
          Add contacts
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};
