var request = require("request");
var ipaddress = "172.28.1.3"
var assert = require('assert')
describe("Login", function () {
	describe("Testing with", function () {

		it("Correct user details1", function (done) {
			var username = 'Saiphani724'
			var password = '1919'
			var base_url = `https://lit-headland-82372.herokuapp.com/login?username=${username}&&password=${password}`
			console.log(base_url);

			request.get(base_url, function (error, response, body) {
				//console.log(response);
				var resp = JSON.parse(response.body)["userFound"]
				assert.equal(resp,true);
				done();
			});
		});

		it("Wrong user details1", function (done) {
			var username = 'Saiphani724'
			var password = '1234'
			var base_url = `https://lit-headland-82372.herokuapp.com/login?username=${username}&&password=${password}`
			console.log(base_url);

			request.get(base_url, function (error, response, body) {
				var resp = JSON.parse(response.body)["userFound"]
				assert.equal(resp,false);
				done();
			});
		});

		it("Correct user details2", function (done) {
			var username = 'sachmclear'
			var password = 'sachipo'
			var base_url = `https://lit-headland-82372.herokuapp.com/login?username=${username}&&password=${password}`
			console.log(base_url);

			request.get(base_url, function (error, response, body) {
				console.log(response.body)
				//expect(JSON.parse(response.body)["userFound"]).toBe(false);
				var resp = JSON.parse(response.body)["userFound"]
				assert.equal(resp,false);
				done();
			});
		});


		it("Wrong user details2", function (done) {
			var username = 'Sachmo'
			var password = 'sachipo'
			var base_url = `https://lit-headland-82372.herokuapp.com/login?username=${username}&&password=${password}`
			console.log(base_url);

			request.get(base_url, function (error, response, body) {
				expect(JSON.parse(response.body)["userFound"]).toBe(true);
				var resp = JSON.parse(response.body)["userFound"]
				assert.equal(resp,true);
				done();
			});
		});


	});
});
