import React from "react";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <SplitForm />
    </div>
  );
}

function FriendsList() {
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectFriend(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <div>
      <ul>
        {initialFriends.map((friend) => (
          <Friend
            key={friend.id}
            id={friend.id}
            name={friend.name}
            img={friend.image}
            balance={friend.balance}
            onClick={() => handleSelectFriend(friend.id)}
            className={friend.id === selectedId ? "selected" : ""}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ id, name, img, balance, selectedId, onClick, className }) {
  return (
    // <li className={id === selectedId ? "selected" : ""}>
    <li className={className}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}$
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owe you {Math.abs(balance)}$
        </p>
      )}
      {balance === 0 && <p>You and {name} are even.</p>}
      <Button onClick={onClick}>Select</Button>
    </li>
  );
}

function SplitForm() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH $NAME</h2>

      <label>💰 Bill value</label>
      <input type="text"></input>

      <label>🧍‍♀️ Your expense</label>
      <input type="text"></input>

      <label>👫 $NAME's expense</label>
      <input type="text" disabled></input>

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">$NAME</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function FormAddFriend() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  return (
    <form className="form-add-friend">
      <label>👯‍♂️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌆Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}
