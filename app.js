const express = require('express');
const { render } = require('ejs');
const morgan = require('morgan');
const methodOverride = require('method-override');
const groupRoutes = require('./routes/groupRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

let port = 1818;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD'
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'))


mongoose.connect(url)
.then(() => {
  app.listen(port, host, () => {
    console.log("server is listening on port " + port);
   });
})
.catch(err => console.log(err.message));

app.use(
  session({
        secret: 'ijubkiwjebfdkjwebsfdkjb',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge:60 * 60 * 60 * 5 * 1000}
  })
)

app.use(flash());

app.use((req, res, next) => {
      res.locals.user = req.session.user || null;
      res.locals.errorMessages = req.flash('error');
      res.locals.successMessages = req.flash('success');
      next();
})


app.get('/', (req, res) => {
    res.render('index');
})

app.use('/groups', groupRoutes );
app.use('/user', userRoutes);
app.use('/', mainRoutes );


app.use((req, res, next) => {
    let err = new Error("Could not find page " + req.url);
    err.status = 404;
    next(err);
});

/*
 app.use((err, req, res, next) =>{
      if(!err.status){
        err.status = 500;
        err.message = ("internal Server Error ");
      };
      res.status(err.status);
      res.render('error', {error: err});
}); */
