refreshPosts();
setInterval(refreshPosts, 5000);
function sendComment() {
    //Check if a message was provided, check if a name was provided.
    //If no comment, exit, if no name, set to "Anonymous"
    var commentname = document.getElementById("postcommentname").value;
    var commenttext = document.getElementById("postcommenttext").value;
    if (commenttext == "") {
        alert("You must provide a message to submit");
        return false;
    }
    if (commentname == "") {
        commentname = "Anonymous";
    }
    var obj = { name: commentname, text: commenttext };
    var commentJSON = JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Message sent successfully");
            refreshPosts();
        }
    };
    xhr.open("POST", 'api/addpost.php', true);
    xhr.send(commentJSON);
    document.getElementById("postComment").reset();
}
;
function refreshPosts() {
    //Get all top-level posts, use a for statement to add them to a table
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'api/getallposts.php', true);
    xhr.addEventListener("load", function () {
        //Reset the app div to nothing
        let app = document.querySelector('#posts');
        app.textContent = "";
        let posts = JSON.parse(xhr.responseText);
        let table = document.createElement('table');
        document.querySelector('#posts').appendChild(table);
        let tbody = document.createElement('tbody');
        table.append(tbody);
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let td2 = document.createElement('td');
            let a = document.createElement('a');
            tbody.append(tr);
            tr.append(td);
            td.textContent = 'Posted by ' + post.name + ' at ' + post.datetime;
            tr.append(td2);
            td2.append(a);
            a.href = 'commentview.html?' + post.id;
            a.textContent = post.text;
        }
    });
    xhr.send();
}
