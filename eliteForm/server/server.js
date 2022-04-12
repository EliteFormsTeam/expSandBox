import express from 'express'
const app = express();
const PORT = 3000;
import dbController from './dbController.js'
import cors from 'cors'

app.use(cors({origin: 'http://localhost:8002',credentials: true,}));
app.use(express.json());

app.post('/signup/checkusername', dbController.checkForUsername, (req, res) => {
  return res.status(200).json(res.locals.username)
})

app.post('/signup/checkemail', dbController.checkForEmail, (req, res) => {
  return res.status(200).json(res.locals.email)
})

// app.post('signup/', dbController.addUser, (req, res) => {
//   return res.status(200).json({ userid: res.locals.userId });
// });



// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.sendStatus(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));