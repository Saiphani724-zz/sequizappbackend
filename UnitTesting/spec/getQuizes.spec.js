// // var app = require("../spec/jasmine_examples/jasmine_test1");

// var request = require("request");
// var ipaddress = "172.28.1.3"

// describe("Get Quizes", function () {
// 	describe("Testing", function () {

// 		it("Expecting previous Quizes", function (done) {
			
// 			var base_url = `http://${ipaddress}:5000/getQuizes?prvQuiz=${true}`

// 			console.log(base_url);

// 			request.get(base_url, function (error, response, body) {
// 				// expect(JSON.parse(response.body)["isRegisterSuccess"]).toBe(true);
// 				body = JSON.parse(response.body);
// 				for(val in body){
// 					expect(body[val]["prvQuiz"]).toBe(true);
// 				}
				
								
// 				done();
// 			});
// 		});
		
// 		it("Expecting Available Quizes", function (done) {
			
// 			var base_url = `http://${ipaddress}:5000/getQuizes?prvQuiz=${false}`

// 			console.log(base_url);

// 			request.get(base_url, function (error, response, body) {
// 				// expect(JSON.parse(response.body)["isRegisterSuccess"]).toBe(true);
// 				body = JSON.parse(response.body);
// 				for(val in body){
// 					expect(body[val]["prvQuiz"]).toBe(false);
// 				}
				
								
// 				done();
// 			});
// 		});

	

// 	});
// });
