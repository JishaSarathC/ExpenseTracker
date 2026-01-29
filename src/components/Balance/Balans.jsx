import "./Balans.css";
export default function Balans({balance, openBalanceModal}){
    return(
  <div className="Bcontainer">
    <div className="wallet">Wallet Balance:<span>₹{balance}</span></div>
    <div><button className="buton" onClick={openBalanceModal}>+Add Income</button></div>
    </div>
    )
}