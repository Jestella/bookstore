"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookList from "./components/BookList";
import BookModal from "./components/BookModal";
import BookDetailsModal from "./components/BookDetailsModal";

import styles from "./styles/home.module.scss";

export default function IndexPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleBookClick = (id: number) => {
    setSelectedBookId(id);
  };

  const handleCloseBookDetails = () => {
    setSelectedBookId(null);
  };

  const selectedBook = useSelector((state: RootState) =>
    state.books.find((book) => book.id === selectedBookId)
  );

  return (
    <div className="App">
      <div className={styles.main}>
        <button onClick={toggleAddModal} className={styles.addBook}>
          <h3>Add Book</h3>
        </button>
        <BookList onBookClick={handleBookClick} />
        {showAddModal && <BookModal onClose={toggleAddModal} />}
        {selectedBookId !== null && (
          <BookDetailsModal
            book={selectedBook}
            onClose={handleCloseBookDetails}
          />
        )}
      </div>
    </div>
  );
}
