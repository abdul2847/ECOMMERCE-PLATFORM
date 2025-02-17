const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');


const connectDB = require('./database/database')


// Load environment variables from .env file
require('dotenv').config();

// Create application
const app = express();

// Set global errors variable
app.locals.errors = null;

connectDB();
// Use MongoStore as session store
app.use(session({
    secret: 'Secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://abdulhafis2847:pious2847@malldb.fn96kux.mongodb.net/MallDb?retryWrites=true&w=majority'
    })
  }));

app.use(flash());

app.use((req, res, next) => {
    res.locals.message = req.flash('alert');
    next();
});

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'))

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Require routers from the route folder
const router = require('./routes/index');
const users = require('./routes/Users');
const admin = require('./routes/admin');
const product = require('./routes/products');
const cart = require('./routes/cart');
const order = require('./routes/order');

// Using the routers
app.use(router);
app.use(users);
app.use(admin);
app.use(product);
app.use(cart);
app.use(order)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started at http://localhost:${port}`);
    }
});
