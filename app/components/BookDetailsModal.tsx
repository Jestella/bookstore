import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Book, updateBook, deleteBook } from "../../lib/features/bookSlice";

import styles from "../styles/home.module.scss";

interface Props {
  book: Book;
  onClose: () => void;
}

const BookDetailsModal: React.FC<Props> = ({ book, onClose }) => {
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedBook(book);
  }, [book]);

  const handleDelete = () => {
    dispatch(deleteBook(book.id));
    onClose();
  };

  const handleUpdate = () => {
    if (updatedBook) {
      dispatch(updateBook(updatedBook));
      onClose();
    }
  };

  const handleChange = (key: keyof Book, value: string | number) => {
    if (updatedBook) {
      setUpdatedBook({ ...updatedBook, [key]: value });
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.heading}>Edit Book</h2>
        {updatedBook && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={updatedBook.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Price"
              value={updatedBook.price}
              onChange={(e) =>
                handleChange("price", parseFloat(e.target.value))
              }
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Category"
              value={updatedBook.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Description"
              value={updatedBook.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={styles.input}
            />
            <button onClick={handleUpdate} className={styles.button}>
              Update Book
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetailsModal;
