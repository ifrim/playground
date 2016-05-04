function bootstrapNg(ngModule) {
	return function(element) {
		var $element = $(element);
		$element.data('$injector', '');
		angular.bootstrap($element, [ngModule]);
	};
}

angular.module('comp2', [])
.component('comp2', {
	template: '<span>comp2 - angular-component</span>'
});

var reactElement = React.createClass({
	render: function() {
		return React.createElement('div', null,
			React.createElement('span', null, 'react component!'),
			React.createElement('comp2', {ref: bootstrapNg('comp2')})
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
		    React.createElement(reactElement),
		    $element[0].querySelector('#react-component-wrapper')
		);
	}]
});

angular.bootstrap(document.querySelector('comp1'), ['comp1']);