
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const port = 5000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;

var ipaddress1 = "127.0.0.1"
var ipaddress2 = "192.168.99.100"
var ipaddress3 = "172.28.1.4"
const url = `mongodb://${ipaddress1}:27017`;dbName = 'QuizAppDB'

app.use(cors());


app.get('/login', function (req, res) {
	let uname = (req.query.username);
	let password = (req.query.password);
	var userFound = false;
	MongoClient.connect(url, { useNewUrlParser: true },
		(err, client) => {
			if (err) {
				console.log('Unable to connect to db');
			}
			console.log('Connected correctly');
			const db = client.db(dbName);
			db.collection('users').findOne(
				{
					'username': uname.toLowerCase(),
				}
				, (err, user) => {
					if (err) {
						console.log("Error is", err);
						return;
					}
					// console.log(user);
					if (user === null);
					else if (user.personalInfo.password === password)
						userFound = true;
					// console.log(userFound);
					if (userFound)
						res.send({ "userFound": true })
					else
						res.send({ "userFound": false })
				})
		});
})

app.get('/facultylogin', function (req, res) {
	let uname = (req.query.username);
	let password = (req.query.password);
	var userFound = false;
	MongoClient.connect(url, { useNewUrlParser: true },
		(err, client) => {
			if (err) {
				console.log('Unable to connect to db');
			}
			console.log('Connected correctly');
			const db = client.db(dbName);
			db.collection('faculty').findOne(
				{
					'username': uname.toLowerCase(),
				}
				, (err, user) => {
					if (err) {
						console.log("Error is", err);
						return;
					}
					// console.log(user);
					if (user === null);
					else if (user.personalInfo.password === password)
						userFound = true;
					// console.log(userFound);
					if (userFound)
						res.send({ "userFound": true })
					else
						res.send({ "userFound": false })
				})
		});
})

app.post('/submitNewQuiz', function (req, res) {
	var quizData = req.body;
	quizData.isAvailable = true
	quizData.resultRelease = 'false'


	var correctAns = {}
	var answers = {}
	var isCorrect = {}
	for (var i = 0; i < quizData.questions.length; i++) {
		// correctAns[quizData.questions[i].questionCode] = ""
		// answers[quizData.questions[i].questionCode] = ""
		isCorrect[quizData.questions[i].questionCode] = false
	}

	var userQuizInfo = {
		'quizCode': quizData.quizCode,
		'answers': answers,
		'correctAns': correctAns,
		'marks': 0,
		'prvQuiz': false
	};

	var facultyQuizInfo = {
		quizCode: quizData.quizCode,
		scores: [],
		totalMarks: quizData.questions.length
	}
	// {
	// 	studentname : "",
	// 	isCorrect : isCorrect,
	// 	score : 0
	// }

	// console.log(facultyQuizData);
	console.log(userQuizInfo);


	MongoClient.connect(url, { useNewUrlParser: true },
		(err, client) => {
			if (err) {
				console.log('Unable to connect to db');
			}
			console.log('Connected correctly');
			const db = client.db(dbName);

			db.collection('quizes').insertOne(quizData)

			var myCursor = db.collection('users').find(
				// {prvQuiz : req.query.prvQuiz == 'true'}
			);

			myCursor.forEach(function (data) {
				data.QuizInfo.push(userQuizInfo);

				db.collection('users').findOneAndUpdate({
					'username': data.username
				},
					{
						$set: {
							QuizInfo: data.QuizInfo
						}
					},
					{
						returnOriginal: false
					}
				);
			});


			var myCursor = db.collection('faculty').find(
				{ 'username': quizData.facultyName }
			);

			myCursor.forEach(function (data) {

				data.QuizInfo.push(facultyQuizInfo);
				db.collection('faculty').findOneAndUpdate({
					'username': data.username
				},
					{
						$set: {
							QuizInfo: data.QuizInfo
						}
					},
					{
						returnOriginal: false
					}
				);
			});
		});
	res.sendStatus(200);
})

app.get('/register', function (req, res) {
	reqBody = req.query
	reqBody.username = reqBody.username.toLowerCase()

	userData = {
		username: reqBody.username,
		personalInfo: {
			password: reqBody.password,
			email: reqBody.email,
			mobile: reqBody.mobile,
			rollNo: reqBody.rollNo
		},
		QuizInfo: {}
	}

	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err) {
			console.log('Unable to connect to db');
			return;
		}
		console.log('Connected correctly');
		const db = client.db(dbName);

		db.collection('users').findOne(
			{ 'username': userData.username }
			, (err, user) => {
				if (err) {
					console.log("Error is", err);
					return;
				}
				if (user === null) {
					db.collection('users').insertOne(userData)
					console.log("Inserted");

					res.send({ isRegisterSuccess: true })
				}
				else {
					console.log("Not Inserted");
					res.send({ isRegisterSuccess: false })
				}
			})
	})

})


