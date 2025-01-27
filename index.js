import express from "express";
import bodyParser from "body-parser";
import axios from 'axios';
const app = express();
const PORT = 3000;
import dotenv from "dotenv";

import pg from 'pg';


dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('connection error', err);
    return;
  }
  console.log('connected');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));







app.use(express.static('public'));
app.set('view engine', 'ejs');




app.get('/books', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT books.id, books.title, Authors.name AS author, books.rating, authors.author_olid, books.date_read, books.summary ,books.isbn
        FROM books
        JOIN Authors ON books.author_id = Authors.id
      `);


    const books = result.rows;
    res.render('books', { books });

    res.status(200);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
  books.id, 
  books.title, 
  Authors.name AS author, 
  books.rating, 
  books.date_read, 
  books.summary, 
  books.isbn
FROM 
  books
  INNER JOIN Authors ON books.author_id = Authors.id
WHERE 
  books.rating >= 4;

      `);


    const books = result.rows;
    res.render('index', { books });

    res.status(200);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/book/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  
  try {
    // Fetch the book details from the database
    const result = await db.query(`
        SELECT books.id, books.title, Authors.name AS author, books.rating, authors.author_olid, books.date_read, books.summary, books.isbn
        FROM books
        JOIN Authors ON books.author_id = Authors.id
        WHERE books.isbn = $1
      `, [isbn]);

    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }

    const book = result.rows[0];
    res.render('fullbook', { book });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.use(express.json());


app.get('/search', async (req, res) => {
  try {
    const searchBooks = req.query.query;



    const result = await db.query(`
      SELECT books.id, books.title, Authors.name AS author, books.rating, books.date_read, books.summary, books.isbn
      FROM books
      JOIN Authors ON books.author_id = Authors.id
      WHERE books.title ILIKE $1 
    `, [`%${searchBooks}%`]);


    res.render('books', { books: result.rows });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error searching books' });
  }
});



app.get(('/add'), (req, res) => {
  res.render('addbook.ejs');
});
app.post('/add', async (req, res) => {
  try {
    const { title, rating, author_name, date_read, summary, isbn, author_olid, id, bio } = req.body;

  
   
    // Check if author already exists
    const existingAuthor = await db.query('SELECT * FROM Authors WHERE author_olid = ($1)', [author_olid]);

    let author_id;
    if (existingAuthor.rows.length > 0) {
      // If author exists, use their ID
      author_id = existingAuthor.rows[0].id;
    } else {
    
      const newAuthor = await db.query('INSERT INTO authors ( name, bio, author_olid) VALUES ($1, $2, $3) RETURNING id', [ author_name, bio, author_olid]);
      author_id = newAuthor.rows[0].id;
    }

    // Insert book with the retrieved author_id
    const book = await db.query('INSERT INTO books (title, author_id, rating, date_read, summary, isbn) VALUES ($1, $2, $3, TO_DATE($4, \'YYYYMMDD\'), $5, $6) RETURNING *', [title, author_id, rating, date_read, summary, isbn]);

    console.log('Book and author added successfully:', book.rows[0]);
    res.redirect('/books');
  } catch (err) {
    console.error('Error adding book and author:', err);
    res.status(500).send({ message: 'Error adding book and author' });
  }
});



  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });