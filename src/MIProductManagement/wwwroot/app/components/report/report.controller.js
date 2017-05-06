(function () {
    'use strict';

    angular.module('MIPM').controller('reportController', reportController);
    reportController.$inject = ['firebaseUrl', '$firebaseArray', '$sessionStorage'];

    function reportController(firebaseUrl, $firebaseArray, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.heading = "Report";
        vm.icon = "timelapse";
        vm.data = [];
        vm.filteredResults = [];
        vm.showResults = false;
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();
        function init() {
            vm.userType = $sessionStorage.user.userTypeId;
            vm.datas = $firebaseArray(ref.child('UserActivity'));
            vm.datas.$loaded(function (firstdata) {
                if (firstdata.length > 0) {
                    vm.users = $firebaseArray(ref.child('User'));
                    vm.users.$loaded(function (secondData) {
                        for (var i = 0; i < firstdata.length; i++) {
                            for (var j = 0; j < secondData.length; j++) {
                                var re = firstdata[i];
                                var sd = secondData[j];                                
                                if (re.userId == sd.id) {
                                    re.user = sd.displayName;
                                    if (vm.userType == 3) {
                                        if (re.activityType == 'Like Advert') {
                                            vm.data.push(re);
                                        }
                                    } else {
                                        vm.data.push(re);
                                    }
                                    
                                }
                            }
                        }
                    });
                }                
            });
           
        }

        vm.filter = function (filter) {
            vm.showResults = true;
            var list = angular.copy(vm.data);
            var results = [];
            if (filter.reportType) {
                for (var i = 0; i < list.length; i++) {
                    if (filter.reportType.toLowerCase() == list[i].activityType.toLowerCase()) {
                        results.push(list[i]);
                    }
                }
            }
            if (filter.fromDate && filter.toDate) {
                for (var i = 0; i < list.length; i++) {
                    var createdDate = new Date(list[i].date);
                    if (filter.fromDate <= createdDate && filter.toDate >= createdDate) {
                        var addItem = true;
                        for (var j = 0; j < results.length; j++) {
                            if (list[i] == results[j]) {
                                addItem = false;
                                break;
                            }
                        }
                        if (addItem) {
                            results.push(list[i]);
                        }
                    }
                }
            }
            vm.filteredResults = results;
        }
       
    }
})();
