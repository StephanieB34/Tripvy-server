var button = $("button");
let PROJECT_URL = 'project';
let user = localStorage.getItem('currentUser');


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

function getProject() {
	console.log('Getting project information')
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		method: 'GET',
		url: '/api/projects',
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		contentType: 'application/json',
		success: function(userData) {
			console.log(userData);
			showProjectResults(userData);
        }
	});
}

function showProjectResults (projectArray) {
/**********should I show the results in an array to list them?******************** */
}


function addProject(project) {
	console.log('Adding project' + project);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		method: 'POST',
        url: '/api/projects',
		headers: {
            contentType: 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		data: JSON.stringify(project),
		success: function(data) {
			getProject(data);
		},
		error: function(err) {
			console.log(err);
		},
		dataType: 'json',
		
	});
}

function updateProjectForm(id, project) {
    let authToken = localStorage.getItem('authToken');
    $.ajax({
        method: 'GET',
        url:'/api/projects',
        headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        contentType: 'application/json',
        success: function (projectData) {
            console.log(projectData)

            /*********projectArray updated? */
        }
    })
}

function updateProject(id, project) {
	console.log(`Updating project ${id}`);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		url: '/api/projects',
		headers: {
            contentType: 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		method: 'PUT',
		dateType: 'json',
		contentType: 'application/json',
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
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		headers: {
            contentType: 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		method: 'DELETE',
		success: function(data) {
			getProject(data);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function handleProjectAdd () {
    $('#details-page').submit (function (e) {
        e.preventDefault();
        addProject({
            user: user,

        })
    })
}

function handleProjectUpdate () {
    $('#update-page').submit (function (e) {
        e.preventDefault();
        updateProject({

        })
    })
}

function handleProjectDelete () {

}


function loginForm () {
    e.preventDefault();
		let username = $("#GET-username").val();
		let password = $("#GET-password").val();
		let userInfo = {username, password};
		let settings = {
			url:"/auth/login",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(userInfo),
			success: function(data) {
				console.log('successfully logged in');
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

function registerForm () {
    e.preventDefault();
		let username = $("#POST-username").val();
		console.log('client-side username is:', username);
		let password = $("#POST-password").val();
		let retypePass = $("#retype-password").val();
		let user = {username, password};
		let settings = {
			url:"/users/",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(user),
			success: function(data) {
				console.log('successfully registered');
				$("#registerForm input[type='text']").val('');
				
			error: function(err) {
				console.log(err);
				if (password.length < 10) {
					$("#errorTenChar").html("Password must be at least 10 characters")
				}
				if (password.length !== retypePass.length) {
					$("#errorMatchPass").html("Passwords must match")
				}
				if (password !== retypePass) {
					$("#errorMatchPass").html("Passwords must match")
				}
			}
		};
		$.ajax(settings);
    }