export default function ExpenseForm({
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
  
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <input
        type="number"
        placeholder="Price"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div style={{ marginTop: "12px" }}>
        <button type="submit">UpdateExpense</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
