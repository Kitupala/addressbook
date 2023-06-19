import { useState } from "react";
import "./index.css";

const addressBook = [
  {
    id: 118836,
    lastName: "Virkkula",
    firstName: "Seppo",
    address: "Martinpolku 60",
    city: "Kouvola",
    postalCode: 45130,
  },
  {
    id: 115636,
    lastName: "Asikainen",
    firstName: "Tanja",
    address: "Kiesitie 57 A 2",
    city: "Tuusula",
    postalCode: 10210,
  },
  {
    id: 112836,
    lastName: "Mäkelä",
    firstName: "Sonja",
    address: "Ilmalankuja 41",
    city: "Pori",
    postalCode: 28840,
  },
  {
    id: 198336,
    lastName: "Rauhala",
    firstName: "Arto",
    address: "Rauhankatu 68",
    city: "Helsinki",
    postalCode: 10810,
  },
  {
    id: 196936,
    lastName: "Peltonen",
    firstName: "Janne",
    address: "Vanhamaantie 62",
    city: "Kotka",
    postalCode: 48300,
  },
];

export default function App() {
  const [contacts, setContacts] = useState(addressBook);
  const [showBar, setShowBar] = useState(true);
  const [sortBy, setSortBy] = useState("none");
  const [query, setQuery] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");

  function handleToggle() {
    setShowBar((curState) => !curState);
    setShowEdit(false);
  }

  function handleAddContact(newContact) {
    setContacts((contact) => [...contact, newContact]);
    setShowBar(true);
  }

  function handleShowEdit(id) {
    setShowEdit((curState) => !curState);
    setId(id);
    setShowBar(true);
  }

  function handleEditContact(editContact) {
    setContacts((contacts) =>
      contacts.map((contact) =>
        contact.id === editContact.id
          ? {
              ...contact,
              address: editContact.address,
              city: editContact.city,
              postalCode: editContact.postalCode,
            }
          : contact
      )
    );
    setShowEdit(false);
  }

  function handleDeleteContact(id) {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
    setShowEdit(false);
    console.log("delete");
  }

  return (
    <div className="container">
      <Header />
      {showBar && (
        <SearchBar
          contacts={contacts}
          onToggle={handleToggle}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setQuery={setQuery}
        />
      )}
      {!showBar && (
        <InputForm onToggle={handleToggle} onAddContact={handleAddContact} />
      )}
      {contacts.length === 0 && (
        <div className="empty-book">
          <h2>You have no contacts on AddressBook. Fill it up!</h2>
        </div>
      )}
      <AddressBook
        contacts={contacts}
        query={query}
        sortBy={sortBy}
        showEdit={showEdit}
        onShowEdit={handleShowEdit}
        id={id}
        onToggle={handleToggle}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />
      <Footer />
    </div>
  );
}

function Button({ children, onToggle }) {
  return (
    <button className="button" onClick={onToggle}>
      {children}
    </button>
  );
}

function ButtonOutlined({ children, onToggle, onDeleteContact }) {
  return (
    <button className="button-outline" onClick={(onToggle, onDeleteContact)}>
      {children}
    </button>
  );
}

function Header() {
  return (
    <div className="header ">
      <h1>AddressBook</h1>
      <h6>&mdash; Keep your contacts in order &mdash;</h6>
    </div>
  );
}

function SearchBar({ onToggle, sortBy, setSortBy, setQuery }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search... "
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="none">No spesific order</option>
        <option value="asc">Alphabetical ascending</option>
        <option value="desc">Alphabetical descending</option>
      </select>
      <Button onToggle={onToggle}>Add contact</Button>
    </div>
  );
}

function InputForm({ onToggle, onAddContact }) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const id = crypto.randomUUID();

  const newContact = {
    id,
    lastName,
    firstName,
    address,
    city,
    postalCode,
  };

  function handleSubmit(e) {
    if (!firstName || !lastName) return;
    e.preventDefault();
    onAddContact(newContact);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-add-contact">
        <label>First name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>Postal code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Button>Add</Button>

        <ButtonOutlined onToggle={onToggle}>Close</ButtonOutlined>
      </div>
    </form>
  );
}

function EditForm({ item, onEditContact, onDeleteContact }) {
  let [address, setAddress] = useState("");
  let [city, setCity] = useState("");
  let [postalCode, setPostalCode] = useState("");

  const id = item.id;

  address = address.length > 0 ? address : item.address;
  city = city.length > 0 ? city : item.city;
  postalCode = postalCode.length > 0 ? postalCode : item.postalCode;

  const editContact = {
    id,
    address,
    city,
    postalCode,
  };

  function handleSubmit(e) {
    e.preventDefault();
    onEditContact(editContact);
  }

  return (
    <div className="form-edit-contact-container">
      <form onSubmit={handleSubmit}>
        <div className="form-edit-contact">
          <label>Address</label>
          <input
            type="text"
            placeholder={item.address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>City</label>
          <input
            type="text"
            // value={city}
            placeholder={item.city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>Postal code</label>
          <input
            type="text"
            // value={postalCode}
            placeholder={item.postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Button onClick={onEditContact}>Save</Button>
        </div>
        <div className="delete">
          <ButtonOutlined onDeleteContact={() => onDeleteContact(id)}>
            Delete
          </ButtonOutlined>
        </div>
      </form>
    </div>
  );
}

function AddressBook({
  contacts,
  sortBy,
  query,
  showEdit,
  onShowEdit,
  id,
  onToggle,
  onEditContact,
  onDeleteContact,
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

  return (
    <div className="addressbook">
      <ul>
        {sortedContacts.map((contact, index) => (
          <AddressBookItem
            num={index}
            item={contact}
            key={contact.id}
            showEdit={showEdit}
            onShowEdit={onShowEdit}
            id={id}
            onToggle={onToggle}
            onEditContact={onEditContact}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </ul>
    </div>
  );
}

function AddressBookItem({
  num,
  item,
  showEdit,
  onShowEdit,
  id,
  onToggle,
  onEditContact,
  onDeleteContact,
}) {
  return (
    <li
      className={`addressbook ${showEdit && id === item.id ? "selected" : ""}`}
    >
      <span className="running-number">
        {num < 9 ? `0${num + 1}` : num + 1}
      </span>
      <h3>
        {item.lastName}, {item.firstName}
      </h3>
      <p>{item.address}</p>
      <p>
        {item.postalCode}&nbsp;
        {item.city}
      </p>
      <input
        type="checkbox"
        id={item.id}
        name="contact"
        value={showEdit}
        onChange={() => onShowEdit(item.id)}
        checked={id === item.id && showEdit}
      />
      {showEdit && id === item.id && (
        <EditForm
          item={item}
          onEditContact={onEditContact}
          onDeleteContact={onDeleteContact}
        />
      )}
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>2023 Ⓒopyright Kitupala | All Rights Reserved</p>
    </footer>
  );
}
