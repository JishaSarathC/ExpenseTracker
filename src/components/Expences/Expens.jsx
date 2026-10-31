import "./Expens.css";
export default function Expens({totalExpenses,openExpenseModal}){
    return(
        <div className="Econtainer">
      <div className="exp">Expenses:<span className="expense">₹{Number(totalExpenses).toFixed(2)}</span></div>
      <button className="butn" onClick={openExpenseModal}>+ Add Expense</button>
      </div>
    )
};