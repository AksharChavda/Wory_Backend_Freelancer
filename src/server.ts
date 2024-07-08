import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

mongoose.connect(config.mongodbUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const port = config.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
