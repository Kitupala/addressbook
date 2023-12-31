import { useEffect, useRef, useState } from "react";
import { useBook } from "../context/BookContext";

import Button from "../UI/Button";

export default function InputForm() {
  const { dispatch } = useBook();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const input = useRef(null);

  useEffect(function () {
    input.current.focus();
  }, []);

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
    e.preventDefault();
    if (!firstName || !lastName) return;
    dispatch({ type: "addContact", payload: newContact });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-add-contact">
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          ref={input}
        />

        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label htmlFor="postalCode">Postal code</label>
        <input
          id="postalCode"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Button
          className="button"
          // onClick={() => dispatch({ type: "addContact", payload: newContact })}
        >
          Add
        </Button>

        <Button
          className="button-outline"
          onClick={() => dispatch({ type: "showSearchbar" })}
        >
          Close
        </Button>
      </div>
    </form>
  );
}
