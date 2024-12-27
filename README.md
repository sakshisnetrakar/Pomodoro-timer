# Pomodoro Timer

A simple Pomodoro Timer built with Flask, HTML, CSS, and JavaScript. It includes a 25-minute work session, short 5-minute breaks, and a 15-minute long break after every four cycles. The app includes sound notifications for each break and work period. After the long break, the timer resets and waits for the user to start the next cycle manually.

## Features

- **Work Timer**: 25 minutes of focused work time.
- **Short Break**: 5-minute break after each work session.
- **Long Break**: 15-minute break after four cycles. The timer resets after the break and waits for user action to start the next session.
- **Audio Alerts**: Plays sound notifications when a session (work, short break, or long break) ends.
- **User Control**: After the long break, the timer resets to 25 minutes but does not start automatically, leaving the decision to the user.

## Technologies Used

- **Flask** for the backend to manage routes and server-side logic.
- **HTML** for the layout and structure of the timer.
- **CSS** for styling the Pomodoro timer and ensuring a responsive design.
- **JavaScript** for handling client-side logic, such as starting, stopping, and resetting the timer.
- **Audio files (.wav)** for the sound notifications.

## Installation

1. Clone or download the project.
2. Install the required dependencies:
   ```bash
    pip install flask
3.Run the Flask server:
  ```bash
    python app.py
