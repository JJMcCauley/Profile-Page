const renderScreen = require("./screenRender");
const library = require("./libraries");
const PlayerCharacter = require("./PlayerCharacter");
const { capitalizeWord } = require("./helper");

function intro(party) {
  return new Promise((resolve, reject) => {
    renderScreen(library.screens.intro);
    const introDiv = document.querySelector("#intro-div");
    const partySize = 4;
    let namedIndex = 0;
    const tempParty = [];
    const sprites = [
      library.masterJobList.hero.img,
      library.masterJobList.warrior.img,
      library.masterJobList.thief.img,
      library.masterJobList.witch.img,
    ];

    introDiv.addEventListener("click", (e) => {
      if (e.target.type === "button") {
        if (e.target.id === "start-game") {
          resolve(party);
        } else if (e.target.id === "start-naming") {
          startNaming();
        }
      }
    });

    function startNaming() {
      introDiv.innerHTML = library.screens.nameParty;
      const spriteBox = document.querySelector("#naming-sprite");
      spriteBox.innerHTML = `<img src="./${sprites[namedIndex]}" />`;
      const nameInput = document.querySelector("#character-name-input");
      nameInput.focus();
      introDiv.addEventListener("click", (e) => {
        if (e.target.type === "button") {
          if (e.target.id === "name-character" && nameInput.value !== "") {
            nameCharacter(nameInput.value);
          } else if (e.target.id === "party-confirmed") {
            party.members = [...tempParty];
            resolve(party);
          } else if (e.target.id === "party-rename") {
            tempParty.length = 0;
            namedIndex = 0;
            nameInput.value = "";
            introDiv.innerHTML = "";
            startNaming();
          }
        }
      });

      nameInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && nameInput.value !== "" && namedIndex < 4) {
          nameCharacter(nameInput.value);
        }
      });

      function nameCharacter(name) {
        const label = document.querySelector("#character-label");
        const nameBtn = document.querySelector("#name-character");
        tempParty.push(
          new PlayerCharacter(
            name,
            document.querySelector("input:checked").value,
            library.jobArray[namedIndex]
          )
        );
        namedIndex++;
        if (namedIndex < partySize) {
          spriteBox.innerHTML = `<img src="./${sprites[namedIndex]}" />`;
          nameInput.value = "";
          nameInput.focus();
          label.textContent = library.script.intro.getName[namedIndex];
          document.querySelector("#radioHe").checked = true;
          nameBtn.textContent = "Name Your Friend";
        } else {
          showConfirmation();
        }

        function showConfirmation() {
          let html = `
                            <div id="party-confirmation" class="text-center">
                                <h2 class="turqoise mb-3">Are you happy with this party?</h2>
                        `;
          spriteBox.innerHTML = "";
          for (let i = 0; i < tempParty.length; i++) {
            let toBe = "is";
            if (tempParty[i].pronoun === "they") {
              toBe = "are";
            }
            html += `
            <p><span class="green">${capitalizeWord(
              tempParty[i].name
            )}</span> the <span class="exp">${capitalizeWord(
              tempParty[i].job.name
            )}</span>, <span class="blue">${
              tempParty[i].pronoun
            } ${toBe}</span> ready for an adventure!</p> 
                            `;
          }
          html += `
                            </div>
                            <div id="character-confirmation-buttons" class="mt-5">
                                <button id="party-confirmed" type='button' class='col-4 btn btn-success'>Let's go!</button><button id="party-rename" type='button' class='col-4 btn btn-warning'>Rename Party</button>
                            </div>                
                        `;
          introDiv.innerHTML = html;
        }
      }
    }
  });
}

module.exports = intro;
