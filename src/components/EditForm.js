import { useState } from "react";
import { useKey } from "./useKey";

import Button from "../UI/Button";

export default function EditForm({ contact, dispatch }) {
  let [address, setAddress] = useState("");
  let [city, setCity] = useState("");
  let [postalCode, setPostalCode] = useState("");

  const id = contact.id;

  useKey("Escape", function () {
    dispatch({ type: "useKey" });
  });

  address = address.length > 0 ? address : contact.address;
  city = city.length > 0 ? city : contact.city;
  postalCode = postalCode.length > 0 ? postalCode : contact.postalCode;

  const editContact = {
    id,
    address,
    city,
    postalCode,
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "editContact", payload: editContact });
  }

  return (
    <div className="form-edit-contact-container">
      <form onSubmit={handleSubmit}>
        <div className="form-edit-contact">
          <label>Address</label>
          <input
            type="text"
            placeholder={contact.address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>City</label>
          <input
            type="text"
            placeholder={contact.city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>Postal code</label>
          <input
            type="text"
            placeholder={contact.postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <Button className={"button"}>Save</Button>
        </div>

        <div className="delete">
          <Button
            className={"button-outline"}
            onClick={() => dispatch({ type: "deleteContact", payload: id })}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
