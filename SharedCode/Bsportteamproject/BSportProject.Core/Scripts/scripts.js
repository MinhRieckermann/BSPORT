
function OnSuccess(result) {
    $('#infoModal').modal('hide');
    $.notify({
        // options
        icon: 'pe-7s-airplay',
        message: 'Edit Information Success',
        target: '_blank'
    }, {
        // settings
        element: 'body',
        position: null,
        type: "info",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 80,
        spacing: 10,
        z_index: 1031,
        delay: 3000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}


$(document).ready(function () {
    var RegisterObject = {
        Fullname: $('#Fullname').val(),
        Email: $('#REmail').val(),
        Password: $('#RPassword').val(),
        ConfirmPassword: $('#PasswordError').val()
    };

    var Loginobject = {
        Email: $('#Email').val(),
        Password: $('#Password').val(),
        RememberMe: '',
    }

    function ValidateValuebeforeChangepassword() {
        var index = 0;
        //Check Value of Old Password
        if ($('#oldpassword').val() === '') {
            $('.form-password-oldpassword').addClass('has-error');
            $('#oldpasswordError').text('Old Password Required');
        }
        else {
            $('.form-password-oldpassword').removeClass('has-error');
            $('#oldpasswordError').text('');
            index++;
        }

        //Check Value of New Password
        if ($('#password').val() === '') {
            $('.form-password-newpassword').addClass('has-error');
            $('#newpassError').text('Password Required');
        }
        else {
            $('.form-password-newpassword').removeClass('has-error');
            $('#newpassError').text('');
            index++;
        }

        //Check Value of confirm New Password
        if ($('#password2').val() === '') {
            $('.form-password-confirmpw').addClass('has-error');
            $('#password2Error').text('Password Required');
        }

        //Check matching between newpassword and confirm newpassword
        if ($('#password').val() !== $('#password2').val()) {

            if (!$('.form-password-confirmpw').hasClass('has-error')) {
                $('.form-password-confirmpw').addClass('has-error');
            }
            if (!$('.form-password-newpassword').hasClass('has-error')) {
                $('.form-password-newpassword').addClass('has-error');
            }
            $('#password2Error').text('The passwords do not match');
        }
        else if ($('#password').val() === $('#password2').val() && $('#password').val() !== '') {
            if ($('.form-password-confirmpw').hasClass('has-error')) {
                $('.form-password-confirmpw').removeClass('has-error');
            }
            $('#password2Error').text('');
            index++
        }
        return index === 3 ? true : false;
    }
    function ValidateValueBeforeLogin() {

        Loginobject = {
            Email: $('#Email').val(),
            Password: $('#Password').val(),
            RememberMe: '',
        }
        if (Loginobject.Email === '' || Loginobject.Password === '' || !isValidEmailAddress(Loginobject.Email)) {
            if (Loginobject.Email === '' && Loginobject.Password !== '') {
                $('.form-email-login').addClass('has-error');
                $('#EmailError').text('Email Required');

                $(".form-password-login").removeClass('has-error');
                $("#PasswordError").text('');
            }

            if (Loginobject.Password === '') {
                $('.form-password-login').addClass('has-error');
                $('#PasswordError').text('Password Required');
            }
            else if (Loginobject.Email !== '' && !isValidEmailAddress(Loginobject.Email)) {

            }
            $(".form-email-login").addClass('has-error');
            $("#EmailError").text('Email is not correct format');
            //check Password

            return false;
        }
        else if (!isValidEmailAddress(Loginobject.Email)) {
            $(".form-password-login").removeClass('has-error');
            $("#PasswordError").text('');
            return false;
        }
        else {
            $('.form-email-login').removeClass('has-error');
            $(".form-password-login").removeClass('has-error');

            $('#EmailError').text('');
            $("PasswordError").text('');
            return true;
        }
    }
    function ValidateValueBeforeRegister() {
        var flag = true;
        var count = 0;
        RegisterObject = {
            Fullname: $('#Fullname').val(),
            Email: $('#REmail').val(),
            Password: $('#RPassword').val(),
            ConfirmPassword: $('#RConfirmpassword').val()
        };

        if (RegisterObject.Fullname === '') {
            $('.form-fullname-register').addClass('has-error');
            $('#FullnameError').text('Full Name Required');
        }
        else {
            $('.form-fullname-register').removeClass('has-error');
            $('#FullnameError').text('');
            count++;
        }

        if (RegisterObject.Email === '') {
            $('.form-email-register').addClass('has-error');
            $('#REmailError').text('Email Required');
        }
        else {
            if (!isValidEmailAddress(RegisterObject.Email)) {
                $('#REmailError').text('Email is not correct format');
            }
            else {
                $('.form-email-register').removeClass('has-error');
                $('#REmailError').text('');
                count++;
            }
        }

        if (RegisterObject.Password === '') {
            $('.form-password-register').addClass('has-error');
            $('#RPasswordError').text('Password Required');
        }
        else {
            $('.form-password-register').removeClass('has-error');
            $('#RPasswordError').text('');
            count++;
        }

        if (RegisterObject.ConfirmPassword === '') {
            $('.confirmPassword').addClass('has-error');
            $('#ConfirmPasswordError1').text('Password Required');
        }

        if (RegisterObject.Password !== RegisterObject.ConfirmPassword) {
            if (!$('.confirmPassword').hasClass('has-error')) {
                $('.confirmPassword').addClass('has-error');
            }
            if (!$('.form-password-register').hasClass('has-error')) {
                $('.form-password-register').addClass('has-error');
            }
            $('#ConfirmPasswordError1').text('The passwords do not match');
        }
        else if (RegisterObject.Password === RegisterObject.ConfirmPassword && RegisterObject.Password !== '') {
            if ($('.confirmPassword').hasClass('has-error')) {
                $('.confirmPassword').removeClass('has-error');
            }
            $('#ConfirmPasswordError1').text('');
            count++;
        }
        return count === 4 ? true : false;
    }

    $("#changepassword").click(function () {
        if (ValidateValuebeforeChangepassword()) {
            var url = $("#changepassword").attr('data-url');

            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify({ oldpassword: $('#oldpassword').val(), password: $('#password2').val() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (arg) {
                    if (arg.Status !== '200') {
                        var message = "Change Password Fail";
                        var type = "danger";
                        showAlertInfo(message, type)
                    }
                    else {
                        var message = "Change Password Success";
                        var type = "success";
                        showAlertInfo(message, type);
                        $('#oldpassword').val('');
                        $('#password').val('');
                        $('#password2').val('');
                    }
                },
                error: function (xhr) {

                }
            });
        }
    });
    //var obj = { customer: complexObject };
    //var data2send = JSON.stringify(obj);

    $("#logout").click(function () {
        var url = $("#logout").attr('data-url');
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (arg) {
                if (arg.Status !== '0') {
                    console.log("Log out Success");
                    window.location.href = arg.Message;
                }
                else {
                    console.log("Log out false");
                }
            },
            error: function (xhr) {

            }
        });
    });

    function showAlertInfo(message, type) {
        $.notify({
            // options
            icon: 'fa fa-check',
            message: message,
            target: '_blank'
        }, {
            // settings
            element: 'body',
            position: null,
            type: type,
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 80,
            spacing: 10,
            z_index: 1031,
            delay: 3000,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

    $("#login").click(function () {
        if (ValidateValueBeforeLogin()) {

            Loginobject = {
                Email: $('#Email').val(),
                Password: $('#Password').val(),
                RememberMe: '',
            }
            var url = $("#login").attr('data-url');
            var obj = { model: Loginobject };
            var data2send = JSON.stringify(obj);

            console.log('Send request Ajax to login');
            $.ajax({
                type: "POST",
                url: url,
                data: data2send,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (arg) {
                    if (arg.Status !== '0') {
                        $("#PasswordError").text(arg.Message);
                    }
                    else {
                        window.location.href = arg.Message;
                    }
                },
                error: function (xhr) {

                }
            });
        }
        else {
            console.log('cant not send')
        }

    });

    
    $("#imgCoverInp").click(function () {
        $('#coverModal').modal('show');
    });
    

    $("#register").click(function () {   
        RegisterObject = {
            Email: $('#REmail').val(),
            Password: $('#RPassword').val(),
            Fullname: $('#Fullname').val(),
            GenderId: $("input[name='options']:checked").val()
        }
        
        var url = $("#register").attr('data-url');

        var obj = { model: RegisterObject };
        var data2send = JSON.stringify(obj);

        if (ValidateValueBeforeRegister() === true) {
            console.log('Send request Ajax to login');
            $.ajax({
                type: "POST",
                url: url,
                data: data2send,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (arg) {
                    if (arg.Status !== '200') {
                        $('#ConfirmPasswordError2').text(arg.Message);
                    }
                    else {
                        window.location.href = arg.Message;
                    }
                },
                error: function (xhr) {

                }
            });
        }
    });

    $("#Password").keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            SendLoginAjax();
        }
    });

    $("#Email").keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            SendLoginAjax();
        }
    });

    function SendLoginAjax() {
        if (ValidateValueBeforeLogin()) {

            Loginobject = {
                Email: $('#Email').val(),
                Password: $('#Password').val(),
                RememberMe: '',
            }
            var url = $("#login").attr('data-url');
            var obj = { model: Loginobject };
            var data2send = JSON.stringify(obj);

            console.log('Send request Ajax to login');
            $.ajax({
                type: "POST",
                url: url,
                data: data2send,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (arg) {
                    if (arg.Status !== '0') {
                        $("#PasswordError").text(arg.Message);
                    }
                    else {
                        window.location.href = arg.Message;
                    }
                },
                error: function (xhr) {

                }
            });
        }
    }
    
    $(document).on('change', '.btn-file :file', function () {
        var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });


    $(document).on('change', '.btn-file-cover :file', function () {
        var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file-cover :file').on('fileselect', function (event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }
    });

    $("#imgCover").change(function () {
        readCoverURL(this);
    });

    function readCoverURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img-cover-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $('.btn-file :file').on('fileselect', function (event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        $('.saveAvatar').show();
        $('.btn-uploadcover').hide();
        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });

    $("#imgInp").change(function () {
        readURL(this);
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function ChangeAvata(data) {
        $.notify({
            // options
            icon: 'fa fa-check',
            message: 'example',
            target: '_blank'
        }, {
            // settings
            element: 'body',
            position: null,
            type: 'success',
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 80,
            spacing: 10,
            z_index: 1031,
            delay: 3000,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }
    
    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    $("#form0").submit(function (event) {
        var file;
        event.preventDefault();
        var action = $("#form0").attr("action");
        if ($("#form0").attr("enctype") === "multipart/form-data") {
            //this only works in some browsers.
            //purpose? to submit files over ajax. because screw iframes.
            //also, we need to call .get(0) on the jQuery element to turn it into a regular DOM element so that FormData can use it.
            file = new FormData($("#form0").get(0));
            contentType = false;
            processData = false;
        } else {
            // regular form, do your own thing if you need it
        }
        $.ajax({
            type: "POST",
            url: action,
            data: file,
            dataType: "json", //change to your own, else read my note above on enabling the JsonValueProviderFactory in MVC
            contentType: contentType,
            processData: processData,
            success: function (data) {
                $('.saveAvatar').hide();
                $('.btn-uploadcover').show();
                if (data.Status==='200') {
                    showAlertInfo('Update Avatar Success', 'success');
                } else {
                    showAlertInfo('Error when change Avatar', 'danger')
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('.saveAvatar').hide();
                $('.btn-uploadcover').show();
                showAlertInfo('Error when change Avatar', 'danger');
                console.log("upload image fail");
            }
        });
    }); //end .submit()

})


