var button = $("button")

$("#log-in").on("click", function () {
    $("#landing-page").hide();
    $("#signup-page").hide();
    $("#projects-page").hide();
    $("#login-page").show();
    $(".main-section").hide();
    $(".section").hide();
});

$("#enter").on("click", function() {
    $("#landing-page").hide();
    $("#signup-page").hide();
    $("#login-page").hide();
    $("#projects-page").show();
    $(".main-section").hide();
    $(".section").hide();
});

$("#register").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#projects-page").hide();
    $("#signup-page").show();
    $(".main-section").hide();
    $(".section").hide();
});

$("#sign-up").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").show();
    $(".main-section").hide();
    $(".section").hide();
});

