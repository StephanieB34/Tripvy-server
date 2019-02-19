import { format } from "url";

var button = $("button");
let PROJECT_URL = "project";
let user = localStorage.getItem("currentUser");

function hideAllPages() {
  $("#landing-page").hide();
  $("#signup-page").hide();
  $("#projects-page").hide();
  $("#login-page").hide();
  $("#details-page").hide();
  $("#update-page").hide();
}

function showProjectsPage() {
  hideAllPages();
  getProjects();
  $("#projects-page").show();
}

/*********************landing page**************** */
$("#log-in").on("click", function() {
  hideAllPages();
  $("#login-page").show();
});

$("#register").on("click", function() {
  hideAllPages();
  $("#signup-page").show();
});

/***********************login page******************** */
$("#enter").on("click", showProjectsPage);

/************************signup page********************** */
$("#sign-up").on("click", showProjectsPage);

/*************delete later***************/
$(".login-form").on("submit", function(e) {
  e.preventDefault();
  showProjectsPage();
});

/*******************projects page*************** */
$("#details").on("click", function() {
  hideAllPages();
  $("#details-page").show();
});

$("#update").on("click", function() {
  hideAllPages();
  $("#update-page").show();
});

$("#project").on("click", function() {
  hideAllPages();
  $("#update-page").show();
});

/**********************details page****************/

$("#update").on("click", function() {
  hideAllPages();
  $("#update-page").show();
});

$("#back").on("click", showProjectsPage);

/**************update page************************/

$("#submit").on("click", showProjectsPage);

/********************** REST FUNCTIONS ****************/

function getProjects() {
  console.log("Getting project information");
  let authToken = localStorage.getItem("authToken");
  $.ajax({
    method: "GET",
    url: "/api/projects",
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    contentType: "application/json",
    success: function(userData) {
      showProjectResults(userData);
    },
    error: function(error) {
      console.log("error");
    }
  });
}

function showProjectResults(projectArray) {
  /**********should I show the results in an array to list them?******************** */
  console.log(projectArray);

  $("#project-results").empty();

  for (var i = 0; i < projectArray.length; i++) {
    let project = projectArray[i];
    $("#project-results").append(`
    <section class="project-section">
      <p>${project.projectName}</p>
      <ul>
        <li>Start Date:</li>
        <li>Budget:${project.budget}</li>
        <li>Materials Needed:</li>
        <li>End Date:</li>
      </ul>
      <button class="details">View Project Details</button>
      <button class="update">Update</button>
      <button class="delete">Delete</button>
    </section>
  `);
  }
}

function addProject(project) {
  console.log("Adding project", project);
  let authToken = localStorage.getItem("authToken");
  $.ajax({
    method: "POST",
    url: "/api/projects",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`
    },
    data: JSON.stringify(project),
    success: function(data) {
      console.log("PROJECT CREATED");
      showProjectsPage();
    },
    error: function(err) {
      console.log(err);
    },
    dataType: "json"
  });
}

///////////

function updateProjectForm(id, project) {
  let authToken = localStorage.getItem("authToken");
  $.ajax({
    method: "GET",
    url: "/api/projects",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`
    },
    contentType: "application/json",
    success: function(projectData) {
      console.log(projectData);

      /*********projectArray updated? */
    }
  });
}

function updateProject(id, project) {
  console.log(`Updating project ${id}`);
  let authToken = localStorage.getItem("authToken");
  $.ajax({
    url: "/api/projects",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`
    },
    method: "PUT",
    dateType: "json",
    contentType: "application/json",
    data: JSON.stringify(project),
    success: function(data) {
      getProject(data);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function deleteProject(id) {
  console.log(`Deleting project ${id}`);
  let authToken = localStorage.getItem("authToken");
  $.ajax({
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`
    },
    method: "DELETE",
    success: function(data) {
      getProject(data);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function handleProjectDelete() {
  $(".update-button").click(function(e) {
    // call deleteProject()
  });
}

function loginForm() {
  e.preventDefault();
  let username = $("#login-username").val();
  let password = $("#login-password").val();
  let userInfo = { username, password };
  let settings = {
    url: "/auth/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(userInfo),
    success: function(data) {
      console.log("successfully logged in");
      localStorage.setItem("authToken", data.authToken);
      localStorage.setItem("currentUser", username);
      user = username;
      console.log(data);
      getProjects(data);
    },
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
}

// function registerForm () {
//   e.preventDefault();
//   let username = $("#singnup-username").val();
//   console.log('client-side username is:', username);
//   let password = $("#POST-password").val();
//   let retypePass = $("#retype-password").val();
//   let user = {username, password};
//   let settings = {
//     url:"/users/",
//     type: 'POST',
//     contentType: 'application/json',
//     data: JSON.stringify(user),
//     success: function(data) {
//       console.log('successfully registered');
//       $("#registerForm input[type='text']").val('');

// 			error: function(err) {
// 				console.log(err);
// 				if (password.length < 10) {
// 					$("#errorTenChar").html("Password must be at least 10 characters")
// 				}
// 				if (password.length !== retypePass.length) {
// 					$("#errorMatchPass").html("Passwords must match")
// 				}
// 				if (password !== retypePass) {
// 					$("#errorMatchPass").html("Passwords must match")
// 				}
// 			}
// 		};
// 		$.ajax(settings);
//   }

/////// ORGANIZE LATER

// handle project add
$(".update-form").on("submit", function(e) {
  e.preventDefault();
  let project = {
    projectName: $("#project-name").val()
    // "budget":
    // "materialsNeeded":
    // "startDate":
    // "endDate":
  };
  addProject(project);
});

function handleProjectUpdate() {
  $(".update-button").click(function(e) {
    // get information from the format.
    // let project = {...}
    // updateProject(project);
  });
}
