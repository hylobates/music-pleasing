var globalApp = angular.module('globalApp',[]);

globalApp.config(["$httpProvider", function ($httpProvider) {

    $httpProvider.interceptors.push(function ($rootScope, $q) {//配置$http请求时
        return {
            'request': function (config) {//请求成功时
                return config || $q.when(config);
            },
            'requestError': function (rejection) {//请求失败时
                return rejection;
            },
            'response': function (response) {//请求成功返回值时
                return response || $q.when(response);
            },
            'responseError': function (response) {//请求失败时返回时
                return $q.reject(response);
            }
        };
    });
}]);