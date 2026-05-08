import "./BalanceModal.css";
export default function BalanceModal({
  balanceAmount,
  setBalanceAmount,
  onCancel,
  onSubmit
}) {
  const handleSubmit=(e)=>{
    e.preventDefault();
    onSubmit();
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className="BalanceModal">
      

      <input className="balanceinput"
        type="number"
        placeholder="Income Amount"
        value={balanceAmount}
        onChange={(e) => setBalanceAmount(e.target.value)}
      />

      <div >
        <button className="add"  type="submit" >Add Balance</button>
        <button className="cancel" type="button" onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      </div>
    </div>
    </form>
  );
}
