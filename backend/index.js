const express = require('express');
const UserRouter = require('./routers/UserRouter');
const SpaceRouter = require('./routers/SpaceRouter');
const BookingRouter = require('./routers/BookingRouter');
const ReviewRouter = require('./routers/ReviewRouter');
const AdminRouter = require('./routers/AdminRouter');
const utilRouter = require('./routers/utils');
const cors = require('cors')
require('dotenv').config();

// import Razorpay from "razorpay";
const Razorpay  = require('razorpay');

//initialize express
const app = express();

const port = 5000;
//middleware
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json());

app.use('/user', UserRouter);
app.use('/space', SpaceRouter);
app.use('/booking', BookingRouter);
app.use('/review', ReviewRouter);
app.use('/admin', AdminRouter);
app.use('/utils', utilRouter);

app.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body; // Amount in paise (e.g., ₹50 = 5000 paise)
  
        // Initialize Razorpay instance
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID, // Private Key ID (Server-side)
          key_secret: process.env.RAZORPAY_KEY_SECRET, // Private Key Secret (Server-side)
        });
  
        // Create Razorpay order
        const options = {
          amount, // Amount in paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        };
  
        const order = await razorpay.orders.create(options);
  
        res.status(200).json({ success: true, order });
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Failed to create order", error });
      }
    }
)

app.use(express.static('./static/uploads'));

app.get('/add', (req, res) => {
    res.send('response from add');
});

//starting the server express
app.listen(port, () => {

    console.log('server started');
});