import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Book } from "../../lib/features/bookSlice";
import { deleteBook } from "../../lib/features/bookSlice";
import BookDetailsModal from "./BookDetailsModal";

import styles from "../styles/home.module.scss";

interface Props {
  onBookClick: (id: number) => void;
}

const BookList: React.FC<Props> = ({ onBookClick }) => {
  const books = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleDelete = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteBook(id));
  };

  const handleBookClick = (book: Book, e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target && (e.target as HTMLElement).nodeName === "BUTTON") {
      return;
    }
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className={styles.bookList}>
      {books.map((book: Book) => (
        <div
          key={book.id}
          onClick={(e) => handleBookClick(book, e)}
          className={styles.bookItem}
        >
          <div className={styles.bookInfo}>
            <h4>Name: {book.name}</h4>
            <p>Price: ${book.price}</p>
            <p>Category: {book.category}</p>
            <p>Description: {book.description}</p>
          </div>
          <div className={styles.btnContainer}>
            <button onClick={(e) => handleDelete(book.id, e)}>Delete</button>
          </div>
        </div>
      ))}
      {selectedBook && (
        <BookDetailsModal book={selectedBook} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default BookList;
