var keys = ['k1', 'k3', 'k4'];
var people = {
	k1: {firstName: 'Mihai', lastName: 'Eminescu'},
	k2: {firstName: 'George', lastName: 'Enescu'},
	k3: {firstName: 'Nicolae', lastName: 'Iorga'},
	k4: {firstName: 'Stefan', lastName: 'Luchian'},
	k5: {firstName: 'Octav', lastName: 'Onicescu'},
	k6: {firstName: 'Grigore', lastName: 'Antipa'}
    };
var getKeys = () => new Promise(resolve => setTimeout(() => resolve(keys), 3000));
var getPerson = (key) => new Promise(resolve => setTimeout(() => resolve(people[key]), 3000));

var asyncFn = (async function() {
    var keysForPeople = await getKeys();

    console.log('>>', keysForPeople);

    for(let person of keysForPeople.map(getPerson)) {
	let p = await person;
	console.log(p.firstName + ' ' + p.lastName);
    }

    return 'async function terminated';
}());

console.log('asyncFn>', asyncFn);
asyncFn.then(data => console.log('asyncFn data>', data));
