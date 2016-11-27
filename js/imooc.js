var url = 'http://10.3.136.192/ionic/page1.html';
var app = angular.module('app',['ui.router']);

app.factory('getUserName',['$http',
	function ($http) {
		var getDate = function (username) {
			return $http.get('data/cloud.txt');
		};
		return {
			Liset:function (username) {
				return getDate(username);
			}
		}	
}]);

app.controller('ServiceCtrl',['$scope','$http','$timeout','getUserName',
	function ($scope,$http,$timeout,getUserName) {
		var timeout;
		$scope.$watch('username',function (newUserName) {
			if (newUserName) {
				if (timeout) {
					$timeout.cancel(timeout);
				}
				timeout = $timeout(function () {
					getUserName.Liset(newUserName).success(function (data) {
						console.log(data);
						$scope.users = data[0][newUserName];
					})
				},350)
			}
		})
		$scope.color = 'blue';
		$scope.setColor = function () {
			if ($scope.color == 'red') {
				$scope.color = 'blue';
			}else{
				$scope.color = 'red';
			}
		}
		$scope.isRed = false;
		$scope.isBlue = false;
		$scope.setRed = function () {
			$scope.isRed = true;
			$scope.isBlue = false;
		}
		$scope.setBlue = function () {
			$scope.isRed = false;
			$scope.isBlue = true;
		}
}])

app.filter('addoo',function () {
	return function (item) {
		return item + 'oooooo';
	}
});

app.config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.when("","/pageone");
	$stateProvider
		.state("pageone",{
			url:"/pageone",
			template:'<h1>page1</h1>',
			controller:"pageOne"
		})
		.state("pagetwo",{
			url:"/pagetwo",
			template:'<h1>page2</h1>',
			controller:"pageTwo"
		})
})

app.controller('pageOne',['$scope',
	function ($scope) {
		$scope.txt = 'colorRed';
	}
]);
app.controller('pageTwo',['$scope',
	function ($scope) {
		$scope.txt = 'colorBlue';
	}
]);



/*
	service  provider  factory  本质都是provider
	provider模式 = 策略模式 + 抽象工厂模式的混合体
*/

/*
	service
		$comoile : 编译服务
		$filter : 数据格式化工具，内置八个
		$interval
		$timeout
		$locale
		$location
		$log
		$parse
		$http : 封装ajax

	services{
		factory 放方法，用于被调用
	}

	service 构造函数的写法
	factory 工厂模式的写法
	var app = angular.module('app',[]);
 
	app.service('helloWorldService', function(){
	    this.hello = function() {
	        return "Hello World";
	    };
	});
	 
	app.factory('helloWorldFactory', function(){
	    return {
	        hello: function() {
	            return "Hello World";
	        }
	    }
	});
*/

/*
	ng启动阶段是 config-->run-->compile/link
*/

/*
	$filter
		currency,date,json,limitTo,lowercase,numbner,orderBy,uppercase
		{{ 1213322453 | date : yyyy-MM-dd hh:mm:ss}}
*/