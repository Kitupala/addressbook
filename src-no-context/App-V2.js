import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import InputForm from "./components/InputForm";
import AddressBook from "./components/AddressBook";

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
