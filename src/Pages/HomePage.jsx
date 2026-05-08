import { useState , useEffect} from "react";
import "./HomePage.css";
import Balans from "../components/Balance/Balans.jsx"
import Expens from "../components/Expences/Expens.jsx" ;
import ExpensePieChart from "../components/Piechart/ExpensePieChart.jsx";
import Transactions from "../components/Transactions/Transactions.jsx"
import Modal from "../components/Modals/Modal.jsx";
import BalanceModal from "../components/Forms/BalanceModal.jsx";
import ExpenseModal from "../components/Forms/ExpenseModal.jsx";
import TinyBarChart from "../components/BarChart/TinyBarChart.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";


import {useSnackbar} from "notistack";
export default function HomePage(){
    const [balance,setBalance]=useState(0);
    const [balanceAmount,setBalanceAmount]=useState("");
    const [expenses, setExpenses]=useState(0);
    const [expenseList,setExpenseList]=useState([]);
    const [food,setFood]=useState(0);
    const [entertainment,setEntertainment]=useState(0);
    const [travel,setTravel]=useState(0);
    const [isMount, setIsMount]=useState(false);

   
    const [openBalanceModal,setOpenBalanceModal]=useState(false);
    const [openExpenseModal, setOpenExpenseModal]=useState(false);
    const [openEditModal, setOpenEditModal]=useState(false);
    const [selectedExpense,setSelectedExpense]=useState(null);
    
    const [editingExpense, setEditingExpense]=useState(null);
    const [title, setTitle]=useState("");
    const [amount,setAmount]=useState("");
    const [category, setCategory]=useState("");
    const [date, setDate]=useState("");

    const [currentPage,setCurrentPage]=useState(1);
    const itemsPerPage=3;
    const startIndex=(currentPage-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage;

    const currentTransactions=expenseList.slice(startIndex,endIndex);
    const enqueueSnackbar=useSnackbar();
    useEffect(()=>{
    const storedBalance= localStorage.getItem("balance");
    
    if(storedBalance){
        setBalance(JSON.parse(storedBalance));
    }else{
        setBalance(5000);
    }
    const storedExpenses= localStorage.getItem("expenses");

    if (storedExpenses){
        setExpenseList(JSON.parse(storedExpenses));
    }else{
        setExpenseList([]);
    }
    setIsMount(true);
    },[]);
    
   
    
    useEffect(()=>{
        if(!isMount) return;
        localStorage.setItem("expenses",JSON.stringify(expenseList));
       
        let totalExpenses=0;
            let foodTotal=0;
            let entertainmentTotal=0;
            let travelTotal=0;

            expenseList.forEach((item)=>{
                const amount=Number(item.amount);
                 totalExpenses+=amount;

                 if(item.category==="Food"){
                    foodTotal+=amount;
                 }
                    if(item.category==="Entertainment"){
                        entertainmentTotal+=amount;
                  }

                  if(item.category==="Travel"){
                    travelTotal+=amount;
                 }
            });
            setExpenses(totalExpenses);

            setFood(foodTotal);
            setEntertainment(entertainmentTotal);
            setTravel(travelTotal);
           
    },[expenseList]);

 useEffect (()=>{
        if(!isMount) return; {
            localStorage.setItem("balance",JSON.stringify(balance));
        }
    },[balance]);

    

    const handleEdit=(expense)=>{
       setSelectedExpense(expense);
       setTitle(expense.title);
       setCategory(expense.category);
       setAmount(expense.amount);
       setDate(expense.date);
       setEditingExpense(expense);
       setOpenEditModal(true);

    };

    
    const handleOpenExpenseModal=()=>{
        setOpenExpenseModal(true);
    }

    const handleOpenBalanceModal=()=>{
        setOpenBalanceModal(true);
    }
    
    const handleAddBalance=()=>{
        if (!balanceAmount || Number(balanceAmount)<= 0) {
            enqueueSnackbar("Please enter a valid amount",{variant:"warning"});
            return;
        }

        setBalance(prev=>prev+Number(balanceAmount));
        enqueueSnackbar("Balance added successfully",{variant:"success"});
        setBalanceAmount("");
        setOpenBalanceModal(false);
    };
    const handleAddExpense=()=>{
        if(!title|| !category|| !amount ||!date){
            enqueueSnackbar("All fields are required", {variant:"warning"});
         return;
        }
        if(Number(amount) > balance){
            enqueueSnackbar("Not enough balance", {variant:"error"});
            return;
        }
       
       const newExpense={
        id:Date.now(),
        title,
        amount:Number(amount),
        category,
        date
       };
       setExpenseList((prev)=>[...prev,newExpense]);
       setBalance((prev)=> prev-Number(amount));
       setTitle(""),
       setAmount(""),
       setCategory(""),
       setDate(""),
       setOpenExpenseModal(false);
    };
    
    const handleUpdateExpense=()=>{
        // const updatedExpenses=expenseList.map((item)=>{
        //     if(item.id===selectedExpense.id) {
        //         return {
        //             ...item,
        //             title,
        //             amount,
        //             category,
        //             date
        //         };
        //     }
        //     return item;
        const oldAmount=editingExpense.amount;
        const newAmount=Number(amount);

        setExpenseList(prev=>
            prev.map(exp=>
                exp.id===editingExpense.id
                ? {...exp,title,category,amount:newAmount,date}
                :exp
            )
        );
        setBalance(prev=>prev+oldAmount-newAmount);
        setOpenEditModal(false);
        //);
        
    };

    const handleDeleteExpense=(id)=>{
        const expenseToDelete=expenseList.find(item=>item.id===id);
        setBalance(prev=>prev+Number(expenseToDelete.amount));
        const updatedExpenses=expenseList.filter(item=>item.id!==id);
        setExpenseList(updatedExpenses);
    }
    console.log(expenseList);

    return(
        <div className="container">
            <div><h1 className="heading">Expense Tracker</h1></div>
            <div className="contents">
                <div className="content1">
                   <Balans balance={balance} openBalanceModal={handleOpenBalanceModal}
                              />  
                </div>
                 <div className="content2">
                    <Expens totalExpenses={expenses} 
                    openExpenseModal={handleOpenExpenseModal}/>
                 </div>
                 <div className="piechart"> <ExpensePieChart expenseList={expenseList}
                
            food={food}
            entertainment={entertainment}
            travel={travel}
            /></div>
                
            </div>
             <div className="downhead">
            <div><h3>Recent Transactions</h3>
            <div className="transactions">
            <Transactions 
            expenses={currentTransactions}
            isEmpty={expenseList.length===0}
            onDelete={handleDeleteExpense}
            onEdit={handleEdit}
           
            
            /></div>
             <Pagination
            totalItems={expenseList.length}
            itemPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}/></div>
            
            <div><h3>Top Expenses</h3>
            <div className="chart">
            <TinyBarChart
            expenses={expenseList}
            food={food}
            entertainment={entertainment}
            travel={travel}/>
            </div>
            </div>
           </div>
           <Modal isOpen={openBalanceModal} title="Add Balance">
            <BalanceModal
             balanceAmount={balanceAmount}
             setBalanceAmount={setBalanceAmount}
             onSubmit={handleAddBalance}
             onCancel={()=>setOpenBalanceModal(false)}
            />
            </Modal>
            <Modal isOpen={openExpenseModal} title="Add Expense">
            <ExpenseModal
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            amount={amount}
            setAmount={setAmount}
            date={date}
            setDate={setDate}
            onSubmit={handleAddExpense}
            onCancel={()=>setOpenExpenseModal(false)}
            isEditing={false}
            /> 
            </Modal>
            <Modal isOpen={openEditModal} title="Edit Expense">
                <ExpenseModal
                title={title}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
                onSubmit={handleUpdateExpense}
                onCancel={()=>setOpenEditModal(false)}
                isEditing={true}
             />
            </Modal>
        </div>
    )

}