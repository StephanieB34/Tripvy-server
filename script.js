var button = $("button");

/*********************landing page**************** */
$("#log-in").on("click", function() {
  $("#landing-page").hide();
  $("#signup-page").hide();
  $("#projects-page").hide();
  $("#login-page").show();
  $("#details-page").hide();
  $("#update-page").hide();
});

$("#register").on("click", function() {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#projects-page").hide();
    $("#signup-page").show();
    $("#details-page").hide();
    $("#update-page").hide();
  });

  /***********************login page******************** */
$("#enter").on("click", function() {
  $("#landing-page").hide();
  $("#signup-page").hide();
  $("#login-page").hide();
  $("#projects-page").show();
  $("#details-page").hide();
  $("#update-page").hide();
});

/************************signup page********************** */

$("#sign-up").on("click", function() {
  $("#landing-page").hide();
  $("#login-page").hide();
  $("#signup-page").hide();
  $("#projects-page").show();
  $("#details-page").hide();
  $("#upate-page").hide();
});

/*************delete later***************/

$(".login-form").on("submit", function(e) {
  e.preventDefault();
  $("#landing-page").hide();
  $("#login-page").hide();
  $("#signup-page").hide();
  $("#projects-page").show();
  $("#update-page").hide();
  $("#details-page").hide();
});

/*******************projects page*************** */

$("#details").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").hide();
    $("#details-page").show();
    $("#update-page").hide();

});

$("#update").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").hide();
    $("#details-page").hide();
    $("#update-page").show();
});

$("#project").on("click", function() {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").hide();
    $("#details-page").hide();
    $("#update-page").show();
})

/**********************details page****************/

$("#update").on("click", function() {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").hide();
    $("#details-page").hide();
    $("#update-page").show();
});

$("#back").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").show();
    $("#details-page").hide();
    $("#update-page").hide();
});

/**************update page************************/

$("#submit").on("click", function () {
    $("#landing-page").hide();
    $("#login-page").hide();
    $("#signup-page").hide();
    $("#projects-page").show();
    $("#details-page").hide();
    $("#update-page").hide()
});
