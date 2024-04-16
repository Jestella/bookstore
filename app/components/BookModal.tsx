// components/BookModal.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../lib/features/bookSlice";

import styles from "../styles/home.module.scss";

interface Props {
  onClose: () => void;
}

const BookModal: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log("Submitting book:", { name, price, category, description });
    dispatch(
      addBook({
        id: Math.floor(Math.random() * 1000),
        name,
        price: parseFloat(price),
        category,
        description,
      })
    );
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>

        <h2>Add Book</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Book</button>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BookModal;
