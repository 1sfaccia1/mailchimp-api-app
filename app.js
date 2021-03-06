const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
	const { firstName, lastName, email } = req.body;

	// Make sure fields are filled
	if (!firstName || !lastName || !email) {
		res.redirect('/fail.html');
		return;
	}

	// Construct req data
	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};

	const postData = JSON.stringify(data);

	const options = {
		url: 'get new api keys',
		method: 'POST',
		headers: {
			Authorization: 'get new keys'
		},
		body: postData
	};

	request(options, (err, response, body) => {
		if (err) {
			res.redirect('/fail.html');
		} else {
			if (response.statusCode === 200) {
				res.redirect('/success.html');
			} else {
				console.log(response.status);
				res.redirect('/fail.html');
			}
		}
	});
});

app.listen(port, console.log(`Server started on ${port}`));
