import "./Expens.css";
export default function Expens({expenses,openExpenseModal}){
    return(
        <div className="Econtainer">
      <div className="exp">Expenses:<span>₹{expenses}</span></div>
      <button className="butn" onClick={openExpenseModal}>+Add Expense</button>
      </div>
    )
};