const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const reviewsRoute = require('./router/reviewsRoute');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {dbName: 'gwangjuTour'}).catch((err) => {
	console.log('failed' + err.message);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('[Server] :date[iso] :method :url :status (:response-time ms)' ))

app.use('/api/tour', reviewsRoute);

app.listen(8080, ()=> {
	console.log('server start')
})