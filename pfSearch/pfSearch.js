angular.module('app').directive('pfSearch',pfSearch);

function pfSearch(tasosService){
    return{
        template:'<h1>Tasos</h1>',
        restrict:'EA',
        link:function(scope){
            tasosService.generalGet('https://ifsc.razorpay.com/KARB0000001')
        }
    }
}