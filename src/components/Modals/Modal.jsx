// Modal.jsx
import  "./Modal.css";

const Modal = ({ isOpen, children, title }) => {
  if (!isOpen) return null;
  

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
