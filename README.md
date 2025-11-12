🚀 MERN Stack Projects

This repository contains multiple full-stack web applications built using the MERN stack (MongoDB, Express.js, React, Node.js) and additional modern web technologies. Each project demonstrates a unique use case, modular architecture, and best practices for scalability, maintainability, and performance.

🌐 1. BitLink – URL Shortener & Link Tracker

Description:
A powerful URL shortener web app with two user modes — Guest and Registered Users.
Guests can create short links instantly, while registered users can customize URLs, view click history, and generate QR codes.

🔧 Tech Stack:

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Other Tools: Nanoid, QR Code Generator

✨ Features:

Dual modes: Guest (basic shortening) and Registered User (custom & tracked links)

Unique ID generation using nanoid

Create custom short links

Generate QR codes for each link

Dashboard for registered users to track URL clicks and statistics

Follows MVC architecture with dedicated service, DAO, and config layers

☁️ 2. Personal Drive – Cloud-Based File Storage Application

Description:
A secure and user-friendly cloud-based file storage system that allows users to upload, manage, and retrieve their files (PDFs, images, etc.) safely.

🔧 Tech Stack:

Frontend: EJS

Backend: Node.js, Express.js

Database: MongoDB

Storage Service: Supabase

Authentication: JWT, bcrypt

✨ Features:

Secure user authentication and password hashing

Upload, view, and download PDFs and images

Access control – Only authorized users can manage or view their files

Protected routes with JWT-based authentication

Modular structure for scalability and security

🤖 3. AI Code Reviewer – AI-Powered JavaScript Review App

Description:
An intelligent code review web application that uses Google Gemini API to provide AI-based feedback, suggestions, and improvements for JavaScript code snippets.

🔧 Tech Stack:

Frontend: React.js

Backend: Node.js, Express.js

AI Service: Google Gemini API

Editor & UI: Prism.js, react-simple-code-editor, Markdown Renderer

✨ Features:

Submit JavaScript code and receive AI-powered review & suggestions

Real-time syntax highlighting using Prism.js

Clean coding interface with Markdown-formatted AI output

Modular backend with controllers, routes, and AI service layers

Ensures secure API communication and maintainable structure
