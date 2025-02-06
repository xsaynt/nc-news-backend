# Northcoders News API

This project is based on a news outlet and includes a database with tables of articles, comments, topics and users and looks to allow a user to locate specified information based on each table with data that links the tables together, such as comments on different articles and such.

If you would like to view my hosted API, this can be viewed [here](https://my-nc-news-yn9b.onrender.com/api)

The frontend of the project can be found using the following link: [News Website Frontend](https://github.com/xsaynt/nc-news-frontend).

The hosted site can be found using the following link: [Hosted News Website](https://alexp-nc-news.netlify.app/)

## Setup

In order to clone this repo, start by opening my repo [here](https://github.com/xsaynt/nc-news-backend) and clicking 'Code' at the top in order to copy the URL. Once done, you can open your terminal and enter the following commands:

`git clone *copied URL*`

`code nc-news-backend`

If you wish to run this project locally after cloning, you must create two .env files at the root of the repo in order to access both the development and test databases. The first file being a `.env.test` file, and the second being a `.env.development file`. Once these have been created, you must input the name of the database into the corresponding file in the format of `PGDATABASE=database_name_here`.

You will then need to install multiple dependencies in order for the code to run succesfully. In order to install these dependencies, you must run the command

`npm install`.

In order to populate the database and allow for testing, you will need to run the command:

`npm run seed`

To test the database, you must run the command:

`npm run test`.

## Requirements

For this project to run successfully, tou must also ensure that the correct versions of Node.js and Postgres are installed. The minimum versions required are as follows:

- Node.js - v22.8.0
- Postgres - 8.13.1
