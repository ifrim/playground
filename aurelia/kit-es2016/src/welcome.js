export class Welcome {
    heading = 'Welcome to Aurelia!';
    firstName = 'John';
    lastName = 'Doe';

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    submit() {
        alert(`Welcome, ${this.fullName}!`);
    }

    cev(e) {
        console.log('cev event', e);
        let frm = document.querySelector('form');
        console.log('form', document.querySelector('form'));
        frm.dispatchEvent(new Event('cev'));
    }

    cevHandler() {
        console.log('cev handler executing...');
        this.firstName = 'something blue' + Math.random();
    }
}