/**
 * Created by ps11 on 04/11/17.
 */
'use strict';
var app = angular.module('News');

app.controller('NewsCtrl', function($scope, GetNews, $ionicLoading, $state){

  $ionicLoading.show();
  $scope.dataset = 'Prasheel';
   GetNews.getNews().then(function (response) {
     $scope.dataset = response.articles;
     $ionicLoading.hide();
   });

  $scope.fetchArticle = function(index){
console.log('========article=======', $scope.dataset[index]);
  $state.go('details', {data : $scope.dataset[index]});
  };
});

app.controller('DetailsCtrl', function ($scope, $stateParams) {
console.log('=============data=========', $stateParams.data);
});

app.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});


  app.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, GetNews) {

    var articles={};
    GetNews.getNews().then(function (response) {
      articles = response.articles;
    });
    $scope.cards = Array.prototype.slice.call(articles, 0, 0);
    $scope.cardSwiped = function(index) {
      console.log('===========Index=========',index);
      $scope.addCard(index);
    };

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function(index) {
      var newCard = articles[Math.floor(Math.random() * articles.length)];
      // var newCard = cardTypes[index+1];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    };

    $scope.goAway = function() {
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      card.swipe();
    };
  });

