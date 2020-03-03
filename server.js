var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

//GraphQL chema
var schema = buildSchema(`
	type Query {
		message: String
	}
`);

//Root resolver
var root = {
	message: () => 'Hello World'
};

//Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql ({
	schema: schema,
	rootValue: root,
	graphql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server now Running On localhost:4000/graphql'));
