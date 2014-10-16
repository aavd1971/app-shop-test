app.factory('data',function($resource){
    return $resource('/resource/:id',{id: '@_id'},
        {
            getData: {method: 'GET',isArray: true},
            insertData: {method: 'POST'},
            editData: {method: 'PUT',isArray: true},
            deleteData: {method: 'DELETE'}
        }
    );
});

app.factory('data_',function($http,$q,$resource){
    return {

        getData: function(){
            var def = $q.defer();
            $http.get('/app/read.php').success(function(data){
                def.resolve(data);
            })
            .error(function (error){
                def.reject(error);
                }
            );
            return def.promise;
        },

        getData2: function(){
          return $resource('/read/');
        },

        insertData: function(dataSend){
            var def = $q.defer();
            $http.post('/app/create.php',dataSend,{headers:  {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(data){
                def.resolve(data);
            })
                .error(function (error){
                    def.reject(error);
                }
            );
            return def.promise;
        },
        insertData2: function (){
            return $resource('/app/create.php',{},
                {put: {method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}}}
            );
        },

        remove: function (item){
            var def = $q.defer();
            var dataDelete = 'id=' + item.id;
            $http.post('/app/delete.php',dataDelete,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (data){
                def.resolve(data);
            }
            ).error(function (error){
                def.reject(error);
            }
            );
            return def.promise;
        },

        remove2: function(){
            return $resource('/app/delete.php',{},{
                rem: {method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            });
        },

        edit: function (item){
            var def = $q.defer();
            var dataEdit = 'id=' + item.id + '&name=' + item.name + '&qty=' + item.qty + '&price=' + item.price;
            $http.post('/app/update.php',dataEdit,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (data){
                    def.resolve(data);
                }
            ).error(function (error){
                    def.reject(error);
                }
            );
            return def.promise;
        },
        edit2: function(){
            return $resource('/app/update.php/:id',{id:'@id'},{
                edit: {method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
            });
        }

    }
})