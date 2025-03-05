import React from "react";
import "../assets/styles/DeleteModal.css"

function DeleteModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null; // אם המודאל לא פעיל, לא מציגים אותו

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>❗ האם אתה בטוח שברצונך לבצע מחיקה ?</h3>
        <p>פעולה זו אינה ניתנת לשחזור.</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>כן, מחק</button>
          <button className="cancel-button" onClick={onCancel}>ביטול</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
