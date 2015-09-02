'use strict';

(function() {

angular.module('timerApp').controller('StatCtrl', ['$scope', 'TasksService',  function($scope, TasksService) {
    
  var arr = (TasksService.getTasksList().length!==0)?
                            TasksService.getTasksList(): false;     
 
  var valHorizChart = null,
      valPieChart = null;
    
      if(arr){
        var arrForG = arrValGraph(arr);
            valPieChart =  mkValForPieChart(arrForG);
            valHorizChart = mkValForHorizChart(arrForG);
      }else{
          return false;
      };
    	
      $scope.dataHorizChart = valHorizChart; 
      $scope.dataPieChart = valPieChart;
    
      $scope.xFunction = function() {
        return function(d) {
          return d.key;
        }
      };
    
      $scope.yFunction = function() {
        return function(d) {
          return d.y;
        }
      };

      $scope.descriptionFunction = function() {
        return function(d) {
          return d.key;
        }
      };
   
      $scope.setPositionSVG = function(){
        return function(){ 
          d3.select("svg").attr("viewBox","0 50 400 200");
        }
      }; 
    
      $scope.toFormatToolTipPieContent = function(){   
	    return function(key, x) {
        return  '<table>'+'<tr><td>name:</td>'+'<td>'+key+'</td></tr>'+
                '<tr><td>time:</td>'+'<td>'+toFormatNum(x)+' sec'+'</td></tr>'+
                '</table>'        
	      }
      };
    
      $scope.toSecondsFormat = function(){
        return function(d){   
          return toFormatNum(d)+' sec';
        }
      };
      
      function toFormatNum(d){
         return (/,/.test(d))? parseFloat(d.replace(',',''))/1000 : d/1000;      
      };
        
      function arrValGraph(arr){
        var arrToGraph = [];
          arr.forEach(function(obj){
            for (var key in obj ){
                if(key=='currentTime'||key=='name')arrToGraph.push(obj[key]);    
            }       
          });  
          return arrToGraph;
      };   
    
      function mkValForHorizChart(arr){
        var grphArr =[],
            nameArr =[];
        arr.forEach(function(e, i){
      var arrNew=[];
    if(typeof(e)!=='string'){
        arrNew.push(i, e);
        grphArr.push(arrNew);
    }else{
        nameArr.push(e+' ');
    }
          });
        var hashData = {
              'key':nameArr,
              'values':grphArr
            };
        var arrHorizChart = [];
            arrHorizChart.push(hashData);
            return arrHorizChart;
      }; 
    
      function mkValForPieChart(arr){
         var obj = {},
             pieValArr=[];
        
             arr.forEach(function(e, i, arr){
               if(i%2===0){
                  obj.key = e;
                  }else{
                  obj.y = e; 
                  pieValArr.push(obj);
                  obj = {};
                  }  
              });    
            return pieValArr;
      };
    
  }])
   
})();