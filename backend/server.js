import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan'

import {route} from './utils/searchClient.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('short'));

app.use('/api', route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
