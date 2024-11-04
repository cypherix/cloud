import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import { createSneaker, getAllSneakers, getSneakerById, updateSneaker, deleteSneaker } from './controllers/sneakerController.js';
import {payment_intent, webhook} from './controllers/webhook.js'
import { login, register } from './controllers/authcontroller.js';
const app = express();


// Middlewares
app.use(cors())
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'js.stripe.com'],
      // Add other directives as necessary
    },
  })
);

// Routes
app.post('/api/register',register);
app.post('/api/login',login);
app.post('/create-payment-intent', payment_intent);
app.post('/webhook', webhook);
app.post('/api/sneakers', createSneaker);
app.get('/api/sneakers', getAllSneakers);
app.get('/api/sneakers/:id', getSneakerById);
app.put('/api/sneakers/:id', updateSneaker);
app.delete('/api/sneakers/:id', deleteSneaker);





// To Store Sneakers Date on the Database
/*
import {data} from './data.js';
  import Sneaker from './controllers/sneakerController.js';
  const storeSneakers = async (sneakersData) => {
    try {
      await Sneaker.insertMany(sneakersData); // Insert all sneakers into the database
      console.log('Sneakers data inserted successfully.');
    } catch (error) {
      console.error('Error inserting sneakers:', error);
    } 
  };

  storeSneakers(data);

*/  

// Connect to MongoDB
const PORT =  3001;

// mongodb://127.0.0.1:27017/
// mongodb+srv://alpha:2123@cluster0.komfery.mongodb.net/?retryWrites=true&w=majority&appName=cluster0

mongoose
  .connect("mongodb://127.0.0.1:27017/shoe-hub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
  .catch((error) => console.log(`${error} did not connect`));



  