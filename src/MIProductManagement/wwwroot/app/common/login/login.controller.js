(function () {
    'use strict';

    function LoginController($location, $scope, $firebaseObject, $firebaseArray, $sessionStorage, $rootScope, LoginService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexController';
        var ref = new Firebase("https://vert-7c966.firebaseio.com/");
        vm.login = {};
       
        $rootScope.profileImage = 'assets/img/placeholder.png';

        $scope.login = function (user) {
            vm.users = $firebaseArray(ref.child('User'));
            vm.users.$loaded(function (data) {
                vm.message = "";
                $sessionStorage.isUserAuthenticated = false;
                for (var i = 0; i < data.length; i++) {
                    var _user = data[i];
                    if (_user.username.toLowerCase() == user.username.toLowerCase() && _user.password == user.password) {
                        if (_user.userTypeId == 1) {
                            $sessionStorage.isUserAuthenticated = true;
                            $sessionStorage.displayName = 'Administrator';
                            $sessionStorage.user = _user;
                            $location.path('/dashboard');
                            break;
                        }
                        else if (_user.userTypeId == 3)
                        {                            
                            $sessionStorage.isUserAuthenticated = true;
                            $sessionStorage.displayName = _user.businessName;
                            $sessionStorage.user = _user;
                            $location.path('/dashboard');
                            break;
                        }
                       
                    }
                }
                if ($sessionStorage.isUserAuthenticated == false) {
                    vm.message = "Invalid usernamme or password";
                }
            
            });
    }
        

    }

    angular.module('MIPM').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', '$scope', '$firebaseObject', '$firebaseArray', '$sessionStorage', '$rootScope', 'LoginService'];
})();
