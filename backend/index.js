const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51S0SMFAILc2kk1WHYn8jUzJWRKEKVhECsFMDO8Je49HLV6ZcJlrvPbqxYe7ek7ohGBmfUAItIN4Gmpdrs1j6rGH400HrEihLyB');

const serviceAccount = require('./sheet-translator-293b1-firebase-adminsdk-fbsvc-a3303f5389.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/auth/google', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // Here you can create a new user in your database or update an existing one
    // For now, we'll just send back the user's information
    res.status(200).json({ uid, email, name });
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(401).send('Unauthorized');
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/cancel',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/translate', (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).send('Missing required parameters: text and targetLanguage');
  }

  // TODO: Integrate with a translation service (e.g., Google Translate API)
  // For now, we'll just return a dummy translated text
  const translatedText = `Translated: ${text} to ${targetLanguage}`;

  res.json({ translatedText });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});