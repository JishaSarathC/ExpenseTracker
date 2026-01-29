// Modal.jsx
import  "./Modal.css";

const Modal = ({ isOpen, children, title }) => {
  if (!isOpen) return null;
  const customStyles={
    content:{
      width:"95%",
      Radius:"15px",
      background:"#FFFFFF",
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="title">{title}</h2>

        <div className="content">{children}</div>

        
      </div>
    </div>
  );
};

export default Modal;
