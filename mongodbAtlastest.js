const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://sachmo:sachmoadi1-@secluster-7ftyi.mongodb.net/test?retryWrites=true&w=majority";

dbName = 'QuizAppDB'

MongoClient.connect(url, { useNewUrlParser: true },
	(err, client) => {
		if (err) {
			console.log('Unable to connect to db');
		}

		const db = client.db(dbName);

		db.collection('users').insertOne({});
		db.collection('faculty').insertOne({});
		db.collection('quizes').insertOne({});

		db.collection("users").drop(function (err, delOK) {
			if (err) throw err;
			if (delOK) console.log("Collection deleted");
		});
		db.collection("quizes").drop(function (err, delOK) {
			if (err) throw err;
			if (delOK) console.log("Collection deleted");
		});
		db.collection("faculty").drop(function (err, delOK) {
			if (err) throw err;
			if (delOK) console.log("Collection deleted");
		});


		db.collection('users').insertOne({
			"username": "saiphani724",
			"personalInfo": {
				"password": "1919",
				"email": "saiphani724@gmail.com",
				"mobile": "9246465080",
				"rollNo": "cb.en.u4cse17137"
			},
			"QuizInfo": [
				{
					quizCode: "SE01",
					answers: {},
					correctAns: {},
					marks: 0,
					prvQuiz: false,
				},
				{
					quizCode: "CD01",
					answers: {},
					correctAns: {},
					marks: 0,
					prvQuiz: false,
				},
				{
					quizCode: "SE02",
					answers: {},
					correctAns: {},
					marks: 3,
					prvQuiz: true,
				},
				{
					quizCode: "CD02",
					answers: {},
					correctAns: {},
					marks: 2,
					prvQuiz: true,
				}
			]
		})

		db.collection('users').insertOne({
			"username": "sachmo",
			"personalInfo": {
				"password": "sachipo",
				"email": "tsachmo1999@gmail.com",
				"mobile": "1081081080",
				"rollNo": "cb.en.u4cse17160"
			},
			"QuizInfo": [
				{
					quizCode: "SE01",
					answers: {},
					correctAns: {},
					marks: 0,
					prvQuiz: false,
				},
				{
					quizCode: "CD01",
					answers: {},
					correctAns: {},
					marks: 0,
					prvQuiz: false,
				},
				{
					quizCode: "SE02",
					answers: {},
					correctAns: {},
					marks: 3,
					prvQuiz: true,
				},
				{
					quizCode: "CD02",
					answers: {},
					correctAns: {},
					marks: 4,
					prvQuiz: true,
				}
			]
		})

		db.collection('quizes').insertOne({
			quizCode: 'SE01',
			facultyName : 'ganesh',
			course: 'Software Engineering',
			topic: 'Intro to SE',
			isAvailable: true,
			duration: 1,
			due: '21-Feb-20 5:00 pm',
			date: "24-Feb-20",
			resultRelease: 'false',
			questions:
				[
					{
						question: 'Who typically performs Unit Testing?',
						questionCode: 'SE01_Q01',
						options: [['A', 'End user'], ['B', 'QA Engineer'], ['C', 'Developer'], ['D', 'Scrum master']],
						correctAns: 'A'
					},
					{
						question: 'What is getting evaluated today?',
						questionCode: 'SE_Q02',
						options: [['A', 'Sprint 1 Review'], ['B', 'Sprint 1 Planning'], ['C', 'Sprint 0 planning'], ['D', 'Sprint 0 Retrospective']],
						correctAns: 'B'
					},
					{
						question: 'Which of the following activity is the last activity in a sprint?',
						questionCode: 'SE_Q03',
						options: [['A', 'Sprint 1 Review'], ['B', 'Sprint 1 Planning'], ['C', 'Sprint 0 planning'], ['D', 'Sprint 0 Retrospective']],
						correctAns: 'A'
					},
					{
						question: 'Which of the following keyword(s) describes the precise outcome of a sprint?',
						questionCode: 'SE_Q04',
						options: [['A', 'End user'], ['B', 'QA Engineer'], ['C', 'Developer'], ['D', 'Scrum master']],
						correctAns: 'D'
					},
					{
						question: 'Who helps in removing impediments in the scrum team ',
						questionCode: 'SE_Q05',
						options: [['A', 'End user'], ['B', 'QA Engineer'], ['C', 'Developer'], ['D', 'Scrum master',], ['E', 'Ni Bonda']],
						correctAns: 'D'
					},
				]
		})

		db.collection('quizes').insertOne({
			quizCode: 'SE02',
			facultyName : 'ganesh',
			course: 'Software Engineering',
			isAvailable: true,
			topic: 'Testing',
			duration: 10,
			due: '24-Feb-20 6:00 pm',
			date: "24-Feb-20",
			resultRelease: 'false',
			questions:
				[
					{
						question: 'Who typically performs Unit Testing?',
						questionCode: 'SE02_Q01',
						options: [['A', 'End user'], ['B', 'QA Engineer'], ['C', 'Developer'], ['D', 'Scrum master']],
						correctAns: 'A'
					},
					{
						question: 'What is getting evaluated today?',
						questionCode: 'SE02_Q02',
						options: [['A', 'Sprint 1 Review'], ['B', 'Sprint 1 Planning'], ['C', 'Sprint 0 planning'], ['D', 'Sprint 0 Retrospective']],
						correctAns: 'B'
					},
					{
						question: 'What is the primary requirements validation mechanism?',
						questionCode: 'SE02_Q03',
						options: [['A', 'Technical Review'], ['B', 'Testing'], ['C', 'Sprint Review'], ['D', 'Sprint Retrospective']],
						correctAns: 'A'
					},
					{
						question: 'Which of the following is NOT an Agile Manifesto value?',
						questionCode: 'SE02_Q04',
						options: [['A', 'Working Software'], ['B', 'Contract Negotiation'], ['C', 'Customer Collaboration'], ['D', 'Responding to Change']],
						correctAns: 'D'
					},
					{
						question: 'Which of the following is NOT a problem that occurs as Elicitation happens? ',
						questionCode: 'SE02_Q05',
						options: [['A', 'Problems of understanding'], ['B', 'Problems of Volatility'], ['C', 'Problems of verification'], ['D', 'Problems of Scope']],
						correctAns: 'D'
					},
				]
		})
		db.collection('quizes').insertOne({
			quizCode: 'CD01',
			facultyName : 'ragesh',
			course: 'Compiler Design',
			isAvailable: true,
			duration: 5,
			due: '19-Feb-20 6:00 pm',
			date: "24-Feb-20",
			resultRelease: 'false',
			topic: 'Intro to CD',
			questions:
				[
					{
						question: 'Which of the following derivations does a top-down parser use while parsing an input string? The input is assumed to be scanned in left to right order ?',
						questionCode: 'CD01_Q01',
						options: [['A', ' Leftmost derivation'], ['B', ' Leftmost derivation traced out in reverse'], ['C', 'Rightmost derivation'], ['D', 'Rightmost derivation traced out in reverse']],
						correctAns: 'A'
					},
					{
						question: 'The process of assigning load addresses to the various parts of the program and adjusting the code and data in the program to reflect the assigned addresses is called ?',
						questionCode: 'CD01_Q02',
						options: [['A', 'Assembly'], ['B', 'Parsing'], ['C', 'Relocation'], ['D', 'Symbol resolution']],
						correctAns: 'B'
					},
					{
						question: ' Which of the following statements is false?',
						questionCode: 'CD01_Q03',
						options: [['A', ' An unambiguous grammar has same leftmost and rightmost derivation'], ['B', 'An LL(1) parser is a top-down parser'], ['C', 'LALR is more powerful than SLR'], ['D', 'An ambiguous grammar can never be LR(k) for any k']],
						correctAns: 'A'
					},
					{
						question: `Which of the following grammar rules violate the requirements of an operator grammar? P, Q, R are nonterminals, and r,s,t are terminals
				(i) P -> QR
				(ii) P -> QsR
				(iii) P -> ε
				(iV) P -> QtRr`,
						questionCode: 'CD01_Q04',
						options: [['A', ' (i) only'], ['B', ' (i) and (iii) only'], ['C', '(ii) and (iii) only'], ['D', '(iii) and (iv) only']],
						correctAns: 'D'
					},
					{
						question: `Consider the grammar with the following translation rules and E as the start symbol.
				 E -> E1 #T {E.value = E1.value * T.value| T {E.value = T.value}
				 T -> T1 & F {T.value = T1.value + F.value}|F {T.value= F.value}
				 F -> num {F.value = num.value}
	  Compute E.value for the root of the parse tree for the expression:2 # 3 & 5 # 6 &4. `,
						questionCode: 'CD01_Q05',
						options: [['A', ' 200'], ['B', '180'], ['C', '160'], ['D', ' 40']],
						correctAns: 'D'
					},
				]
		})
		db.collection('quizes').insertOne({
			quizCode: 'CD02',
			course: 'Compiler Design',
			facultyName : 'ragesh',
			duration: 20,
			isAvailable: true,
			topic: 'Parsing',
			due: '27-Feb-20 4:00 pm',
			date: "27-Feb-20",
			resultRelease: 'false',
			questions:
				[
					{
						question: `Given the following expression grammar:
						   E -> E * F | F+E | F
						   F -> F-F | id
						   which of the following is true?`,
						questionCode: 'CD02_Q01',
						options: [['A', '  * has higher precedence than +'], ['B', ' – has higher precedence than *'], ['C', '+ and — have same precedence'], ['D', '+ has higher precedence than *']],
						correctAns: 'A'
					},
					{
						question: 'Consider a program P that consists of two source modules M1 and M2 contained in two different files. If M1 contains a reference to a function defined in M2 the reference will be resolved at ?',
						questionCode: 'CD02_Q02',
						options: [['A', 'Edit time'], ['B', ' Compile time'], ['C', 'Link time'], ['D', 'Load time']],
						correctAns: 'B'
					},
					{
						question: '  Which of the following suffices to convert an arbitrary CFG to an LL(1) grammar?',
						questionCode: 'CD01_Q03',
						options: [['A', '  Removing left recursion alone'], ['B', 'Factoring the grammar alone'], ['C', 'Removing left recursion and factoring the grammar'], ['D', 'None of the above']],
						correctAns: 'A'
					},
					{
						question: 'Assume that the SLR parser for a grammar G has n1 states and the LALR parser for G has n2 states. The relationship between nl and n2 is',
						questionCode: 'CD01_Q04',
						options: [['A', 'n1 is necessarily less than n2'], ['B', 'n1 is necessarily equal to n2'], ['C', 'n1 is necessarily greater than n2'], ['D', ' none of the above']],
						correctAns: 'D'
					},

				]
		})

		db.collection('faculty').insertOne({
			"username" : "ganesh",
			"personalInfo": {
				"password": "iyer",
				"email": "ganeshiyer@gmail.com",
				"mobile": "1234567890",
			},
			"QuizInfo": [
				{
					"quizCode": "SE01",
					"scores" : [],
					"total" : 0
				},
				{
					"quizCode": "SE02",
					"scores" : [],
					"total" : 0
				}
			]
		})

		db.collection('faculty').insertOne({
			"username" : "ragesh",
			"personalInfo": {
				"password": "sadism",
				"email": "sadistragesh@gmail.com",
				"mobile": "0100100100",
			},
			"QuizInfo": [
				{
					"quizCode": "CD01",
					"scores" : [],
					"total" : 0,
					"noOfStudents" : 2
				},
				{
					"quizCode": "CD02",
					"scores" : [],
					"total" : 0,
					"noOfStudents" : 2
				}
			]
		})

		client.close();
	}


);