app.get('/getQuizes', function (req, res) {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err)
			console.log(err);
		else {
			const db = client.db(dbName);

			var reqQuizes = {}

			db.collection('users').findOne(
				{
					'username': req.query.username.toLowerCase(),
				}
				, (err, user) => {
					if (err) {
						console.log("Error is", err);
						return;
					}

					for (let i = 0; i < user.QuizInfo.length; i++) {
						var quiz = user.QuizInfo[i];

						if (quiz.prvQuiz === (req.query.prvQuiz === 'true')) {
							reqQuizes[quiz['quizCode']] = quiz['marks'];
							if ((req.query.prvQuiz != 'true'))
								reqQuizes[quiz['quizCode']] = -1;
						}
						else {
							reqQuizes[quiz['quizCode']] = -2;
						}
					}
				})

			var myCursor = db.collection('quizes').find(
				// {prvQuiz : req.query.prvQuiz == 'true'}
			);
			let arr = [];
			let i = 0;
			myCursor.forEach(function (data) {
				// console.log(reqQuizes[data['quizCode']], req.query.prvQuiz);
				if (reqQuizes[data['quizCode']] != -2) {
					if (reqQuizes[data['quizCode']] != -1) {
						data.marks = reqQuizes[data['quizCode']];
						// console.log(data.marks);
					}

					data.flag = i;
					i = (i + 1) % 2;
					arr.push(data);
					// console.log(data);

				}
			}, function () {
				// console.log(arr);
				res.send(arr);
			});
		}
	});
})

app.get('/getTestQuestions', function (req, res) {
	console.log(req.query.quizCode);

	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err)
			console.log(err);
		else {
			const db = client.db(dbName);
			db.collection('quizes').findOne(
				{ quizCode: req.query.quizCode },
				(err, data) => {
					res.send(data);
				}
			);
		}
	});
})

app.get('/getFacultyQuizes', function (req, res) {
	console.log(req.query.facultyName);

	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err)
			console.log(err);
		else {
			const db = client.db(dbName);
			db.collection('faculty').findOne(
				{ username: req.query.facultyName.toLowerCase() },
				(err, data) => {
					res.send(data);
				}
			);
		}
	});
})

app.get('/getQuizBasicDetails', function (req, res) {
	console.log(req.query.quizCode);

	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err)
			console.log(err);
		else {
			const db = client.db(dbName);
			db.collection('quizes').findOne(
				{ quizCode: req.query.quizCode },
				(err, data) => {
					var response = {}
					response.course = data.course
					response.topic = data.topic
					res.send(response);
				}
			);
		}
	});
})





app.get('/submitQuiz', function (req, res) {
	var data = JSON.parse(req.query.quizResult);
	// console.log(data);

	var scores = {
		username: data.username.toLowerCase(),
		isCorrect: data.QuizInfo.isCorrect,
		score: data.QuizInfo.marks
	};



	var facultyName;

	var quizCode = data.QuizInfo.quizCode;
	var quizInfo = null;
	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err)
			console.log(err);
		else {
			const db = client.db(dbName);

			db.collection('quizes').findOne(
				{
					'quizCode': quizCode,
				}
				, (err, quiz) => {
					if (err) {
						console.log("Error is", err);
						return;
					}

					facultyName = quiz.facultyName;
					console.log(facultyName);

					db.collection('faculty').findOne(
						{
							'username': facultyName,
						}
						, (err, facultyData) => {
							if (err) {
								console.log("Error is", err);
								return;
							}
							for (var i = 0; i < facultyData.QuizInfo.length; i++) {
								if (facultyData.QuizInfo[i].quizCode === quizCode) {
									facultyData.QuizInfo[i].scores.push(scores);
									console.log(facultyData.QuizInfo[i].scores);
								}
							}
							// facultyData.scores.push(scores);
							db.collection('faculty').findOneAndUpdate({
								'username': facultyName
							},
								{
									$set: {
										QuizInfo: facultyData.QuizInfo
									}
								},
								{
									returnOriginal: false
								}
							);
						})
				})
			console.log(facultyName);
			db.collection('users').findOne({
				'username': data.username.toLowerCase()
			}, (err, user) => {
				quizInfo = user.QuizInfo;
				// console.log(quizInfo , quizCode);
				for (let i = 0; i < quizInfo.length; i++) {
					if (quizInfo[i]['quizCode'] === quizCode) {
						quizInfo[i] = data['QuizInfo'];
					}
				}
				// console.log(quizInfo);
				db.collection('users').findOneAndUpdate({
					'username': data.username.toLowerCase()
				},
					{
						$set: {
							QuizInfo: quizInfo
						}
					},
					{
						returnOriginal: false
					}
				);
			})
			// console.log(reqUser);
			res.send({});
		}
	});
})

app.get('/getUser', function (req, res) {
	let uname = (req.query.username);
	MongoClient.connect(url, { useNewUrlParser: true },
		(err, client) => {
			if (err) {
				console.log('Unable to connect to db');
			}

			const db = client.db(dbName);
			db.collection('users').findOne(
				{
					'username': uname.toLowerCase(),
				}
				, (err, user) => {
					if (err) {
						console.log("Error is", err);
						return;
					}
					// console.log(user);
					res.send(user);
				})
		});
})


app.listen(port, () => {
	console.log(`Server started on port ${port}`);
})