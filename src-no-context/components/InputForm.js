import { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";

export default function InputForm({ dispatch }) {
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
    if (!firstName || !lastName) return;
    e.preventDefault();
    dispatch({ type: "addContact", payload: newContact });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-add-contact">
        <label>First name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          ref={input}
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
        <Button
          className={"button"}
          onClick={() => dispatch({ type: "addContact", payload: newContact })}
        >
          Add
        </Button>

        <Button
          className={"button-outline"}
          onClick={() => dispatch({ type: "showSearchbar" })}
        >
          Close
        </Button>
      </div>
    </form>
  );
}
