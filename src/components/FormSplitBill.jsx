import { useState } from "react";
import Button from "./Button";

function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  // calculate the amount paid by the friend
  const paidByFriend = bill ? bill - paidByUser : "";

  // only allow numbers in the input
  const onlyNumber = (value) => {
    return Number(value.replace(/[^0-9]/g, ""));
  };

  // handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    handleSplitBill(whoIsPaying === "user" ? paidByUser : -paidByUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💸 Bill value</label>
      <input
        type="text"
        placeholder="How much was the bill?"
        value={bill}
        onChange={(e) => setBill(onlyNumber(e.target.value))}
      />

      <label>💸 Your expense</label>
      <input
        type="text"
        placeholder="How much did you pay?"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            onlyNumber(e.target.value) > bill
              ? paidByUser
              : onlyNumber(e.target.value)
          )
        }
      />

      <label>💸 {selectedFriend.name}&apos;s expense</label>
      <input
        type="text"
        placeholder="Amount paid by your friend"
        disabled
        value={paidByFriend}
      />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user"> You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <div>
        <Button>{selectedFriend ? "Split bill" : "Splited"}</Button>
      </div>
    </form>
  );
}

export default FormSplitBill;
