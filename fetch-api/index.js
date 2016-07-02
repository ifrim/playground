fetch('aaa.json')
.then(function(response) {
	console.log('fetch complete', response);
	for(let x of response.headers.entries()) {
		console.log(x);
	}
	// throw new Error('something went wrong!');
	return response.json();
})
.then(function(body) {
	console.log('request body', body);
})
.catch(function(error) {
	console.log('there was an error:', error);
});