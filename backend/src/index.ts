import { config } from '@/config';
import express from 'express';

const app = express();

app.get('/signup', (req, res) => {
    res.send('Hello, World!');
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});