import express from 'express';
import 'dotenv/config';
import 'colors';
import expressPlayground from 'graphql-playground-middleware-express';
import { createHandler } from 'graphql-http/lib/use/http';
import ClientSchema from './schema/schema.js';
import {connectDB} from './config/db.js';

const port = process.env.PORT || 1138;

connectDB()
const app = express()
const graphqlHandler = createHandler({schema: ClientSchema})

app.use('/graphql', graphqlHandler);
app.get('/playground', expressPlayground.default({endpoint: '/graphql'}));

app.listen(port, console.log(`Server running on port ${port}`))
 