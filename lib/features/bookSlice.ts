import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [
    {
      id: 1,
      name: "Sapiens",
      price: 38,
      category: "Non-fiction",
      description: "A Brief History of Humankind",
    },

    {
      id: 2,
      name: "The Power of Habit",
      price: 22,
      category: "Self-help",
      description: "Why We Do What We Do in Life and Business",
    },
    {
      id: 3,
      name: "Pachinko",
      price: 25,
      category: "Fiction",
      description:
        "An epic historical fiction novel following a Korean family who immigrates to Japan",
    },
  ],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
  },
});

export const { addBook, deleteBook, updateBook } = booksSlice.actions;

export default booksSlice.reducer;
