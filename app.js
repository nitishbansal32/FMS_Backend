require('dotenv').config();
require('express-async-errors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose=require('mongoose')
require('express-async-errors');
const express = require('express');
const app = express();
const inventoryRouter=require('./routes/inventoryRoutes')
const driverRouter=require('./routes/driverRoutes')
const accidentRouter=require('./routes/accidentRoutes')
const companyRouter=require('./routes/companyRoutes')
const authRoutes=require('./routes/authRoutes')

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/LC',inventoryRouter);
app.use('/api/v1/LC',driverRouter);
app.use('/api/v1/LC',accidentRouter);
app.use('/api/v1/LC',companyRouter);
app.use('/api/v1/LC',authRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

