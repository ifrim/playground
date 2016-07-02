function bootstrapNg(ngModule, data) {
	return function(element) {
		var $element = $(element);
		$element.data('$injector', '');
		angular.module(ngModule).run(['$rootScope', rs => $.extend(rs, data)]);
		angular.bootstrap($element, [ngModule]);
	};
}

angular.module('services', [])
.service('RandomService', [function() {
	this.value = 7;
}]);

angular.module('comp2', [])
.component('comp2', {
	template: '<span>comp2 - angular-component: <i>{{$ctrl.getItemsList()}}</i></span>',
	bindings: {
		items: '='
	},
	controller: [function() {
		this.getItemsList = () => this.items.map(i => i.name).join(', ');
	}]
});

var reactElement = React.createClass({
	render: function() {
		var items = [
			{id: 1, name: 'Item 1'},
			{id: 2, name: 'Item 2'},
			{id: 3, name: 'Item 3'}
		];
		var items2 = [
			{id: 21, name: 'Item 2.1'},
			{id: 22, name: 'Item 2.2'},
			{id: 23, name: 'Item 2.3'}
		];
		var randomService = angular.injector(['ng', 'services']).get('RandomService');
		return React.createElement('div', null,
			React.createElement('span', null, this.props.message + ' - RandomService\'s value is ' +  randomService.value),
			React.createElement('comp2', {'data-items': 'items', ref: bootstrapNg('comp2', {items: items})}),
			React.createElement('comp2', {'data-items': 'items', ref: bootstrapNg('comp2', {items: items2}), style: {'marginTop': '20px'}})
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