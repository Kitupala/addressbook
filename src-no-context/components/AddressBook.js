export default function AddressBook({ children }) {
  return (
    <main className="addressbook">
      <div>
        <ul>{children}</ul>
      </div>
    </main>
  );
}
