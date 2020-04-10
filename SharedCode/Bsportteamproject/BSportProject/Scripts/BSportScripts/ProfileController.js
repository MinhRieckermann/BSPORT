app.controller("ProfileCtrl", function ($scope, bSportService, $http) {
    $scope.dailyActivities = "";
    $scope.editProfile = "";
    $scope.viewProfile = "";

    $scope.userInformation = {
        id: '',
        FirstName: '',
        LastName: '',
        Address: '',
        BirthDay: '',
        Email: '',
        Mobile: '',
        Address: '',
        Image: '',
        Desc: ''
    }


    $scope.updateInformation = function () {
        var datestrInNewFormat = new Date($('#txtBirthDay').val());
        $scope.userInformation.BirthDay = datestrInNewFormat;
        var jsonUpdate = bSportService.updateAccount($scope.userInformation);
        jsonUpdate.then(function (res) {
            if (res.status === 200) {
                if (res.data === "True") {
                }
            }
        })
    }

  
    $(document).on('click', '#close-preview', function () {
        $('.image-preview').popover('hide');
        // Hover befor close the preview
        $('.image-preview').hover(
            function () {
                $('.image-preview').popover('show');
            },
             function () {
                 $('.image-preview').popover('hide');
             }
        );
    });

    $scope.getcurrentAccount = function () {

        //if (typeof (localStorage.Email) !== 'undefined') {
        //    var json = bSportService.getAccountInfor(localStorage.Email);
        //    json.then(function (response) {
        //        if (response.status === 200 || response.data.Email !== '' || response.data.Email === null) {
        //            console.log(response.data);
        //            $scope.userInformation.Address = response.data.Address;
        //            $scope.userInformation.FirstName = response.data.FirstName;
        //            $scope.userInformation.LastName = response.data.LastName;
        //            $scope.userInformation.Mobile = response.data.Mobile;
        //            $scope.userInformation.Desc = response.data.Desc;
        //        }
        //    });


        //    if (localStorage.isUpdate === "true") {
        //        $scope.dailyActivities = "active";
        //        $scope.editProfile = "";

        //    } else {
        //        $scope.dailyActivities = "";
        //        $scope.editProfile = "active";
        //    }

        //    $scope.userInformation.Email = localStorage.Email;
        //    $scope.userInformation.Mobile = localStorage.Email;
        //}
        //else {
        //    window.location.href = '/';
        //}

    }

    $scope.logout = function () {
        localStorage.clear();
        window.location.href = '/';
    }

    $scope.switchpanel = function (panel) {
        if (panel == 1) {
            $scope.fullpanel = "col-lg-8";
            $scope.standarpanel = "col-lg-4";
        } else if (panel == 2) {
            $scope.fullpanel = "col-lg-12";
            $scope.standarpanel = "col-lg-4";
        }
        else {
            $scope.fullpanel = "col-lg-12";
            $scope.standarpanel = "col-lg-4";
        }
    }



    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

    $scope.submitEdit = function () {
        var data = new FormData();
        var files = $("#fileUpload").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
    }

    $(document).ready(function () {
        // Create the close button
        var closebtn = $('<button/>', {
            type: "button",
            text: 'x',
            id: 'close-preview',
            style: 'font-size: initial;',
        });
        closebtn.attr("class", "close pull-right");
        // Set the popover default content
        $('.image-preview').popover({
            trigger: 'manual',
            html: true,
            title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
            content: "There's no image",
            placement: 'bottom'
        });
        // Clear event
        $('.image-preview-clear').click(function () {
            $('.image-preview').attr("data-content", "").popover('hide');
            $('.image-preview-filename').val("");
            $('.image-preview-clear').hide();
            $('.image-preview-input input:file').val("");
            $(".image-preview-input-title").text("Browse");
        });
        // Create the preview image
        $(".image-preview-input input:file").change(function () {
            var img = $('<img/>', {
                id: 'dynamic',
                width: 250,
                height: 200
            });
            var file = this.files[0];
            var reader = new FileReader();
            // Set preview image into the popover data-content
            reader.onload = function (e) {
                $(".image-preview-input-title").text("Change");
                $(".image-preview-clear").show();
                $(".image-preview-filename").val(file.name);
                img.attr('src', e.target.result);
                $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
            }
            reader.readAsDataURL(file);
        });
    });
});