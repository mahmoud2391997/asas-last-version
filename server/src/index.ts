import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Cluster44370:rPxVwmau0taAOsUJ@cluster44370.a6jdq.mongodb.net/asas?authMechanism=SCRAM-SHA-1')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('Connection error', err.message)
  });