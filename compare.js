var input = document.querySelector("input");
var firstCol = document.getElementById("col-1");
var secCol = document.getElementById("col-2");
var battle = document.getElementById("battle");
var counter = 1;
var playerOne = 0;
var playerTwo = 0;
var battle_button = "";

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    var username_without_space = e.target.value.split(" ").join("");

    fetch(`https://api.github.com/users/` + username_without_space)
      .then((result) => result.json())
      .then((data) => {
        if (counter == 1) {
          secCol.innerHTML = " ";
          firstCol.innerHTML = `<img src='${data.avatar_url}' class="avatar-compare"><br /><br />
        <h3 style="align-text:left;" id="name">${data.name}</h3>
        <div style="align-text:left; color:grey; font-size: 15pt">${data.login}</div><br />
        <button class="button-4" role="button" style="width:30%">Follow</button><br /><br />
        <div>
        <i class="fa-regular fa-user fa-sm" style="color: #a4a9b2;"></i>
        ${data.followers} followers <br>
        <i class="fa-regular fa-user fa-sm" style="color: #a4a9b2;"></i>
        ${data.following} following</div>
        <div>
        Public Repos: ${data.public_repos}
        </div>
        <div id="location">
        Location: ${data.location}
        </div>`;
          ++counter;
          playerOne = data.public_repos;

          //To avoid printing null values
          var git_name = document.getElementById("name");
          var location = document.getElementById("location");

          if (data.name === null)  git_name.remove();

          if (data.location === null) location.remove();
        } else {
          secCol.innerHTML = `<img src='${data.avatar_url}' class="avatar-compare"><br /><br />
        <h3 style="align-text:left;" id="name_two">${data.name}</h3>
        <div style="align-text:left; color:grey; font-size: 15pt">${data.login}</div><br />
        <button class="button-4" role="button" style="width:30%">Follow</button><br /><br />
        <div>
        <i class="fa-regular fa-user fa-sm" style="color: #a4a9b2;"></i>
        ${data.followers} followers <br>
        <i class="fa-regular fa-user fa-sm" style="color: #a4a9b2;"></i>
        ${data.following} following</div>
        <div>
        Public Repos: ${data.public_repos}
        </div>
        <div id="location_two">
        Location: ${data.location}
        </div>`;

          --counter;
          playerTwo = data.public_repos;

          //To avoid printing null values
          var git_name = document.getElementById("name_two");
          var location = document.getElementById("location_two");
          if (data.name === null) git_name.remove();

          if (data.location === null) location.remove();

          battle.innerHTML =
            '<br><button class="button-4" role="button" style="width:30%" id="battle_button">Battle!</button>';
          battle_button = document.getElementById("battle_button");

          battle_button.onclick = function () {
            if (playerOne > playerTwo) {
              firstCol.insertAdjacentHTML("afterbegin", "<h3>Winner!</h3>");
              secCol.insertAdjacentHTML("afterbegin", "<h3>Loser</h3>");
            } else {
              if (playerOne != playerTwo) {
                firstCol.insertAdjacentHTML("afterbegin", "<h3>Loser</h3>");
                secCol.insertAdjacentHTML("afterbegin", "<h3>Winner!</h3>");
              }
            }

            if (playerOne == playerTwo) {
              firstCol.insertAdjacentHTML("afterbegin", "<h3>Tie!</h3>");
              secCol.insertAdjacentHTML("afterbegin", "<h3>Tie!</h3>");
            }
          };
        } //end else
      }) //end of user_api
      .catch( error => console.error(error));
  } //end of if (button == enter)
}); //end of keyup
