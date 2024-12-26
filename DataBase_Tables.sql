CREATE DATABASE IF NOT EXISTS todo_list;
USE todo_list;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS TodoLists;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;

-- Create the Users table to match the User entity
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,         -- Matches @Id and @GeneratedValue(strategy = GenerationType.IDENTITY)
    first_name VARCHAR(50) NOT NULL,               -- Matches @Column(name = "first_name")
    last_name VARCHAR(50) NOT NULL,                -- Matches @Column(name = "last_name")
    username VARCHAR(50) NOT NULL UNIQUE COLLATE utf8_bin,  -- Matches @Column(name = "username"), case-sensitive collation
    password_hash VARCHAR(255) NOT NULL,           -- Matches @Column(name = "password_hash")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Matches @Column(name = "created_at")
);

-- Create the Categories table
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,                          -- Foreign key referencing Users table
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the TodoLists table
CREATE TABLE Todo_lists (
    todo_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,                      -- Foreign key referencing Categories table
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status ENUM('PENDING', 'INPROGRESS', 'COMPLETED') DEFAULT 'PENDING',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);