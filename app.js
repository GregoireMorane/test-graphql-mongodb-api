const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchemas = require('./graphql/schemas/index')
const graphqlResolvers = require('./graphql/resolvers/index')

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(morgan("dev"));



app.use('/graphql', graphQlHttp({
	schema: graphqlSchemas,
	rootValue: graphqlResolvers,
	graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-483dv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true
`)
	.then(() => {
		app.listen(3002);
	})
	.catch(err => {
		console.log(err);
	})
