angular.module('app')
    .factory('tasosService',tasosService)

function tasosService($q,PendingRequests){
    return{
        generalGet:generalGet
    }

    function generalGet(url){
        var canceller=$q.defer();
        PendingRequests.add({
            url:url,
            canceller:canceller,
            done:false
        })
        //Request gets cancelled if the timeout-promise is resolved
      //var requestPromise = $http.get(url, { timeout: canceller.promise });
      //Once a request has failed or succeeded, remove it from the pending list
       //requestPromise.finally(function() {
         //pendingRequests.remove(url);
      // });
       //return requestPromise;
    }
}