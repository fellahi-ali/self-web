$(document).ready(
    function () {
        getPublicRepos();
    }
);
/**
 * Get the authenticated user and call Github's API to get the
 * public repos.
 */
function getPublicRepos() {
    $("#repos").find("tbody").html('');
    $("#loadingPersonalRepos").show();
    $.get(
        "/api/users/self",
        function(user) {
            if(user.provider == 'github') {
                $.get(
                    "https://api.github.com/users/" + user.login + "/repos?per_page=100",
                    function (repos) {
                        repos.forEach(
                            function (repo) {
                                $("#repos").find("tbody").append(
                                    "<tr><td><a href='/github/" + repo.full_name + "'>" +
                                        repo.full_name +
                                    "</a></td></tr>"
                                );
                            }
                        )
                        $("#loadingPersonalRepos").hide();
                        $('#repos').dataTable();
                    }
                )
            } else if(user.provider == 'gitlab') {
                $.get(
                    "https://gitlab.com/api/v4/users/" + user.login + "/projects",
                    function (repos) {
                        console.log(repos)
                        repos.forEach(
                            function (repo) {
                                console.log(repo);
                                console.log(repo.path_with_namespace);
                                $("#repos").find("tbody").append(
                                    "<tr><td>" + repo.path_with_namespace + "</td></tr>"
                                );
                            }
                        )
                        $("#loadingPersonalRepos").hide();
                        $('#repos').dataTable();
                    }
                )
            }
        }
    );
}
