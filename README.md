# react-firabase-basic-authentication

This is a demo react app that implements the basic (email/password) firabase authentication with Material UI. This app has the login, signup and recover password features. In the / path, it will check if the user is logged in. If yes, he will redirect to the /home path with just a hello, if not, he will redirect to /auth path for login/signup/recover.

## Installation

Run the following commands in terminal:
```
git clone git@github.com:adrianojfg/react-firebase-basic-authentication.git
cd react-firebase-basic-authentication
npm install
```

## Configuration

Create a project at http://firebase.google.com. Then, create an .env file from .env.dist model. You need to copy the config values from Firebase console and paste it the correspondent variable.

## Usage

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
