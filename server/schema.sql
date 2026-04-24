-- Cypherpunk Database Schema
CREATE DATABASE IF NOT EXISTS cypherpunk;
USE cypherpunk;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  wallet_address VARCHAR(255),
  avatar_url VARCHAR(500),
  role ENUM('member','admin') DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  body LONGTEXT,
  author VARCHAR(200),
  category VARCHAR(100),
  tags VARCHAR(500),
  thumbnail VARCHAR(500),
  views INT DEFAULT 0,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events / Programs
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  type ENUM('bootcamp','hackathon','accelerator','village','seminar') NOT NULL,
  description TEXT,
  date DATE,
  end_date DATE,
  location VARCHAR(300),
  capacity INT DEFAULT 100,
  registered INT DEFAULT 0,
  image_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects / Showcase
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  category ENUM('defi','nft','privacy','dao','tool','other') DEFAULT 'other',
  tags VARCHAR(500),
  image_url VARCHAR(500),
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  author VARCHAR(200),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event registrations
CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
