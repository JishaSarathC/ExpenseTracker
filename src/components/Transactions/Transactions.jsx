
import "./Transactions.css";
import { FaBowlFood } from "react-icons/fa6";
import { MdOutlineCardTravel } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineEdit } from "react-icons/md";


 const categoryIcon={
  Food: <FaBowlFood size={24}/>,
  Travel:   <MdOutlineCardTravel size={24}/>,
  Entertainment:  <IoIosFootball size={24}/>
}
export default function Transactions({expenses,isEmpty,onDelete,onEdit}) {
  //console.log(isEmpty,"test")
  if(isEmpty){
    return <p className="no-transactions">No transactions!</p>
  }
   return (
   
        <div className="transactions-list">
      {expenses.map((exp) => (
        <div key={exp.id} className="transaction">
          <div className="left">
            <span className="categoryicon">
             {categoryIcon[exp.category]}
             </span>
             
            
            <div className="items">
            <p>{exp.category} </p>
            <p> {exp.date}</p>
            </div>
          </div>
           
          <div className="amount">
            -₹{exp.amount}
          </div>
          <div className="right">
          <div className="actions">
            <TiDeleteOutline className="delete" onClick={()=>onDelete(exp.id)}/>
             <MdOutlineEdit  className="edit" onClick={()=>onEdit(exp)}/>
          </div>
          </div>
        </div>
      ))}
    </div>
      
        
  );
}