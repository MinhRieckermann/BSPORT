app.controller("AccountCtrl", function ($scope, bSportService) {

    $scope.Email = "";
    $scope.Password = "";
    $scope.ConfirmPassword = "";
    $scope.REmail = "";
    $scope.RPassword = "";
    $scope.NotifyMessage = "";
    $scope.loading = false;

    $scope.userInformation = {
            id: '',
            FirstName: '',
            LastName: '',
            Address: '',
            BirthDay: '',
            Email : '',
            Mobile: '',
            Address: '',
            Image: '',
            Desc: ''
    }



    function checkInput() {
        var isCheck = true;
        var password = document.getElementById("password");
        var confirmpassword = document.getElementById("confirm_password");

        if ($scope.REmail == null || $scope.RPassword == null || $('#confirm_password').val() == null) {
            isCheck = false;
        }
        if ($scope.RPassword.length < 3 || $scope.RPassword.length > 20) {
            isCheck = false;
        }

        if (password.value !== confirmpassword.value) {
            isCheck = false;
        }
        return isCheck;
    }

    $scope.Register = function () {

        
        var password = document.getElementById("password");
        var confirm_password = document.getElementById("confirm_password");

        function validatePassword() {
            if (password.value !== confirm_password.value) {
                confirm_password.setCustomValidity("Passwords Don't Match");
            } else {
                confirm_password.setCustomValidity('');
            }
        }

        password.onchange = validatePassword;
        confirm_password.onkeyup = validatePassword;
        var isValidate = checkInput();

        if (isValidate === true) {
            var authPassword = md5($scope.RPassword);
            $scope.Account = {
                AccountName: "",
                Address: "",
                BirthDay: "",
                ImageId: "",
                PosPlay: "",
                Email: $scope.REmail,
                Password: authPassword,
                ConfirmPassword: "",
                CreateTime: "",
                CreateBy: "",
                UpdateTime: "",
                UpdateBy: "",
                isUpdate:"",
            };

            var jsonRegister = bSportService.RegisterNewAccount($scope.Account);
            jsonRegister.then(function (res) {
                if (res.status === 200) {
                    if (res.data === "True") {
                        localStorage.setItem("Email", $scope.Account.Email);
                        localStorage.setItem("isUpdate","false")
                        window.location.href = '/Home/Profile';

                    } else {
                        $scope.NotifyMessage = "Email register has exist.";
                        $("#myModal").modal();
                    }
                }
            }, function () {            
            });
        }     
    };
    
    $scope.Login = function () {
        var authPassword = md5($scope.Password);
        $scope.Account = {
            AccountName: "",
            Address: "",
            BirthDay: "",
            ImageId: "",
            PosPlay: "",
            Email: $scope.Email,
            Password: authPassword,
            ConfirmPassword: "",
            CreateTime: Date.now(),
            CreateBy: "",
            UpdateTime: "",
            UpdateBy: ""
        };
        if ($scope.Email === "" || $scope.Password === "") {
            return;
        } else {
            var jsonLogin = bSportService.AccountLogin($scope.Account);
            $scope.loading = true;
            $("#myModal").modal();
            jsonLogin.then(function (response) {
                if (response.status === 200 || response.data.Email !== '' || response.data.Email === null) {
                    localStorage.setItem("isUpdate", response.data.isUpdate)
                    localStorage.setItem("Email", response.data.Email)
                    
                }
            }, function () {
                $scope.NotifyMessage = "Login Fail!!!!";
                $("#myModal").modal();
            }).finally(function () {
                $scope.loading = false;
                console.log('End Request');
                window.location.href = '/Home/Profile';
            });
        }
    };
});