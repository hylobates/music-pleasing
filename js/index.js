var app = angular.module("app",["ionic","ui.router"]);

app.controller("ioCtrl",function ($scope,$http,$ionicSideMenuDelegate) {

	function configApi(callback,apiData) {//请求API的方法
		var def = {
			api:common.api,
			showapi_appid:common.showapi_appid,
			showapi_sign:common.showapi_sign
		}
		var _apiData = $.extend(def,apiData);
		if (_apiData.api == common.api) {
			$http.get(_apiData.api + '?showapi_appid=' + _apiData.showapi_appid + '&showapi_sign=' + _apiData.showapi_sign + '&topid=' + _apiData.topid)
			.success(function (data) {
				callback(data);
			})
		}else if (_apiData.api == common.apiLyric) {
			$http.get(_apiData.api + '?showapi_appid=' + _apiData.showapi_appid + '&showapi_sign=' + _apiData.showapi_sign + '&musicid=' + _apiData.musicid)
			.success(function (data) {
				callback(data);
			})
		}else if (_apiData.api == common.searchSong) {
			$http.get(_apiData.api + '?showapi_appid=' + _apiData.showapi_appid + '&showapi_sign=' + _apiData.showapi_sign + '&keyword=' + _apiData.searchkey)
			.success(function (data) {
				callback(data);
			})
		}
	}
	//歌曲列表
	configApi(function (data) {
		$scope.songlist = data.showapi_res_body.pagebean.songlist;
	},{topid:3});

	$http.get('data/cloud.txt').success(function (albumData) {
		$scope.albums = albumData;
	})

	//更改头部图标状态透明度
	$scope.pageShow = 1;//初始化页数
	  $scope.slideHasChanged = function(index) {//滑动切换页面
	    $scope.pageShow = index;
	  }
	  $scope.pageSwitch = function (evn) {//点击切换页面
	  	$scope.pageShow = $(evn.target).index();
	  }

	  $scope.toSpecial = function (albumId,albumTxt) {//点击专题跳转
			console.log(albumId);
		configApi(function (data) {
			console.log(data);
			$scope.songlist = data.showapi_res_body.pagebean.songlist;
			$scope.albumTitle = albumTxt;
		},{topid:albumId});
	  }
	  $scope.cloudBack = function () {
	  		console.log("back");
	  		window.location.href="http://10.3.136.192/ionic/#/index";
	  }

	  //切歌
	  $scope.playSongUrl = function (url,id,$index,$event) {
	  	$scope.songDownUrl = url;
	  	showLyric(id);
	  	$scope.playIndex = $index;
	  }
	   //播放结束,切换到下一首
	  $('audio').on('ended',function () {
	  		$scope.songDownUrl = $scope.songlist[$scope.playIndex + 1].downUrl;
	  		showLyric($scope.songlist[$scope.playIndex + 1].songid);
	  		$scope.playIndex = $scope.playIndex + 1;
	  })
	  	
	  function showLyric(musicid) {//获取,过滤歌词的方法
		configApi(function (data) {
			var strLyric = data.showapi_res_body.lyric;
			strLyric = strLyric.replace(/&#58;/ig,':')
								.replace(/&#46;/ig,'.')
								.replace(/&#10;/ig,'<br>')
								.replace(/&#32;/ig,' ')
								.replace(/&#45;/ig,'-')
								.replace(/\[[^\]]+\]/ig,'');
			$scope.lyric = strLyric;
		},{api:common.apiLyric,musicid:musicid});	  	
	  }

	  $scope.toggleLeft = function() {//左侧边栏
	    $ionicSideMenuDelegate.toggleLeft();
	  };
	  $scope.toggleRight = function() {//右侧边栏
	    $ionicSideMenuDelegate.toggleRight();
	  };

	  $scope.showLyicPage = function () {//点击底部显示歌词页面
	  		console.log($scope.isShowLyic);
	  		$scope.isShowLyic = !$scope.isShowLyic;
	  }

	  //头部搜索歌曲
	  $scope.searchSong = function (changeKey) {
		  configApi(function (data) {
			$scope.songlist = data.showapi_res_body.pagebean.contentlist;
		},{api:common.searchSong,searchkey:changeKey});	  	
	  }

})

app.filter('trusted', ['$sce', function ($sce) {//多媒体url的过滤
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.config(function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.when("",'/index');
	$stateProvider
		.state('index',{
			url: '/index',
			views:{
				'cloud': {
					templateUrl: 'html/pageCloud.html?_' + Math.random(),
					controller: 'pageCloudCtrl'
				},
				'songList': {
					templateUrl: 'html/pageSongList.html?_' + Math.random(),
					controller: 'pageSongListCtrl'
				},
				'person': {
					templateUrl: 'html/pagePerson.html?_' + Math.random(),
					controller: 'pagePersonCtrl'
				}
			}
		})
		.state("coludSongs",{
			url:"/coludSongs/:albumTxt",
			views:{
				'coludSongs': {
					templateUrl: 'html/coludSongs.html?_' + Math.random(),
					controller: 'pageCloudCtrl'
				},
				'songList': {
					templateUrl: 'html/pageSongList.html?_' + Math.random(),
					controller: 'pageSongListCtrl'
				},
				'person': {
					templateUrl: 'html/pagePerson.html?_' + Math.random(),
					controller: 'pagePersonCtrl'
				}
			}
		})
})

app.controller('pageCloudCtrl', ['$scope', function($scope){
	
}])
app.controller('pageSongListCtrl', ['$scope', function($scope){
	
}])
app.controller('pagePersonCtrl', ['$scope', function($scope){
	
}])