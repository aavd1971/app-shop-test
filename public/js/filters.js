app.filter('pagination',function(){
    return function(data,countPerPage){
        if(angular.isArray(data)){
            var ar = [];
            for(var i = 0;i < Math.ceil(data.length / countPerPage);i++){
                ar.push(i);
            }
            return ar;
        }
        return data;
    }
})
    .filter("range", function ($filter) {
        return function (data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                } else {console.log(1);
                    return $filter("limitTo")(data.splice(start_index), size);
                }
            } else {
                return data;
            }
        }
    })