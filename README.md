# Red Line Dealership

<p align='center'>
  <img width="50%" alt="RedLine Dealership Logo" src="client/public/assets/RED-Line-Logo-Border.png">
</p>

## Buy, List, and Sell someone's dream car. Your ride awaits!

Welcome to Red Line Dealership, a full-stack pseudo e-commerce site designed for listing, buying, and selling vehicles. This project is built using a React front end, incorporating libraries such as React Hook Forms and Image Dropzone. The Image Dropzone feature allows users to effortlessly upload files from their desktop to their Cloudinary service for storage in the database.

### Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Front End (React/JavaScript)](#front-end-reactjavascript)
  - [Cloudinary/Secret Keys](#cloudinary-configuration--secret-keys)
  - [Back End (Flask/Python)](#back-end-flaskpython)
- [Usage](#usage)
- [Disclaimer](#disclaimer)

## Project Overview

Red Line Dealership is a demonstration of technical proficiency in building a full-stack application for an e-commerce platform focused on vehicles. While the purchasing functionality and actual vehicle listings are not operational (given the pseudo nature of the site), the project showcases key features and technologies.

## Technologies Used

- **Front End:**
  - React (JavaScript)
  - React Hook Forms
  - Image Dropzone
  - Cloudinary Cloud Services

- **Back End:**
  - Flask (Python)
  - SQLAlchemy
  - SQLite

## Installation

1. Clone the repository:
   
    ```bash
    git clone https://github.com/your-username/Red-Line-Dealership.git

    cd Red-Line-Dealership
    ```

 - Let's begin with our local server. Make sure your virtual environment is activated (if using `pipenv shell`) and start the Flask server with the following steps.

### Back End (Flask/Python)

1. Navigate to the `server` directory from the root directory:
   
    ```bash
    cd server
    ```

3. Create and initialize a virtual environment (such as ```pipenv```):
   
    ```bash
    pipenv shell
    ```
5. Install dependencies within the virtual environment:
   
    ```bash
    pipenv install

7. Run the Flask server:
   
    ```bash
    python app.py
    ```

### Front End (React/JavaScript)

** Open a new terminal window for the frontend application to run on your port (default: 3000) **

1. Navigate to the `client` directory from the root directory:
   
    ```bash
    cd client
    ```

2. Install dependencies:
   
    ```bash
    npm install
    ```

5. Run the development server:
   
    ```bash
    npm start
    ```

## Cloudinary Configuration / Secret Keys

Before running the application, you need to set up your Cloudinary credentials. Follow the steps below:

1. **Create a Cloudinary Account:**
   - If you don't have a Cloudinary account, [sign up here](https://cloudinary.com/users/register).

2. **Obtain Cloudinary API Key, API Secret, and Cloud Name:**
   - Once you've created an account, navigate to the [Cloudinary Dashboard](https://cloudinary.com/console) to find your API Key, API Secret, and Cloud Name.

3. **Create a .env file:**
   - In the root directory of the project, create a file named `.env` if it doesn't exist.

4. **Add your Cloudinary credentials to .env:**
   - Open the `.env` file and add the following lines, replacing `YOUR_CLOUD_NAME`, `YOUR_API_KEY`, and `YOUR_API_SECRET` with your actual Cloudinary credentials:
     
     ```dotenv
     CLOUD_NAME=YOUR_CLOUD_NAME
     API_KEY=YOUR_API_KEY
     API_SECRET=YOUR_API_SECRET
     ```

5. **Cloudinary Configuration in Code:**
   - In your `app.py` (or relevant file), ensure that the Cloudinary configuration uses the environment variables. Here's an example:
     
     ```python
     import os
     import cloudinary
     from flask import Flask

     app = Flask(__name__)

     # ... other imports ...

     cloudinary.config(
         cloud_name=os.environ.get('CLOUD_NAME'),
         api_key=os.environ.get('API_KEY'),
         api_secret=os.environ.get('API_SECRET')
     )
     ```
6. **Hashing key for password hashing**
  - Also in your `.env` file:
    
     ```dotenv
     PASS_SECRET=YOUR_PASS_SECRET_STRING
     ```
     
  - Ensure that you have added a secret key to be utilized by the bcrypt hashing method when generating new user information
  - We recommend utilizing a randomizing package or function to generate a string of at least **32** characters to utilize as the key for password hashing.

## Usage

- Explore the pseudo e-commerce site, navigating through the UI and experiencing the functionality of listing, buying, and selling vehicles. If you have an questions or would like to add/update to the app, please submit a pull request to the developer team. Thanks!


## Contributions
- Made by Tom Marku, Kristian Guzman, and Angelo Gentile III

## Disclaimer

The cars and purchasing functionality on this site are not operational.
