import React, { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <div>
        <select
          name="quantity"
          className="quantity-select"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Item..."
          className="item-input"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="add-button">
          ADD
        </button>
      </div>
    </form>
  );
}

function Item({ item, onTogglePacked, onDeleteItem }) {
  return (
    <li style={{ textDecoration: item.packed ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onTogglePacked(item.id)}
      />
      {item.description} ({item.quantity}){" "}
      <button onClick={() => onDeleteItem(item.id)} className="delete-button">
        ❌
      </button>
    </li>
  );
}

function PackingList({ items, onTogglePacked, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onTogglePacked={onTogglePacked}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;

  if (packedPercentage != 100) {
    return (
      <footer className="stats">
        <em>
          You have {totalItems} items in the list. You already packed {packedItems} ({packedPercentage}%).
        </em>
      </footer>
    );
  }
  else {
    return (
      <footer className="stats">
        <em>
          You have fully packed for your trip.
        </em>
      </footer>
    );
  }
}

function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }
  function handleTogglePacked(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDeleteItem(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onTogglePacked={handleTogglePacked}
        onDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
