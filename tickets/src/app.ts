import express from "express";
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show'; 
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';
import { NotFoundError, errorHandler, currentUser } from '@udemy-ticket/common';

const app = express()
app.set('trust proxy',true) // to let express that its behind the proxy of ingress engine x
app.use(express.json())
app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV !== 'test', // for https only
    })
)

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


// app.use('/*', async (req, res) => {
//     console.log("not found")
//   throw new NotFoundError();ß
// });

// app.use(async (req, res) => {
//   console.log("not found");
//   throw new NotFoundError();
// }); // this code wass causing 502 bad gateway remove the password from response

app.use((req, res, next) => {
  next(new NotFoundError());
});


app.use(errorHandler);


export {app}