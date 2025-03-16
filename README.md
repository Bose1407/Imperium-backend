
# Imperium Contact Form Server

This is a simple Node.js server that handles contact form submissions from the Imperium website and forwards them to the website owner via email using Nodemailer.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on the `.env.example` file:
   ```
   cp .env.example .env
   ```

3. Update the `.env` file with your email credentials:
   ```
   PORT=4000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password-or-app-password
   RECIPIENT_EMAIL=website-owner@example.com
   ```

   Note: If you're using Gmail, you might need to use an "App Password" instead of your regular password. See [Google Account Help](https://support.google.com/accounts/answer/185833) for more information.

## Running the Server

Start the server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

## API Endpoint

### POST /api/contact

Accepts contact form submissions and sends an email to the website owner.

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about services",
  "message": "Hello, I would like to know more about your services."
}
```

Responses:
- 200 OK: Message sent successfully
- 400 Bad Request: Missing required fields
- 500 Internal Server Error: Failed to send email
