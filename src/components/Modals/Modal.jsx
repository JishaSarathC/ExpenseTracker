// Modal.jsx
import  "./Modal.css";

const Modal = ({ isOpen, children, title, onClose }) => {
  if (!isOpen) return null;
  
  const handleOverlayClick = () =>{
    onClose();
  };

  const  handleModalClick = (e) =>{
    e.stopPropagation();
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className={`modal ${title === "Add Balance" ? "balance-modal" : "expense-modal"}`}
      onClick={handleModalClick}
      >
        <h2 className="modal-title">{title}</h2>

        <div className="content">
          {children}
          </div>

        
      </div>
    </div>
  );
};

export default Modal;
