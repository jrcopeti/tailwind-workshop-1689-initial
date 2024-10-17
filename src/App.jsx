import { useEffect, useState } from "react";
import FormAddFriend from "./components/FormAddFriend";
import Button from "./components/Button";
import FormSplitBill from "./components/FormSplitBill";
import FriendsList from "./components/FriendsList";
import Header from "./components/Header";

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

export default function App() {
  // lifted up state
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");

  // show a message for 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  });

  // toggle the 'showAddFriend' state - show or hide the form
  const handleShowAddFriend = () => {
    setShowAddFriend((show) => !show);
  };

  // create a new array with the new 'friend' object
  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  // update the balance of the selected friend
  const handleSelectionFriend = (friend) => {
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  // update the balance of the selected friend
  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
    setMessage("Bill has been split successfully!");
  };

  return (
    <div>
      <Header />
      <div>
        {/* Left Column */}
        <div>
          <FriendsList
            friends={friends}
            selectedFriend={selectedFriend}
            handleSelectionFriend={handleSelectionFriend}
          />

          {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}

          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add Friend"}
          </Button>
        </div>

        {/* Right Column for Split Bill Form */}
        <div>
          {selectedFriend ? (
            <FormSplitBill
              selectedFriend={selectedFriend}
              handleSplitBill={handleSplitBill}
              key={selectedFriend.id}
            />
          ) : (
            <div>
              <p>Select a friend to split the bill.</p>
              {message && <p>{message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
