import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(usersRoute)

app.use(statusRoute)

//Config do error handler
app.use(errorHandler)

// servidor
app.listen(3000, () => {
    console.log('Porta 3000 rodado');
})