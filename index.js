const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

//Router
app.use('/user',require('./Router/UserRouter'));
app.use('/product',require('./Router/ProductRouter'));
app.use('/purchase',require('./Router/OrderRouter'));
//Connect to MongoDB

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.get('/', (req, res) => {
    res.json('Welcome to ecommerce');
}

)
//Port || 5000
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})

