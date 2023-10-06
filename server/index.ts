import express from 'express';
import 'dotenv/config';
import { createHandler } from 'graphql-http';
import ClientSchema from './schema/schema.js';
import expressPlayground from 'graphql-playground-middleware-express';

const port = process.env.PORT || 1131;


const app = express()
const graphqlHandler = createHandler({schema: ClientSchema})

app.use('/graphql', graphqlHandler);
app.get('/playground', expressPlayground.default({endpoint: '/graphql'}));

app.listen(port, console.log(`Server running on port ${port}`))
