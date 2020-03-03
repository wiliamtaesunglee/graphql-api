var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

//GraphQl schema
var schema = buildSchema(`
	type Query {
		course(id: Int!): Course
		courses(topic: String): [Course]
	},
	type Course {
		id: Int
		title: String
		author: String
		description: String
		topic: String
		url: String
	}
`);

var coursesData = [
	{
		id: 1,
		title: 'The Complete Node.js Course',
		description: 'Learn Node',
		topic: 'Node.js',
		url: 'http://localhost:3000'
	},
	{
		id: 2,
		title: 'qualqeur titulo',
		description: 'descriçao qualquer',
		topic: 'qualquer topico',
		url: 'http://localhost:3000'
	}, 
	{
		id: 3,
		title: 'apenas um title',
		description: 'descicao qualquer 2',
		topic: 'topic 3',
		url: 'htto://hahhahahaah'
	}
];

var getCourse = function(args) {
	var id = args.id;
	return courseData.filter(course => {
		return course.id = id;
	})[0];
};

var getCourses = function(args) {
	if(args.topic) {
		var topic = args.topic;
		return courseData.filter(course => course.topic);
	} else {
		return courseData;
	}
}

var root = {
	course: getCourse,
	courses: getCourses
};

//Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
	schema: schema,
	rootValue: root,
	graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Runing On localhost:4000/graphql'));
