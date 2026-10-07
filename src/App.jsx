import { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }

        return item;
      })
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}/>
    </div>
  );
}
function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItem }) {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (description.trim() === "") {
      setError("Please enter an item!");
      return;
    }
    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
    setError("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select onChange={(e) => setQuantity(e.target.value)} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>
      {error && <p>{error}</p>}
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => onToggleItem(item.id)}/>
            <span
              style={
                item.packed ? { textDecoration: "line-through" } : {}
              }
              >
              {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}