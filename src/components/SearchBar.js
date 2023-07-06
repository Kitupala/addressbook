import { useRef } from "react";
import { useKey } from "./useKey";

import Button from "../UI/Button";

export default function SearchBar({ dispatch, sortBy }) {
  const input = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === input.current) return;
    input.current.focus();
    dispatch({ type: "useKey" });
  });

  return (
    <nav className="searchbar">
      <input
        type="text"
        placeholder="Search... "
        ref={input}
        onChange={(e) =>
          dispatch({
            type: "searchContact",
            payload: e.target.value.toLowerCase(),
          })
        }
      />
      <select
        value={sortBy}
        onChange={(e) =>
          dispatch({ type: "sortContacts", payload: e.target.value })
        }
      >
        <option value="none">No spesific order</option>
        <option value="asc">Alphabetical ascending</option>
        <option value="desc">Alphabetical descending</option>
      </select>
      <Button
        className={"button"}
        onClick={() => dispatch({ type: "showInput" })}
      >
        Add contact
      </Button>
    </nav>
  );
}
