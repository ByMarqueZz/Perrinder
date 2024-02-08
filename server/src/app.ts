import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
const cors = require('cors');
import { connectToMongoDB } from './database';
import userRoutes from './routes/userRoutes';

const app = express();
const port = config.port || 1112;

app.use(bodyParser.json());
app.use(cors());

connectToMongoDB();

app.get('/', async (req, res) => {
  res.send('Hello Perrinder API REST!');
});
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});
