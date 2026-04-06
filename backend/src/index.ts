import { config } from '@/config.js';
import express from 'express';

const app = express();
console.log('Config:', config);

app.get('/signup', (req, res) => {
    res.send('Signup endpoint');
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});