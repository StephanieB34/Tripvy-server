var button = $("button");
let PROJECT_URL = "project";
let user = localStorage.getItem("currentUser");

function hideAllPages() {
  $("#landing-page").hide();
  $("#signup-page").hide();
  $("#projects-page").hide();
  $("#login-page").hide();
  $("#details-page").hide();
  $("#edit-page").hide();
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
$(".login-form").on("submit", function(e) {
  e.preventDefault();
  showProjectsPage();
});

$(".back-to-landing").on ("click", function (e) {
  e.preventDefault();
  hideAllPages();
  $("#landing-page").show();
})
/************************signup page********************** */
$(".signup-form").on("submit", function(e) {
  e.preventDefault();
  showProjectsPage();
});

$(".back-to-landing-page").on ("click", function (e) {
  e.preventDefault();
  hideAllPages();
  $("#landing-page").show();
})
/*******************projects page*************** */
$("#projects-page").on("click", ".details", function() {
  hideAllPages();
  $("#details-page").show();
});

$(".update").on("click", function() {
  hideAllPages();
  $("#edit-page").show();
});

$("#project").on("click", function() {
  hideAllPages();
  $("#edit-page").show();
});

$(".delete").on("click", function() {
  deleteProjects();
  hideAllPages();
  showProjectsPage();
});

/**********************details page****************/

$("#update").on("click", function() {
  hideAllPages();
  $("#edit-page").show();
});

$(".back").on("click", showProjectsPage);

/**************edit page************************/

$(".edit-form").on("submit", function(e) {
  e.preventDefault();
  let project = {
    projectName: $("#project-name").val(),
    budget: $("#budget").val(),
    materialsNeeded: $("#materials").val(),
    startDate: $("#start-date").val(),
    endDate: $("#end-date").val()
  };
  addProject(project);
});

$(".back-to-projects").on("click", function (e) {
  e.preventDefault();
  hideAllPages();
  showProjectsPage();
})
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
  console.log(projectArray);

  $("#project-results").empty();

  for (var i = 0; i < projectArray.length; i++) {
    let project = projectArray[i];
    $("#project-results").append(`
    <section class="project-section">
      <p>${project.projectName}</p>
      <ul>
        <li>Start Date:${project.startDate}</li>
        <li>Budget:${project.budget}</li>
        <li>Materials Needed:${project.materialsNeeded}</li>
        <li>End Date:${project.endDate}</li>
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

/****************************** do I need this get function by id ***************************/
// function updateProjectForm(id, project) {
//   let authToken = localStorage.getItem("authToken");
//   $.ajax({
//     method: "GET",
//     url: "/api/projects",
//     headers: {
//       contentType: "application/json",
//       Authorization: `Bearer ${authToken}`
//     },
//     contentType: "application/json",
//     success: function(projectData) {
//       console.log(projectData);
//     }
//   });
// }

// function updateProject(id, project) {
//   console.log(`Updating project ${id}`);
//   let authToken = localStorage.getItem("authToken");
//   $.ajax({
//     url: "/api/projects",
//     headers: {
//       contentType: "application/json",
//       Authorization: `Bearer ${authToken}`
//     },
//     method: "PUT",
//     dateType: "json",
//     contentType: "application/json",
//     data: JSON.stringify(project),
//     success: function(data) {
//       getProject(data);
//     },
//     error: function(err) {
//       console.log(err);
//     }
//   });
// }

function deleteProjects(id) {
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

// function handleProjectUpdate() {
//   $(".update").click(function(e) {
//     e.preventDefault();
//     let project = {
//       projectName: $("#project-name").val(),
//       budget: $("#budget").val(),
//       materialsNeeded: $("#materials-needed").val(),
//       startDate: $("#start-date").val(),
//       endDate: $("#end-date").val()
//     };
//     updateProject(project);
//   });
// }

function handleProjectDelete() {
  $(".delete").click(function(e) {
    let project = {
      projectName: $("#project-name").val(),
      budget: $("#budget").val(),
      materialsNeeded: $("#materials-needed").val(),
      startDate: $("#start-date").val(),
      endDate: $("#end-date").val()
      /*id: */
    };
    deleteProject(project);
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

$("#registerForm").submit(function(e) {
  e.preventDefault();
  let username = $("#signup-username").val();
  console.log("client-side username is:", username);
  let password = $("#signup-password").val();
  let retypePass = $("#retype-password").val();
  let user = { username, password };
  let settings = {
    url: "/users/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function(data) {
      console.log("successfully registered");
      $("#registerForm input[type='text']").val("");
    },
    error: function(err) {
      console.log(err);
      if (password.length < 10) {
        $("#errorTenChar").html("Password must be at least 10 characters");
      }
      if (password.length !== retypePass.length) {
        $("#errorMatchPass").html("Passwords must match");
      }
      if (password !== retypePass) {
        $("#errorMatchPass").html("Passwords must match");
      }
    }
  };
  $.ajax(settings);
});
