**Books Notes**
==========================
<img src="./public/bookstore.jpg" alt="Demo Image 1" style="width: 30% ; margin-right: 5%;" />

**Overview**
------------

This is a web application built using Node.js, Express.js, and PostgreSQL to manage a collection of books. The application allows users to view, search, and add new books to the collection.

**Screenshots**
--------------



<div style="display: flex;">
    <img src="./public/home-page.png" alt="Demo Image 1" style="width: 50%; margin-right: 5%;" />
    <img src="./public/books.png" alt="Demo Image 2" style="width: 50%;" />
</div>


**Features**
------------

*   **Book Listing**: View a list of all books in the collection, including title, author, rating, and summary.
*   **Search**: Search for books by title.
*   **Add Book**: Add new books to the collection, including title, author, rating, date read, summary, and ISBN.
*   **Book Details**: View detailed information about a specific book, including title, author, rating, date read, summary, and ISBN.

**Technical Details**
--------------------

*   **Backend**: Node.js, Express.js
*   **Database**: PostgreSQL
*   **Frontend**: EJS templating engine
*   **Dependencies**:
    *   `axios`: ^1.7.9
    *   `dotenv`: ^16.4.7
    *   `ejs`: ^3.1.10
    *   `express`: ^4.21.2
    *   `pg`: ^8.13.1

**Setup and Installation**
-------------------------

1.  Clone the repository: `git clone https://github.com/your-username/books-notes.git`
2.  Install dependencies: `npm install`
3.  Create a `.env` file with the following environment variables:
    *   `DB_USER`
    *   `DB_HOST`
    *   `DB_DATABASE`
    *   `DB_PASSWORD`
    *   `DB_PORT`
4.  Start the application: `node index.js`

**API Endpoints**
-----------------

*   **GET /books**: Retrieve a list of all books in the collection.
*   **GET /**: Retrieve a list of books with a rating of 4 or higher.
*   **GET /book/:isbn**: Retrieve detailed information about a specific book.
*   **GET /search**: Search for books by title.
*   **POST /add**: Add a new book to the collection.




**Contributing**
------------

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

**Acknowledgments**
-----------------

*   This project was built using the following resources:
    *   Node.js: <https://nodejs.org/>
    *   Express.js: <https://expressjs.com/>
    *   PostgreSQL: <https://www.postgresql.org/>
    *   EJS: <https://ejs.co/>