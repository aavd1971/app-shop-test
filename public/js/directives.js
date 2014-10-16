app.directive('valid',function(){
    return {
       restrict: 'A',
       link: function (s,e,a,c){
           e.on('submit',function(){
               if(e.$valid){
                   console.log('v');
               } else{
                   console.log('i');
               }
           });
       }
    }
})
.directive('reset',function (){
    return {
        restrict: 'A',
        link: function (s,e,a,c){
            e.on('click',function(){
                var inputs = $('form[name="formAdd"]').find('input');
                angular.forEach(inputs,function(e,i){
                    $(e).val('');
                    s.formAdd.$setPristine();
                });
            })
        }
    }
}
)
.directive('addFormControl',function (){
        var count = 0;
    return {
        restrict: 'A',
        link: function (s,e,a,c){
            e.on('click',function (){
                    count++;
                    var inputs = $(this).closest('tr').find('input');
                    angular.forEach(inputs,function (el,i){
                            if(count % 2){
                                $(el).addClass('form-control');s.$apply(function(){s.dis = false});
                            }else{
                                $(el).removeClass('form-control');s.$apply(function(){s.dis = true})
                            }

                        }
                    )
                }
            );
        }
    }
}
)
.directive('resetFormSearch',function (){
        return {
            restrict: 'A',
            link: function (s,e,a,c){
                e.on('click',function(){
                    s.$apply(function(){s.search = '';});
                    s.formSearch.$setPristine();
                });
            }
        }
    }
)
.directive('menu',function($compile){
        return {
            restrict: 'E',
            link: function(s,e,a,c){
                s.currentLi = 1;
                s.setLi = function(li){
                    s.currentLi = li;
                }
                s.getClassActiveLi = function(li){
                    return (li === s.currentLi) ? 'active' : '';
                }

                var tmp = '<ul class="nav nav-pills nav-stacked">\
                    <li ng-class="getClassActiveLi($index + 1)" ng-repeat="el in linksMenu" ng-click="currentLi = setLi($index + 1)"><a href="#{{ el.link }}" class="navbar-link" title="{{ el.title }}">{{ el.name }}</a></li>\
                    </ul>';
                var newDomEl = angular.element(tmp);
                var compileFn = $compile(newDomEl);
                compileFn(s);
                e.append(newDomEl);
            }
        }
    });