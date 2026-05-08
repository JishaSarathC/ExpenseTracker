import "./ExpenseModal.css";
export default function ExpenseModal({
  title,
  setTitle,
  category,
  setCategory,
  amount,
  setAmount,
  date,
  setDate,
  onSubmit,
  onCancel,
  isEditing
}) {
  const handleSubmit=(e)=>{
    e.preventDefault();
    onSubmit();
  }
  return (
    <form className="expense" onSubmit={handleSubmit}>
    
      <input className="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input className="price"
        type="number"
        placeholder="Price"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select className="category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      
      <input className="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div style={{ marginTop: "12px" }}>
        <button className="add" type="submit">{isEditing ? "UpdateExpense" : "Add Expense"}</button>
        <button  className="cancel" onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      </div>
   
    </form>
  );
}
