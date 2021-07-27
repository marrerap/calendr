var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiPatientsRouter = require('./routes/api/patients');
const apiDoctorsRouter = require('./routes/api/doctors');
const apiAppointmentsRouter = require('./routes/api/appointments');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/patients', apiPatientsRouter);
app.use('/api/v1/doctors', apiDoctorsRouter);
app.use('/api/v1/appointments', apiAppointmentsRouter);



// //   doctors post statement
// app.post('/api/v1/doctors', (req, res) => {
//     if (!req.body || !req.body.text) {
//         // respond with an error
//         res.status(422).json({
//             error: "Must include Doctor Info"
//         })
//         return
//     }
//     // insert new todo into DB with text, and return newly created row
//     db.result("INSERT INTO calendr.Doctor (text) VALUES ($1) RETURNING *", req.body.text)
//         .then((results) => {
//             // get the first result from the returned rows (should only be one anyway)
//             const newDoctor = results.rows[0]
//             // send that created item back to the client
//             res.status(201).json(newDoctor)
//         })
// })




// // patients and appointments post statement
// app.post('/api/v1/todos', (req, res) => {
//     if (!req.body || !req.body.text) {
//         // respond with an error
//         res.status(422).json({
//             error: "must include todo text"
//         })
//         return
//     }
//     // insert new todo into DB with text, and return newly created row
//     db.result("INSERT INTO todos (text) VALUES ($1) RETURNING *", req.body.text)
//         .then((results) => {
//             // get the first result from the returned rows (should only be one anyway)
//             const createdTodo = results.rows[0]
//             // send that created item back to the client
//             res.status(201).json(createdTodo)
//         })
// })



// // appointments get statement to grab all appointments
// app.get('/api/v1/todos', (req, res) => {
//     // Use any to fetch 0 or more results from database
//     db.any("SELECT * FROM todos ORDER BY id")
//         .then((todos) => {
//             // respond with results
//             res.json(todos)
//         })
// })










module.exports = app;
