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
      name="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
      />
      <input className="price"
        type="number"
        placeholder="Price"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        autoComplete="off"
      />

      <select className="category" 
      value={category} 
      onChange={(e) => setCategory(e.target.value)}
      >
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
      <div className="expense-actions">
        <button className="add" type="submit">{isEditing ? "UpdateExpense" : "Add Expense"}</button>
        <button  className="cancel" 
        type="button" 
        onClick={onCancel} 
        >
          Cancel
        </button>
      </div>
   
    </form>
  );
}
