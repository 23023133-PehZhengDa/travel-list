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
      <dev>
        <button onClick={() => onDeleteItem(item.id)} className="delete-button">
          ❌
        </button>
      </dev>

    </li>
  );
}

function PackingList({ items, onTogglePacked, onDeleteItem }) {
  const [sortByPacked, setSortByPacked] = useState(false);

  const sortedItems = sortByPacked
    ? [...items].sort((a, b) => Number(a.packed) - Number(b.packed))
    : items;

  return (
    <div className="list">
      <div className="actions">
        <button onClick={() => setSortByPacked(!sortByPacked)}>
          {sortByPacked ? "Original" : "Sort by Not Packed"}
        </button>
      </div>
      <ul>
        {sortedItems.map((item) => (
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

  return (
    <footer className="stats">
      {packedPercentage === 100 ? (
        <div>You have fully packed for your trip.</div>
      ) : (
        <div>
          You have {totalItems} items in the list. You already packed {packedItems} (
          {packedPercentage}%).
        </div>
      )}
    </footer>
  );
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

  function handleClearAll() {
    setItems([]);
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
      <button onClick={handleClearAll} className="clear-button">
        Clear All
      </button>
    </div>
  );
}

export default App;
