import { createContext, useContext, useReducer } from "react";

const BookContext = createContext();

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

const initialState = {
  contacts: [...addressBook],
  showBar: true,
  showEdit: false,
  sortBy: "none",
  query: "",
  id: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "addContact":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        showBar: true,
      };

    case "showInput":
      return {
        ...state,
        showBar: false,
        showEdit: false,
      };

    case "showSearchbar":
      return {
        ...state,
        showBar: true,
        showEdit: false,
      };

    case "sortContacts":
      return { ...state, sortBy: action.payload };

    case "searchContact":
      return { ...state, query: action.payload };

    case "editContact":
      return {
        ...state,
        showBar: true,
        showEdit: !state.showEdit,
        id: action.payload,

        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? {
                ...contact,
                address: action.payload.address,
                city: action.payload.city,
                postalCode: action.payload.postalCode,
              }
            : contact
        ),
      };

    case "deleteContact":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== state.id),
      };

    case "useKey":
      return { ...state, showEdit: false };

    default:
      throw new Error("Unknown error");
  }
}

function BookProvider({ children }) {
  const [{ contacts, showBar, showEdit, sortBy, query, id }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <BookContext.Provider
      value={{ contacts, showBar, showEdit, sortBy, query, id, dispatch }}
    >
      {children}
    </BookContext.Provider>
  );
}

function useBook() {
  const context = useContext(BookContext);
  if (context === undefined)
    throw new Error("BookContext was used outside of BookProvider");
  return context;
}

export { BookProvider, useBook };
