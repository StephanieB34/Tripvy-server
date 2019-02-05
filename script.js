var button = $("button")

$("#log-in").on("click", function () {
    alert("hello");
    $("#landing-page").hide();
    $("#signup-page").hide();
    $("#projects-page").hide();
    $("#login-page").show();
});

$("#enter").on("click", function() {
    $("#landing-page").hide();
    $("#signup-page").hide();
    $("#login-page").hide();
    $("#projects-page").show();
});

$("#register").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#projects-page").hide();
    $("#signup-page").show();
});

$("#sign-up").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").show();
});

