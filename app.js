const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const routes = require('./routes/admin')
const login = require('./routes/login')
const pwdRoutes = require('./routes/password')
const provider = require('./routes/provider')
const employee = require('./routes/employee')
const HttpError = require('./models/http-error');
const app = express();
const cors = require('cors');

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'css')));

app.use('/data', routes.routes);
app.use('/login', login.routes);
app.use('/pwd', pwdRoutes.routes);
app.use('/provider', provider.routes);
app.use('/employee', employee.routes);
app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(
    `mongodb+srv://lbaker15:4rtghlae@cluster0.8pqo6.mongodb.net/Hannahs_Heart_App?retryWrites=true&w=majority
    `, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port);
    })
    .catch(err => {
        console.log(err);
    });
