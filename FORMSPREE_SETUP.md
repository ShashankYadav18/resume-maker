# Formspree Integration Setup

## Steps to Enable Contact Form

### 1. Create a Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up with your email address
3. Verify your email

### 2. Create a New Form
1. In the Formspree dashboard, click "New Form" or "Add a Form"
2. Give your form a name (e.g., "Resume Maker Contact Form")
3. You'll receive a **Form ID** (looks like: `abc123def456`)

### 3. Update the Form ID in Code
1. Open `client/src/pages/home.jsx`
2. Find the line with: `https://formspree.io/f/YOUR_FORM_ID`
3. Replace `YOUR_FORM_ID` with your actual Form ID from step 2

Example:
```javascript
const response = await fetch('https://formspree.io/f/mkkqvnyra', {
```

### 4. Test the Contact Form
1. Run your application
2. Scroll to the "Get In Touch" section
3. Fill out the contact form and submit
4. You should receive the submission in your Formspree dashboard and email

## Features
- ✅ Emails go directly to you (no backend server needed)
- ✅ Spam protection built-in
- ✅ File upload support (optional)
- ✅ Free tier available
- ✅ GDPR compliant

## Notes
- The form now uses Formspree instead of the server's `/feedback` endpoint
- No need to maintain a feedback database on your server
- Submissions are logged in your Formspree dashboard
- You can set up email notifications and integrations in Formspree settings
