import Button from "./Button";

function Friend({ friend, handleSelectionFriend, selectedFriend }) {
  // check if the friend is selected
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={`${isSelected ? "" : ""}`}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p>
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p>
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even 🙌</p>}

      <Button onClick={() => handleSelectionFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Friend;
