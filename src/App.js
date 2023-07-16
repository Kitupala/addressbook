import { useBook } from "./context/BookContext";
import "./index.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import InputForm from "./components/InputForm";
import AddressBook from "./components/AddressBook";
import AddressBookItem from "./components/AddressBookItem";

export default function App() {
  const { contacts, showBar } = useBook();
  const emptyBook = !contacts.length;

  return (
    <div className="container">
      <Header />
      {showBar && <SearchBar />}
      {!showBar && <InputForm />}
      {emptyBook && (
        <div className="empty-book">
          <h2>You have no contacts on AddressBook. Fill it up!</h2>
        </div>
      )}
      <AddressBook>
        <AddressBookItem />
      </AddressBook>
      <Footer />
    </div>
  );
}
