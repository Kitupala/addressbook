import EditForm from "./EditForm";

export default function AddressBookItem({
  showEdit,
  id,
  sortBy,
  contacts,
  query,
  dispatch,
}) {
  let sortedContacts;

  if (sortBy === "none") sortedContacts = contacts;

  if (sortBy === "asc")
    sortedContacts = contacts
      .slice()
      .sort((a, b) => a.lastName.localeCompare(b.lastName));

  if (sortBy === "desc")
    sortedContacts = contacts
      .slice()
      .sort((b, a) => a.lastName.localeCompare(b.lastName));

  if (query !== "")
    sortedContacts = contacts.filter((contact) =>
      contact.lastName.toLowerCase().includes(query)
    );

  return sortedContacts.map((contact, index) => (
    <li
      className={`addressbook ${
        showEdit && id === contact.id ? "selected" : ""
      }`}
      key={contact.id}
    >
      <span className="running-number">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>
      <h3>
        {contact.lastName}, {contact.firstName}
      </h3>
      <p>{contact.address}</p>
      <p>
        {contact.postalCode}&nbsp;
        {contact.city}
      </p>
      <input
        type="checkbox"
        id={contact.id}
        name="contact"
        value={showEdit}
        onChange={() => dispatch({ type: "editContact", payload: contact.id })}
        checked={id === contact.id && showEdit}
      />

      {showEdit && id === contact.id && (
        <EditForm contact={contact} dispatch={dispatch} />
      )}
    </li>
  ));
}
