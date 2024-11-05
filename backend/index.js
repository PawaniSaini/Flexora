const express = require('express');
const UserRouter = require('./routers/UserRouter');
const SpaceRouter = require('./routers/SpaceRouter');
const BookingRouter = require('./routers/BookingRouter');
const ReviewRouter = require('./routers/ReviewRouter');
const AdminRouter = require('./routers/AdminRouter');
const utilRouter = require('./routers/utils');
const cors = require('cors')
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
app.use('/util', utilRouter);

app.use(express.static('./static/uploads'));

app.get('/add', (req, res) => {
    res.send('response from add');
});

//starting the server express
app.listen(port, () => {

    console.log('server started');
});