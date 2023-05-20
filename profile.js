var input = document.querySelector("input");
var firstCol = document.getElementById("col-1");
var secCol = document.getElementById("col-2");
var header = document.getElementsByTagName("header"); //returns an array

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    firstCol.innerHTML = ``;
    secCol.innerHTML = ``;

    var username_without_space = e.target.value.split(" ").join("");

    fetch(`https://api.github.com/users/` + username_without_space)
      .then((result) => result.json())
      .then((data) => {

//To avoid printing the line/hr more than once
        var hr = document.getElementById("line");
        if (hr == null)
          header[0].insertAdjacentHTML(
            "afterend",
            '<hr style="margin-top: 5%" id="line" />'
          );

        var photo = document.getElementById("photo");

        photo.innerHTML = `<img src='${data.avatar_url}' class="avatar">
        <br /><br />
        <h3 id="name">${data.name}</h3>
        <div id="login" style="color:grey;">${data.login}</div>
        <br />
        <button class="button-4" role="button" id="btn">Follow</button>
        <br />
        <div style="width:70%" id="bio">${data.bio}</div>
        <br />
        <div style="font-size: 15px;" id="follow">
        <i class="fa-regular fa-user fa-sm" style="color: #a4a9b2;"></i>
        <span style=" font-weight: bold;">${data.followers}</span> followers . <span style="font-weight: bold;">${data.following}</span> following</div>
        <hr style="width: 70%;color: grey">`;

        var bio = document.getElementById("bio")

        if(data.bio === null)
        bio.remove();
      }) //end of user_api
      .catch((error) => console.error(error));

    fetch(`https://api.github.com/users/${username_without_space}/repos`)
      .then((result) => result.json())
      .then((data) => {
    
        var language = "";

        firstCol.innerHTML = `<span style='font-size: 18px;'>Popular repositories</span><br/><br/>`;
        secCol.innerHTML = `<br/><br/>`;

        //repo names
        for (var i = 0; i < 6; ++i) {
          if (data[i].language != null) {
            switch (data[i].language) {
              case "HTML":
                language = `<span class="mt-2"><i class="fa-solid fa-circle" style="color: #ff0000;"></i>${data[i].language}</span>`;
                break;
              case "CSS":
                language = `<span class="mt-2"><i class="fa-solid fa-circle" style="color: #563d7c;"></i>${data[i].language}</span>`;
                break;
            }
          } //end if - language

          //print 6 repos
          if (i % 2 == 0)
            firstCol.innerHTML += `
            <div class="card ps-4 pt-3">
            ${data[i].name}<br /><br />${language}</div><br/>`;
          else
            secCol.innerHTML += `<div class="card ps-4 pt-3">
            ${data[i].name}<br /><br />${language}</div><br/>`;
        } //end of for loop
      }) //end of repo api
      .catch((error) => console.error(error));
  } //end of if condition
}); //end of keyup
