console.log('ng :> ', angular, angular.Component);

var myApp = angular.
Component({
    selector: 'my-app'
}).
View({
    templateUrl: 'app.html'
}).
Class({
    constructor: [function() {
        this.myName = 'Vlad';
    }]
});

angular.bootstrap(myApp);
