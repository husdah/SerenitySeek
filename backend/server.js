const express=require('express');
const app=express();
const dbConnect=require('./config/dbcon')
const logger = require('./middlewares/logger');
const { addAdmin } = require('./controllers/addAdmin');
const { notFound, errorHandler } = require('./middlewares/errors');
const path =require('path');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);  // display the requests in console

//helmet: it adds headers to the request for more security
app.use(helmet());
// cors: used for port security
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

// Use cookie-parser middleware
app.use(cookieParser());

// Serve static files from the "uploads" directory
const Imgpath = require('path');
app.use('/uploads', express.static(Imgpath.join(__dirname, 'uploads')));

const emailVerifcationRouter = require('./routes/verificationRouter');
app.use("/api", emailVerifcationRouter);

/* app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); */
const resetPasswordRouter = require('./routes/resetPasswordRouter');
app.use("/password", resetPasswordRouter);

const paymentRouter = require("./routes/PaymentTestRouter");
app.use("/api", paymentRouter);

const loggerRouter = require("./routes/loggerRouter");
app.use("/api", loggerRouter);

const userRouter = require("./routes/userRouter");
app.use("/api", userRouter);

const companyRouter = require("./routes/companyRouter");
app.use("/api", companyRouter);

const imgRouter  = require("./routes/imgRouter");
app.use("/api", imgRouter);

const blogRouter = require("./routes/blogRouter");
app.use("/blogs",blogRouter);

const packageRouter = require("./routes/packageRouter");
app.use("/api", packageRouter);

const bookPackageRouter=require("./routes/bookPackageRouter")
app.use("/package",bookPackageRouter);

const hotelRouter = require("./routes/hotelRouter")
app.use("/api", hotelRouter);

const contactRouter = require("./routes/contactRouter")
app.use("/api", contactRouter);

const chatRouter = require("./routes/chatRouter");
app.use("/api/chat", chatRouter);

//Error handler Middleware
app.use(notFound);
app.use(errorHandler);

dbConnect()
.then(() => {
    // The database connection is successful, you can start your app logic here
    // e.g., start the server
    app.listen(process.env.PORT, () => {
        console.log('App is listening on port ' + process.env.PORT);
    });

    addAdmin();
})
.catch((error) => {
    // Handle error (e.g., log the error or exit the application)
    console.error('Error connecting to the database:', error.message);
});