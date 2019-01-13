angular.module('app')
    .factory('PendingRequests',PendingRequests)

function PendingRequests(){
    var pending=[];
    return{
        get:get,
        add:add,
        remove:remove,
        cancelAll:cancelAll
    }
    function get(){
        return pending;
    }
    function add(pr){
        pending.push(pr)
    }
    function remove(request) {
        pending = _.filter(pending, function(p) {
          return p.url !== request;
        });
      };
    function cancelAll(){
        angular.forEach(pending,(p)=>p.canceller.resolve())
        pending.length=0;
    }
}