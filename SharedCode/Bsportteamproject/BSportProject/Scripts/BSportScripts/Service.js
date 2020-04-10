app.service("bSportService", function ($http) {

    // Register new Account
    this.RegisterNewAccount = function (account) {
        var response = $http({
            method: "post",
            url: "Account/JsonRegister",
            data: { Account: account },
            dataType:"json"
        });
        return response;
    }

    this.AccountLogin = function(account) {
        var response = $http({
            method: "post",
            url: "Account/JsonLogin",
            data: { Account: account },
            dataType: "json"
        });
        return response;
    }

    // NOW UPLOAD THE FILES.
    this.uploadFiles = function (filearray,account) {
        
        var request = {
            method: 'POST',
            url: '/Account/Upload/',
            data: data,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                alert(d);
            })
            .error(function () {
            });
    }

    this.updateAccount = function (account) {
        var response = $http({
            method: "post",
            url: "./Update",
            data: JSON.stringify(account),
            dataType: "json"
        });
        return response;
    }

    this.getAccountInfor = function (email) {
        var reponse = $http({
            method: 'get',
            url: './GetUser',
            params: {
                email: email
            }
        });
        return reponse;
    }
});