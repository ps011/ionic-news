/**
 * Created by ps11 on 04/11/17.
 */

var services = angular.module('News');

services.service('GetNews', function($http, $q){
  return {
    getNews : function() {
      var deferred = $q.defer();
      var resp = {};
      $http.get('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=f7ab95d1410a4fd8a89cc7a08ed8d8fc')
        .then(function (response) {
          console.log(response);
          resp =  response.data;
          deferred.resolve(resp);
        });
      return deferred.promise;
    }
}
});
