(function () {
    'use strict';

    angular.module('MIPM').controller('addEditAdvertController', addEditAdvertController);
    addEditAdvertController.$inject = ['firebaseUrl', '$scope', '$firebaseArray', 'modal', '$firebaseObject', 'GobalService', '$filter', '$sessionStorage'];

    function addEditAdvertController(firebaseUrl, $scope, $firebaseArray, modal, $firebaseObject, GobalService, $filter, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/Advert");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.advert = GobalService.getObject();
            if ($scope.advert) {
                $scope.isEdit = true;
                $scope.advert.startDate = new Date($scope.advert.startDate);
                $scope.advert.endDate = new Date($scope.advert.endDate);
                $scope.advert.startTime = new Date($scope.advert.startTime).getHours() + ':' + new Date($scope.advert.startTime).getMinutes();
                $scope.advert.endTime = new Date($scope.advert.endTime).getHours() + ':' + new Date($scope.advert.endTime).getMinutes();
            }               

            $scope.categories = GobalService.getCategories();
        }

        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (advert) {

            $scope.formSubmitted = true;

            if ($scope.advertForm.$valid) {                

                var adverts = $firebaseArray(ref);
                var startDate = $filter('date')(advert.endDate, 'yyyy-MM-dd');
                var endDate = $filter('date')(advert.startDate, 'yyyy-MM-dd');
                
                var newRecord = {
                    category:  advert.category,
                    email: advert.email,
                    endDate: endDate.toString(),
                    endTime: new Date(advert.endTime).getHours() + ':' + new Date(advert.endTime).getMinutes(),
                    location: advert.location,
                    phone: advert.phone,
                    specialName: advert.specialName,
                    startDate: startDate.toString(),
                    startTime: new Date(advert.startTime).getHours() + ':' + new Date(advert.startTime).getMinutes(),
                    userId: $sessionStorage.user.$id,
                };
                adverts.$add(newRecord);
                modal.hide();
            }

        }

        $scope.Update = function (advert) {
            $scope.formSubmitted = true;

            if ($scope.advertForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Advert/" + advert.$id);
                var oldAdvert = $firebaseObject(editRef);

                var startDate = $filter('date')(advert.endDate, 'yyyy-MM-dd');
                var endDate = $filter('date')(advert.startDate, 'yyyy-MM-dd');

                oldAdvert.$id = advert.$id;
                oldAdvert.category =  advert.category,
                oldAdvert.email = advert.email,
                oldAdvert.endDate = endDate.toString(),
                oldAdvert.endTime = new Date(advert.endTime).getHours() + ':' + new Date(advert.endTime).getMinutes(),
                oldAdvert.location = advert.location,
                oldAdvert.phone = advert.phone,
                oldAdvert.specialName = advert.specialName,
                oldAdvert.startDate = startDate.toString(),
                oldAdvert.startTime = new Date(advert.startTime).getHours() + ':' + new Date(advert.startTime).getMinutes(),
                oldAdvert.userId = advert.userId,

                oldAdvert.$save();
                modal.hide();
            }
        }
       
    }
})();
