import {useState ,useEffect } from "react";
import "./Tracker.css";
import Balans from "../components/Balance/Balans.jsx"
import Expens from "../components/Expences/Expens.jsx" ;
import MyPieChart from "../components/Piechart/MyPieChart.jsx";
import Transactions from "../components/Transactions/Transactions.jsx"
import Modal from "../components/Modals/Modal.jsx";
import BalanceForm from "../components/Forms/BalanceForm.jsx";
import ExpenceForm from "../components/Forms/ExpenceForm.jsx";
import TinyBarChart from "../components/BarChart/TinyBarChart.jsx";

import {useSnackbar} from "notistack";
import { MdOutlineDashboardCustomize } from "react-icons/md";

export default function Tracker(){
    const [walletTotal,setWalletTotal]=useState(() => {
  const saved = localStorage.getItem("walletTotal");
  return saved ? JSON.parse(saved) : 5000;
});
    const [showBalanceModal,setShowBalanceModal]=useState(false);
    const [newBalance,setNewBalance]=useState("");
    const [expenses,setExpenses]=useState(() => {
  const saved = localStorage.getItem("expensesList");
  return saved ? JSON.parse(saved) : [];
});

    const [editingExpense, setEditingExpense]=useState(null);
    const [showExpenseModal,setShowExpenseModal]=useState(false);
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const [amount,setAmount]=useState("");
    const [date,setDate]=useState("");
    const [currentPage, setCurrentPage] =useState(1);
    
    const {enqueueSnackbar}=useSnackbar();
    const ITEMS_PER_PAGE=3;
    const totalPages=Math.ceil(expenses.length/ITEMS_PER_PAGE);
    const startIndex=(currentPage-1)*ITEMS_PER_PAGE;
    const endIndex=startIndex+ITEMS_PER_PAGE;

    const paginatedExpenses=expenses.slice(startIndex,endIndex);
    const safeCurrentPage=currentPage>totalPages ? totalPages || 1:currentPage;
useEffect(()=>{
    localStorage.setItem("expenseList", JSON.stringify(expenses));
},[expenses]);
    const handleAddBalance=()=>{
        if(!newBalance || Number(newBalance) <=0){
            enqueueSnackbar("Please enter a valid amount",{variant:"warning"});
            return;
        }

        setWalletTotal(prev=>prev+Number(newBalance));
        enqueueSnackbar("Balance added successfully",{variant:"success"});
        setNewBalance("");
        setShowBalanceModal(false);
        };
        const handleAddExpense=()=>{
            if(!title || !category || !amount ||!date){
                enqueueSnackbar("All fields are reqiured",{variant:"warning"});
                return;
            }
            if (Number(amount) > balance) {
    enqueueSnackbar("Not enough balance", { variant: "error" });
    return;
  }

  setExpenses(prev=>[...prev, { title, category, amount, date }]);
  //setBalance(balance - Number(amount));

  setTitle("");
  setCategory("");
  setAmount("");
  setDate("");
  setShowExpenseModal(false);

  enqueueSnackbar("Expense added successfully", { variant: "success" });
  
        };
        const totalExpenses =   expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        const balance=walletTotal-totalExpenses;
  useEffect(() => {
  localStorage.setItem("walletTotal", JSON.stringify(walletTotal));
  }, [walletTotal]);

useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expenses));
}, [ expenses]);

  const handleDelete=(id)=> {
    setExpenses(prevExpenses =>
        prevExpenses.filter(exp=>exp.id !==id)
    );
  };
  const handleEdit=(expense)=>{
    setEditingExpense(expense);
    setTitle(expense.title);
    setCategory(expense.category);
    setAmount(expense.amount);
    setDate(expense.date);
    setShowExpenseModal(true);
  } 
  
  const resetForm=()=>{
      setTitle("");
    setCategory("");
    setAmount("");
    setDate("");
    setEditingExpense(null);
    setShowExpenseModal(false);
  }
  const customStyles={
    content:{
        width:"223px",
        borderRadius:"25px",
        background:"#FFFFFF",
        padding:"2px"
    }
  };
  const handleUpdate=(e)=>{
    e.preventDefault();

    if(editingExpense){
     setExpenses(prevExpenses=>
        prevExpenses.map(exp=>
            exp.id===editingExpense.id
            ? {
                ...exp,
                title,
                category,
                amount,
                date
            }
            :exp
            )
    );
   }else {
    setExpenses(prev=>[
        ...prev,
        {
            id:Date.now(),
            title,
            category,
            amount,
            date
        }
    ]);
   }

   resetForm();
  } 
  
    return(
        <div className="container">
            <div className="container1" >
            <h1 className="heading1">Expense Tracker</h1>
            <div className="cards">
            <div className="grid_item1">
            <Balans balance={balance} openBalanceModal={()=>setShowBalanceModal(true)}
            />
            </div>
            <div className="grid_item2">
           <Expens expenses={totalExpenses}
  openExpenseModal={() => setShowExpenseModal(true)}/>
           </div>
           <div className="grid_item3">
           <MyPieChart expenses={expenses}/>
           </div>
           </div>
            </div>
            <div className="head">
            <div className="heading2"><h3>Recent Transactions</h3>
            <div className="transactions-wrapper">
                
            <Transactions expenses={paginatedExpenses}
            
            onDelete={handleDelete}
            onEdit={handleEdit}/>
            {totalPages>1 && (
            <div className="pagination">
                <button 
                disabled ={safeCurrentPage===1}
                onClick={()=>setCurrentPage(p=>p-1)}
                >
                    Prev
                </button>
                <span>{safeCurrentPage}</span>
                <button
                disabled ={safeCurrentPage===totalPages}
                onClick={()=>setCurrentPage(p=>p+1)}
                >
                    Next
                </button>
            </div>
            )}
            </div>
            
            </div>
            <div className="heading3">
            <h3>Top Expenses</h3>
            <div className="chart"> 
                <TinyBarChart
                expenses={expenses}/>
            </div>
            </div>
            </div>
            <Modal
              isOpen={showBalanceModal} title="Add Balance" onClose={resetForm}
              onSubmit={handleAddBalance}
              >
                <BalanceForm
                newBalance={newBalance}
                setNewBalance={setNewBalance}
                onSubmit={handleAddBalance}
                style={customStyles}
                onCancel={()=>setShowBalanceModal(false)}
                />
            </Modal>
            <Modal
            isOpen={showExpenseModal} title={editingExpense ? "edit expense" : "Add Expense" }onClose={()=>setShowExpenseModal(false)}
            onSubmit={handleAddExpense}
            >
                <ExpenceForm
                title={title}
                setTitle={setTitle}
                category={category}
                    setCategory={setCategory}
                    amount={amount}
                    setAmount={setAmount}
                    date={date}
                    setDate={setDate}
                    onSubmit={handleUpdate}
                    onCancel={resetForm}
                    style={customStyles}
                    isEditing={!!editingExpense}
                    />
                
            </Modal>
           
        </div>
    )
}