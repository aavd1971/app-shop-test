app.controller('DefaultCtrl',function($scope){
    $scope.linksMenu = [
        {name: 'о магазине',title: 'краткое описание магазина',link: 'about'},
        {name: 'контакты',title: 'телефон, мейл',link: 'contacts'},
        {name: 'корзина',title: 'создание, редактирование,удаление записей',link: 'basket'},
    ];
});