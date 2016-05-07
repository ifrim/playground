function bootstrapNg(ngModule, data) {
	return function(element) {
		var $element = $(element);
		$element.data('$injector', '');
		angular.module(ngModule).controller('MyController', ['$scope', function($scope) {
			$.extend($scope, data);
		}]);
		$element.attr('ng-controller', 'MyController');
		angular.bootstrap($element, [ngModule]);
	};
}

angular.module('services', [])
.service('RandomService', [function() {
	this.value = 7;
}]);

angular.module('comp2', [])
.component('comp2', {
	template: '<span>comp2 - angular-component</span>',
	bindings: {
		items: '='
	},
	controller: [function() {
		console.log('>>', this.items);
	}]
});

var reactElement = React.createClass({
	render: function() {
		var items = [
			{id: 1, name: 'Item 1'},
			{id: 2, name: 'Item 2'},
			{id: 3, name: 'Item 3'}
		];
		var randomService = angular.injector(['ng', 'services']).get('RandomService');
		return React.createElement('div', {ref: bootstrapNg('comp2', {items: items})},
			React.createElement('span', null, this.props.message + ' - RandomService\'s value is ' +  randomService.value),
			React.createElement('comp2', {'data-items': 'items'})
		);
	}
});

angular.module('comp1', [])
.component('comp1', {
	template:
		'<span>comp1 - angular component</span>' +
		'<div id="react-component-wrapper" ng-non-bindable></div>',
	controller: ['$element', function($element) {
		ReactDOM.render(
		    React.createElement(reactElement, {message: 'react component!'}),
		    $element[0].querySelector('#react-component-wrapper')
		);
	}]
});

angular.bootstrap(document.querySelector('comp1'), ['comp1']);