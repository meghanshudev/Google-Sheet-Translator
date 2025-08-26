# Backend for Google Sheet Translator

This is the backend for the Google Sheet Translator extension. It provides APIs for user authentication, subscriptions, and translation.

## Prerequisites

- Node.js and npm installed on your machine.
- A Firebase project with a service account key.
- A Stripe account with API keys.

## Getting Started

1.  **Clone the repository** (if you haven't already).

2.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Set up your environment variables:**

    -   Make sure you have your Firebase service account key JSON file in the `backend` directory. The filename should match the one referenced in `index.js`.
    -   The Stripe secret key is currently hardcoded in `index.js`. For production, it's recommended to use environment variables.

5.  **Start the server:**
    ```bash
    node index.js
    ```

    The server will start on port 3000 by default.

## API Endpoints

-   `POST /auth/google`: Authenticates a user with a Google ID token.
-   `POST /create-checkout-session`: Creates a Stripe checkout session for a subscription.
-   `POST /translate`: Translates text to a specified target language (currently a placeholder).