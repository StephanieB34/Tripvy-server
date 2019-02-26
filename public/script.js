var button = $("button");
let PROJECT_URL = "project";
let user = localStorage.getItem("currentUser");
let state = {
  projects: []
};

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
  let userInfo = {
    username: $("#login-username").val(),
    password: $("#login-password").val()
  };
  login(userInfo);
});

$(".back-to-landing").on("click", function(e) {
  e.preventDefault();
  hideAllPages();
  $("#landing-page").show();
});
/************************signup page********************** */
$(".signup-form").on("submit", function(e) {
  e.preventDefault();
  let user = {
    firstName: $("#first-name").val(),
    lastName: $("#last-name").val(),
    username: $("#signup-username").val(),
    password: $("#password").val(),
    retype: $("#retype-signup-password").val()
  };
  register(user);
});

$(".back-to-landing-page").on("click", function(e) {
  e.preventDefault();
  hideAllPages();
  $("#landing-page").show();
});
/*******************projects page*************** */
$("#projects-page").on("click", ".details", function() {
  hideAllPages();

  let index = $(this)
    .parent(".project-section")
    .attr("data-index");
  let project = state.projects[index];

  $("#details-start-date").text("Start Date " + project.startDate);
  $("#details-project-title").text(project.projectName);
  // TODO: ALL other fields
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

$("#log-out").on("click", function() {
  hideAllPages();
  $("#landing-page").show();
});

$("#projects-page").on("click", ".delete", function() {
  let id = $(this)
    .parent(".project-section")
    .attr("data-id");
  deleteProject(id);
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

$(".back-to-projects").on("click", function(e) {
  e.preventDefault();
  hideAllPages();
  showProjectsPage();
});
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
    success: function(projects) {
      state.projects = projects;
      showProjectResults(projects);
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
    <section class="project-section" data-index="${i}" data-id="${project.id}">
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

function deleteProject(id) {
  console.log(`Deleting project ${id}`);
  let authToken = localStorage.getItem("authToken");
  $.ajax({
    url: `/api/projects/${id}`,
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`
    },
    method: "DELETE",
    success: function(data) {
      getProjects();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

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

function register(user) {
  let settings = {
    url: "api/users/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function(data) {
      console.log("successfully registered", data);
      showProjectsPage();
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
}

function login(userInfo) {
  console.log(userInfo);
  let settings = {
    url: "/api/auth/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(userInfo),
    success: function(data) {
      console.log("successfully logged in");
      // localStorage.setItem("authToken", data.authToken);
      // localStorage.setItem("currentUser", username);
      console.log(data);
      // getProjects(data);
      showProjectsPage();
    },
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
}
