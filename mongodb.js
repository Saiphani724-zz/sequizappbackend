const MongoClient = require('mongodb').MongoClient;


var ipaddress1 = '127.0.0.1'
var ipaddress2 = '192.168.99.100'
var ipaddress3 = '172.28.1.4'
const url = `mongodb://${ipaddress3}:27017`;

dbName = 'QuizAppDB'

MongoClient.connect(url, {useNewUrlParser : true}, 
	(err,client)=>{
		if(err){
			console.log('Unable to connect to db');
		}
		// console.log('Connected correctly');
		const db = client.db(dbName);
		// db.collection('users').insertOne({
		// 	username : 'sachmo',
		// 	password: 'sachipo',
		// 	email : 'tsachmo1999@gmail.com',
		// 	rollNo : 'cb.en.u4cse17141',
		// 	mobile : '1234566784'
		// })
		
		// db.collection('quizes').insertOne({
		// 	quizCode : 'SE02',
		// 	course: 'Software Engineering',
		// 	isAvailable : true,
		// 	due: '21-Feb-20 5:00 pm',
		// 	resultRelease : 'false',
		// 	prvQuiz : true,
		// 	questions : 
		// 	[
		// 	  {
		// 		question : 'Which of the following is not part of a process pattern template?',
		// 		options : ['Forces', 'Resulting context', 'Solution', 'Communication'],
		// 		correctAns : 'A'
		// 	  },
		// 	  {
		// 		question : 'Which of the following is a Product Line software?',
		// 		options : ['Robotics', 'Multimedia', 'Computer Aided Design Software', 'Keypad control for an ATM machine'],
		// 		correctAns : 'B'
		// 	  },
		// 	  {
		// 		question : 'Which of the following activity is the last activity in a sprint?',
		// 		options : ['Sprint review', 'Sprint planning', 'Spring retrospective', 'Standup meeting'],
		// 		correctAns : 'A'
		// 	  },
		// 	  {
		// 		question : 'Which of the following keyword(s) describes the precise outcome of a sprint?',
		// 		options : ['None of these', 'Fully tested product', 'Some features of the product', 'Potentially shippable product increment'],
		// 		correctAns : 'D'
		// 	  },
		// 	  {
		// 		question : 'Who helps in removing impediments in the scrum team ',
		// 		options : ['Technical Manager', 'Test Engineer', 'Impediment expert', 'Scrum master'],
		// 		correctAns : 'D'
		// 	  },
		// 	]
		//   })
		

		var myCursor = db.collection('quizes').find({isAvailable : true});
		let arr = [];
		myCursor.forEach(function(data){
			arr.push(data);
		},function() {
			console.log(arr)
		});
				
	}
	
);