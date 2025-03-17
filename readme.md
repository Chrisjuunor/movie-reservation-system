# Movie Reservation System

This project focuses on the development of the API for a movie reservation system - which I shall call MoviesLOL, yeah cringe with me.
The movie reservation system has a couple of essential components; the user, the movie, the movie showtime, and the reservation.
Now, this project is built using the MVC design pattern which means that for every component, there is a corresponding model, controller, and supposed route file. This is put in place in order to properly separate concerns and maintain structure.

## Content

- [Introduction](#movie-reservation-system)
  - [Content](#content)
  - [Description](#description)
    - [User:](#user)
      - [The user:](#the-user)
      - [The admin:](#the-admin)
    - [Movies:](#movies)
    - [Showtimes:](#showtimes)
    - [Reservations:](#reservations)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Contact](#contact)

## Description

### User:

There are to be two types of users; the user (regular user) and the admin.

#### The user:

The user has the ability to create an account (register), access the registered account whenever (login), update the registered account, delete said account, view all the movies available in the system, make reservation for a specific movie showtime, and cancel said reservation.

#### The admin:

The admin's functions include the ability to add movies to the system, update details about a movie previously added, remove movies from the system, add showtimes to movies, etcetera.

### Movies:

Movies are added by the admins. Not only are they added to the system by admins, they are also updated and deleted by the admins as well.

### Showtimes:

The showtime simply tells what time the movies are to air. It is also controlled by the admin who can add and modify the movie showtime.

### Reservations:

Reservations are made by the users. Basically, the user (regular) reserves a movie showtime for the airing of his movie of choice. The user can also cancel his reservation if he so chooses.

Each of the afore mentioned components double as entities in a postgresql database and have relating route files that you can test out.
The project is built using typescript, express, and postgresql for database interactions.

## Installation

To install this project, follow the procedure below

1. clone the repository:
   ```bash
   git clone https://github.com/chrisjuunor/movie-reservation-system.git
   ```
2. Install dependecies:
   ```bash
   npm install
   ```

## Usage

To run this project, run
`npm start` in the terminal.
OR
`npm run dev` to run the project in watch mode.

All the endpoints are laid out in their respective router files, I recommend checking out with an API tester (like Postman or Insomnia)

## Contributing

A little help from smart persons such as you would be much appreciated. Do feel free to;

- fork the repository,
- create a branch,
- do your best work, and
- push your update back up here.

## Contact

Reach out at chinonsoigweic@gmail.com if you have any queries
