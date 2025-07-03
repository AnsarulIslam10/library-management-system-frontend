# 📚 Library Management System

A responsive and minimalistic Library Management System built with **React**, **Redux Toolkit Query**, **TypeScript**, and **Tailwind CSS**. The system allows users to view, manage, and borrow books efficiently, demonstrating clean UI, proper state management, and RESTful API integration.

## 🚀 Live Site

🔗 [Visit the Live Site](https://library-management-system-frontend-eight.vercel.app/)

---

## 🧰 Tech Stack

| Layer      | Tech Used                       |
| ---------- | ------------------------------- |
| Frontend   | React, TypeScript               |
| State Mgmt | Redux Toolkit, RTK Query        |
| Styling    | Tailwind CSS                    |
| Backend    | Node.js, Express.js, TypeScript |
| Database   | MongoDB, Mongoose               |

---

## 🔑 Key Features

### ✅ Public Routes

* All pages are accessible without authentication.
* Clean navigation through a minimal layout.

### 📖 Book Management

* List all books in a table view.
* Add new books with a form.
* Edit or delete existing books.
* Borrow a book directly from the list.

> 📌 **Business Logic:**
>
> * If a book’s copy count is 0, it’s marked as **Unavailable**.
> * Borrow quantity cannot exceed available copies.

### 📦 Borrow Management

* Borrow books by specifying quantity and due date.
* Automatically reduces available copies.
* If copies reach 0, availability is updated.

### 📊 Borrow Summary

* Aggregated view of borrowed books.
* Displays total borrowed quantity per book.

---

## 📄 Page Structure

| Route             | Description                                         |
| ----------------- | --------------------------------------------------- |
| `/books`          | Lists all books with actions (edit, delete, borrow) |
| `/create-book`    | Form to add a new book                              |
| `/books/:id`      | Detailed view of a single book                      |
| `/edit-book/:id`  | Edit a book's information                           |
| `/borrow/:bookId` | Borrow form for the selected book                   |
| `/borrow-summary` | Summary of all borrowed books                       |

---

## 💻 UI Components

* **Navbar:** Links to All Books, Add Book, and Borrow Summary
* **Book Table:** Lists books with actions
* **Forms:** Add/Edit books, Borrow form
* **Footer:** Standard info section

---

## 🌟 Bonus Features

| Feature               | Status                             |
| --------------------- | ---------------------------------- |
| Responsive Layout     | ✅ Completed                        |
| Optimistic UI Updates | ✅ Implemented                      |
| Toast Notifications   | ✅ Implemented                      |
| Type-Safe Forms       | ✅ Done using React Hook Form |

---

## ⚙️ How to Run Locally

### 🖥️ Frontend

```bash
# Clone the repo
git clone https://github.com/AnsarulIslam10/library-management-system-frontend.git

# Navigate into project
cd library-management-system-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
