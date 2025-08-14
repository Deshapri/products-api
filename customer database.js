const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
  // Create the customer table
  db.run(`
    CREATE TABLE IF NOT EXISTS customer (
      customerId INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      dateOfBirth TEXT NOT NULL,
      gender TEXT,
      age INTEGER,
      cardHolderName TEXT,
      cardNumber TEXT NOT NULL,
      expiryDate TEXT NOT NULL,
      cvv TEXT NOT NULL,
      timestamp TEXT
    )
  `);

  // Other table definitions for 'product' and 'order'
  db.run(`
    CREATE TABLE IF NOT EXISTS product (
      productId INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT,
      price REAL,
      stock INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS "order" (
      orderId INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER,
      orderDate TEXT,
      totalAmount REAL,
      FOREIGN KEY(customerId) REFERENCES customer(customerId)
    )
  `);
});

module.exports = db;
