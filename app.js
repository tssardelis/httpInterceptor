var myApp=angular.module('app',['ui.router'])

myApp.controller('xxx',function($transitions,$scope,$state,PendingRequests,$http){
    $scope.requests = [];
   $scope.$watch(function() {
     return PendingRequests.get();
   }, function(pendings) {
     if (pendings.length>0){
     angular.forEach(pendings,(p)=>{
        var index=pendings.findIndex(x=>x.url==p.url)
        if (pendings[index-1]){
          if (pendings[index-1].done){
            if (!p.done){
                makeCall(p)
                return;
            }
          }
          else
            return
        }
        else{
          if (!pendings[index].done){
            makeCall(p)
            return;
          }
        }
     })
    }
   },true)

  function makeCall(p){
    $http.get(p.url,{timeout:p.canceller.promise})
    .finally(re=>{
      p.done=true
      pendingRequests.remove(p.url)
    }
   )
  }

//state change
$transitions.onStart({}, function(trans) {
  PendingRequests.cancelAll();
 });

//click functions
  $scope.goToAbout=function(){
       $state.go('about')
   }

    $scope.goToHello=function(){
        $state.go('hello');
   }
})


//State Declaration
myApp.config(function($stateProvider) {
    var helloState = {
      name: 'hello',
      url: '/hello',
      template: '<h1>{{::title}}</h1><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search><pf-search></pf-search>',
      controller:'HelloController'
    }
  
    var aboutState = {
      name: 'about',
      url: '/about',
      controller:'AboutController',
      template: '<h1>{{::title}}</h1><pf-search></pf-search><pf-search></pf-search>',
      params:{x:null}
    }
  
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
  });