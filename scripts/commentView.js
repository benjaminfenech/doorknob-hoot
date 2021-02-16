refreshTopLevel();
refreshReplies();
setInterval(refreshReplies, 5000);
function sendReply() {
    //Check if a message was provided, check if a name was provided.
    //If no comment, exit, if no name, set to "Anonymous"
    var commentname = document.getElementById("postreplyname").value;
    var commenttext = document.getElementById("postreplytext").value;
    var replytoid = window.location.search.slice(1);
    if (commenttext == "") {
        alert("You must provide a message to submit");
        return false;
    }
    if (commentname == "") {
        commentname = "Anonymous";
    }
    var obj = { name: commentname, text: commenttext, replyto: replytoid };
    var replyJSON = JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Message sent successfully");
            refreshReplies();
        }
    };
    xhr.open("POST", 'api/addreply.php', true);
    xhr.send(replyJSON);
    document.getElementById("postReply").reset();
}
;
function refreshTopLevel() {
    // Find the top-level comment based on its id, use a for statement to put it into a table
    let postid = window.location.search.slice(1);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'api/gettoplevel.php', true);
    xhr.addEventListener("load", function () {
        //Reset the app div to nothing
        let app = document.querySelector('#toplevelpost');
        app.textContent = "";
        let posts = JSON.parse(xhr.responseText);
        let table = document.createElement('table');
        document.querySelector('#toplevelpost').appendChild(table);
        let tbody = document.createElement('tbody');
        table.append(tbody);
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let a = document.createElement('a');
            let like = document.createElement('button'); 
            let dislike = document.createElement('button'); 

            tbody.append(tr);
            tr.append(td);
            td.textContent = post.name + ' at ' + post.datetime;
            tr.append(td2);
            td2.append(a);
            a.href = 'commentview.html?' + post.id;
            a.textContent = post.text;
            tr.append(td3);
            td3.textContent = post.likes + ' likes';
            tr.append(td4);
            td4.append(like);
            td4.append(dislike);
            like.textContent = 'Like';
            like.type = 'button';
            dislike.textContent = 'Dislike';
            dislike.type = 'button';
        }
    });
    xhr.send(postid);
}
;
function refreshReplies() {
    //Use the top level id to find replies, use a for statement to put them into a table
    let postid = window.location.search.slice(1);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'api/getallreplies.php', true);
    xhr.addEventListener("load", function () {
        //Reset the app div to nothing
        let app = document.querySelector('#replies');
        app.textContent = "";
        let posts = JSON.parse(xhr.responseText);
        let table = document.createElement('table');
        document.querySelector('#replies').appendChild(table);
        let tbody = document.createElement('tbody');
        table.append(tbody);
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let a = document.createElement('a');
            tbody.append(tr);
            tr.append(td);
            td.textContent = post.name + ' at ' + post.datetime;
            tr.append(td2);
            td2.append(a);
            a.href = 'commentview.html?' + post.id;
            a.textContent = post.text;
            tr.append(td3);
            td3.textContent = post.likes + ' likes';
        }
    });
    xhr.send(postid);
}
;
