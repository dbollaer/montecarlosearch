'use strict';
console.log('\'Allo \'Allo! Content script');
/**function filterResultInserts(event) {
 console.log(event);
 }
 **/
//var target= document.getElementById('ires');
//target.addEventListener('DOMNodeInserted', filterResultInserts);



/** window.addEventListener('DOMNodeInserted', filterResultInserts, false); **/

/**


document.addEventListener("DOMNodeInserted", function(a) {
    if ("ires" === a.srcElement.id) {
        console.log("found ires");
        var app = angular.module('Binged2', []);
        var html = document.querySelector('html');
        html.setAttribute('ng-app', '');
        html.setAttribute('ng-csp', '');
        var viewport = document.getElementById('viewport');
        viewport.setAttribute('ng-controller', 'MainController');

          var myDirective = document.createElement('div');
        myDirective.setAttribute('my-directive', '');
        document.getElementById('gbq2').appendChild(myDirective);
  


        app.directive('myDirective', ['$sce', function($sce) {
                return {
                    restrict: 'EA',
                     scope: { search: '=search' },
                    replace: true,
                    templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('templates/wiki.html'))
                };
            }]);



        app.controller('MainController', function($scope) {

            $scope.search = 'test';
            $scope.$watch("search", function(newValue, oldValue, srcScope) {
                console.log("search changed");
                                srcScope.search3 = newValue;
                var changeText = document.getElementById("changeTest");
                if(changeTest !== null){
                    changeTest.innerHTML = newValue;
                }
              });

        });
        var newInput = document.getElementById('ires');
        newInput.setAttribute('ng-model', 'result');
        var input = document.getElementById('gbqfq');

        input.setAttribute('ng-model', 'search');            
            
        console.log("added search");
      

    }


    angular.bootstrap(html, ['Binged2'], []);
});


**/