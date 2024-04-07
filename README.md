# MERN Stack Book Store

![Home Page](https://i.imgur.com/vcbMEZi.png)

A book store website, developed with NodeJs, Express, React, MongoDB, and Tailwind CSS.

## Functionalities

The site allows you to:

- Add books to the store, with information such as name, author and publication date
- See all books in the store, as well as see more information about a book based on its database ID
- Edit a book's information
- Delete the book from the database

![Edit Book](https://i.imgur.com/xoNM5j5.png)

## Development Details

On the Frontend, when accessing react routes, it executes HTTP requests with the Axios lib (GET, POST, PUT and DELETE) in the NodeJS backend to obtain the necessary data that will be displayed on the screen.

In the Backend, upon receiving HTTP requests, NodeJS makes new requests to the MongoDB database server so that it can obtain the requested data, and then delivers it as a response to the HTTP request.

![HTTP Methods](https://i.imgur.com/zuw9ZOF.png)

## Usage Requirements

For database queries to work, you will need to enter your mongo database connection data in the config.js file in the path 'backend\config.js'.

