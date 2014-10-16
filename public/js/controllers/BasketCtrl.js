app.controller('BasketCtrl',function ($scope,$http,data){

    $scope.pattern1 = /^\d{1,3}$/i;
    $scope.dis = true;

    var run = function(){
        getData();
    }
    run();

    $scope.$watch('items.length',function(){
        getTotal();
    });
//    $scope.$watch('item.price',function(){
//        getTotal();
//    });
//    $scope.$watch('item.qty',function(){
//        getTotal();
//    });
    function getData(){
        data.getData(function(data){console.log('data:',data);
            $scope.items = data;
        });
    }

    var getTotal = function (){
        var sum = 0;
        angular.forEach($scope.items,function(e,i){
            sum += e.price * e.qty;
        });
        $scope.total = sum;
    }

    $scope.sendForm  = function(form){
        if($scope.formAdd.$valid){console.log(1);
            var dataSend = {name: form.name, qty: form.qty, price: form.price};
            data.insertData({},dataSend,function(d){
                $scope.items.push(dataSend);
                console.log('d:',d.res);
            },function(er){
                console.log('er:',er.status);
            });
        }else{
            console.log('i');
        }
    }

    $scope.removeItem = function (item){

        data.deleteData({id: item._id},function(data){console.log('data:',data.res);
            var iTotal = 0;
            angular.forEach($scope.items,function (el,i){
                    if(item._id === el._id) iTotal = i;
                }
            )
            $scope.items.splice(iTotal,1);
        },function(er){
            console.log('er:',er.status)
        })

        /*data.remove2().rem($.param({id: item.id})).$promise.then(function(result){
            if(!result.error){
                var iTotal = 0;
                angular.forEach($scope.items,function (el,i){
                        if(item.id === el.id) iTotal = i;
                    }
                )
                $scope.items.splice(iTotal,1);
            }
        });*/
    }

    var count = 0;
    $scope.editItem = function (item){
        count++;
        if(!(count % 2)){

            var dataEdit = {id: item._id,name: item.name, qty: item.qty, price: item.price};

            data.editData({id: item._id},dataEdit,function(d){
                $scope.items = d;
            },function(e){
                console.log('er:',e.status);
            });

            getTotal();
        }
    };
    $scope.updateTest = function(){
        var  ob = {_id: '543e63c89849dc580929c051',name: 'n2',qty: 2,price: 2}
        var  obNew = {_id: '543e63c89849dc580929c051',name: 'n22',qty: 22,price: 333}
        data.editData({id: obNew._id},obNew,function(data){console.log('data:',data);},function(er){console.log(er.status);})
    }

    $scope.deleteTest = function(){
        data.deleteData({id: '543e63c89849dc580929c051'},function(data){
            console.log('data',data);
        });
    }
});