const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./app/db/mongoose');
const router = express.Router();
const graphqlHttp = require('express-graphql').graphqlHTTP;
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolver/index');
const isAuth = require('./middleware/is-auth');
//load env variables
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

//portNo
const PORT = process.env.PORT || 8000;

//loading database
connectDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.send('GraphQl Assignment');
})

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

server = app.listen(PORT, console.log(`Server is up and running at port number ${PORT} , Mode=${process.env.NODE_ENV}`));