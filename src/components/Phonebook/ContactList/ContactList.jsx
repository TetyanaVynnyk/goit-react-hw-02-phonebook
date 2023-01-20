const ContactList = ({ contacts, onDeleteContacts }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        <p>
          {name}:{number}
        </p>
        <button onClick={() => onDeleteContacts(id)} type="button">
          Delete
        </button>
      </li>
    ))}
  </ul>
);
export default ContactList;
