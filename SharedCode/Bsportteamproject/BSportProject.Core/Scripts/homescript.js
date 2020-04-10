
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

function warningaa(obj) {
    if (obj.value == "0") {
        $('#posplays').empty();
    }
    else if (obj.value == "-1") {
        alert('false');
    }
    else {
            $("#posplays").removeProp('disabled')
            var url = $("#Sportypes").attr('data-url');
            var data2send = JSON.stringify({ id: obj.value });
            $.ajax({
                type: "POST",
                url: url,
                data: data2send,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (arg) {
                    console.log(arg);
                    if (arg === null) {
                        $('#posplays').empty();
                    }
                    else {
                        for (i = 0; i < arg.length; i++) {
                            $("#posplays").append("<option value='" + arg[i].Id + "'>" + arg[i].PositionName + "</option>");
                        }                                         
                    }
                },
                error: function (xhr) {
                }
            });
        
    }
}

$(document).ready(function () {

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

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
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
    $('.btn-toggle').click(function () {
        $(this).find('.btn').toggleClass('active');

        if ($(this).find('.btn-primary').length > 0) {
            $(this).find('.btn').toggleClass('btn-primary');
        }
        if ($(this).find('.btn-danger').length > 0) {
            $(this).find('.btn').toggleClass('btn-danger');
        }
        if ($(this).find('.btn-success').length > 0) {
            $(this).find('.btn').toggleClass('btn-success');
        }
        if ($(this).find('.btn-info').length > 0) {
            $(this).find('.btn').toggleClass('btn-info');
        }

        $(this).find('.btn').toggleClass('btn-default');

        $(".open-button").on("click", function () {
            $(this).closest('.collapse-group').find('.collapse').collapse('show');
        });

        $(".close-button").on("click", function () {
            $(this).closest('.collapse-group').find('.collapse').collapse('hide');
        });
    });

    $(function () {
        $('#datetimepicker1').datetimepicker({
            viewMode: 'years',
            format: 'MM/DD/YYYY'
        });
    });

    $('#NewSportProfile').click(function () {

        var profileObject = {
            PosplayId: $("#posplays").find('option:selected'),
            SportId: $("#Sportypes").find('option:selected'),
            UserId: $("#UserID").val(),
            Experience: $("#yeaspf").val(),
            Description: $("message").val()
        };

        var url = $("#NewSportProfile").attr('data-url');
        var obj = { model: RegisterObject };
        var data2send = JSON.stringify(obj);

        $.ajax({
            type: "POST",
            url: url,
            data: data2send,
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
                    AppendNewSportProfile(arg);
                }
            },
            error: function (xhr) {

            }
        });
    });

    function AppendNewSportProfile(model) {
        $("#approval").append("<div class='info-user clearfix'> <div class='pull-left'>"+
            "<div class='panel panel-default'>"+
                "<div class='panel-heading' role='tab' id='headingOne'>"+
                    "<h4 class='panel-title'>"+
                        "<a role='button' data-toggle='collapse' href='#"+model.ProfileID+"' aria-expanded='true' aria-controls='"+model.ProfileID+"' class='trigger collapsed'>"+
                            "Collapsible Group Item #1"+
                        +"</a>"+
                    "</h4>"+
                "</div>"+
                "<div id='" + model.ProfileID + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='" + model.ProfileID + "'>" +
                    "<div class='panel-body'>"+
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi molestiae dolorum, soluta temporibus vero perferendis quo odit eaque cum fugiat nihil earum error vitae libero nostrum sed ipsam, beatae ea."+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>"+
        "<div class='pull-right'>"+
            "<button class='button white' data-toggle='modal' data-target='#confirm-delete-profile' data-id='" + model.ProfileID + "' data-url=''><span class='ico-close'></span>Edit</button>" +
            "<button class='button white' data-toggle='modal' data-target='#confirm-delete-profile' data-id='" + model.ProfileID + "' data-url=''><span class='ico-close'></span>Edit</button>" +
        "</div>"+
        "</div>");
    };

    $(".open-button").on("click", function () {
        $(this).closest('.collapse-group').find('.collapse').collapse('show');
    });

    $(".close-button").on("click", function () {
        $(this).closest('.collapse-group').find('.collapse').collapse('hide');
    });


    
})