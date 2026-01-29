export default function BalanceForm({
  newBalance,
  setNewBalance,
  onCancel,
  onSubmit
}) {
  return (
    <div>
      

      <input
        type="number"
        placeholder="Income Amount"
        value={newBalance}
        onChange={(e) => setNewBalance(e.target.value)}
      />

      <div style={{ marginTop: "12px" }}>
        <button onClick={onSubmit}>Add Balance</button>
        <button onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
