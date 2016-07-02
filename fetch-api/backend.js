fetchMock.mock('aaa.json', {
	status: 409,
	body: {
		x: 'y',
		y: 'zz'
	}
});