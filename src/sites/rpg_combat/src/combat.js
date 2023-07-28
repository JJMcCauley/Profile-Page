const Enemy = require("./Enemy");
const library = require("./libraries");
const renderScreen = require("./screenRender");
const {
  capitalizeWord,
  randomNumberGenerator,
  getMasterSpellList,
  damageFormula,
} = require("./helper");

const startCombat = (party) => {
  renderScreen(library.screens.battle);
  let exp = 0;
  let gold = 0;
  const enemyArea = document.querySelector("#enemy-area");
  const commands = document.querySelector("#commands");
  const combatLog = document.querySelector("#combat-log");
  const currentArea = "area1";
  const encounterSize = getEncounterSize();
  const currentEncounter = {};
  currentEncounter.enemies = getEnemies(currentArea, encounterSize);
  currentEncounter.playerParty = [...party.members];
  currentEncounter.whole = [
    ...currentEncounter.enemies,
    ...currentEncounter.playerParty,
  ];
  console.log(currentEncounter);
  console.log(currentEncounter.playerParty);
  let msg;

  setPartyIndex();

  initializeInitiative();
  showParty();
  enemyArrival();
  printMessage(msg);
  displayEnemies();
  msg = '<p class="turqoise">What would you like to do?</p>';
  printMessage(msg);
  getPreCombatInput();

  commands.addEventListener("click", (e) => {
    if (e.target.type === "button") {
      if (e.target.id === "start-battle-btn") {
        clearCommands();
        getNextTurn();
      } else if (e.target.id === "flee-battle-btn") {
        clearCommands();
        clearEnemyArea();
        msg = `<p><span class="player">The party</span> has successfully fled the encounter!</span>!</p>`;
        printMessage(msg);
        commands.innerHTML = `<button type='button' id='next' class='btn btn-danger col-3'>Next</button>`;
      } else if (e.target.id === "attack-btn") {
        playerAttack("attack");
      } else if (e.target.id === "magic-btn") {
        chooseMagicType();
      } else if (e.target.id.indexOf("attack-enemy") >= 0) {
        processAttack(e.target.dataset.target, "attack");
      } else if (e.target.id === "back") {
        clearCommands();
        getCombatInput();
      } else if (e.target.id === "next") {
        renderScreen(library.screens.postBattle);
        postCombat(party);
      } else if (e.target.id.indexOf("spell") === 0) {
        clearCommands();
        processMagicSpell(e.target.dataset.spellName);
      } else if (e.target.id === "back-spells") {
        clearCommands();
        chooseMagicType();
      } else if (e.target.id.indexOf("cast-enemy") === 0) {
        const target = e.target.id.slice(11);
        const spell = e.target.dataset.spell;
        console.log(
          `${currentEncounter.characterUp.name} casts ${spell} on ${target}`
        );
        castOffensiveSpell(spell, target);
      } else if ((e.target.id === "cast-friendly") === 0) {
        console.log(e.target.id);
      } else if (e.target.id === "support-magic-btn") {
        playerMagic("support");
      } else if (e.target.id === "offensive-magic-btn") {
        playerMagic("offensive");
      }
    }
  });

  function setPartyIndex() {
    for (let member of party.members) {
      member.partyIndex = party;
    }
  }

  function chooseMagicType() {
    let magicHtml = "";
    if (
      currentEncounter.characterUp.hasOffensiveSpells &&
      currentEncounter.characterUp.hasSupportSpells
    ) {
      magicHtml += `
                            <div class='col-3 command'>
                                <button type="button" id="support-magic-btn" class="mt-3 btn btn-magic-support">Support Magic</button>                                   
                            </div>
                            <div class='col-3 command'>                                    
                                <button type="button" id="offensive-magic-btn" class="mt-3 btn btn-magic-offensive">Offensive Magic</button>
                            </div>
                        `;
      magicHtml += `
                        <div class='col-3 command'>
                            <button type="button" id="back" class="mt-3 btn btn-info">Back</button>
                        </div>`;
      commands.innerHTML = magicHtml;
    } else playerMagic();
  }

  function endEncounter() {
    printMessage(
      `<span class='tomato'><p>Enemies</span> <span class='red'>defeated!</span><p>`
    );
    printMessage(
      `<p><span class="player">The party</span> earns <span class='gold'>${gold} gold</span> and <span class='exp'>${exp} experience points</span>!</p>`
    );
    party.gold += gold;
    party.exp += exp;
    printMessage(
      `<p><span class="player">The party</span> has a total of <span class='gold'>${party.gold} gold</span> and <span class='exp'>${party.exp} experience points</span>!</p>`
    );
    clearCommands();
    clearEnemyArea();
    commands.innerHTML = `<button type='button' id='next' class='btn btn-danger col-3'>Next</button>`;
  }

  function checkEnemyDeath(enemy) {
    if (enemy.currentHP <= 0) {
      enemy.status = "dead.";
      exp += enemy.stats.exp;
      gold += enemy.gold;
    }
    displayEnemies();
  }

  function encounterOverBool() {
    currentEncounter.aliveEnemies = [];
    for (let i = 0; i < currentEncounter.enemies.length; i++) {
      if (currentEncounter.enemies[i].alive) {
        currentEncounter.aliveEnemies.push(currentEncounter.enemies[i]);
      }
    }
    if (currentEncounter.aliveEnemies.length > 0) {
      return false;
    } else return true;
  }

  function endPlayerTurn() {
    clearCommands();
    getNextTurn();
  }

  function castOffensiveSpell(spellName, targetName) {
    const spell = getMasterSpellList().filter(
      (spell) => spell.name === spellName
    )[0];
    const target = currentEncounter.enemies.filter(
      (enemy) => enemy.encounterName === targetName
    )[0];
    const caster = currentEncounter.characterUp;
    let dmg = -1;
    if (spell.baseDamage) {
      caster.currentlyCasting = spell;
      dmg = damageFormula(caster.magicAttack, target.stats.magicDefense);
      target.damage += dmg;
      msg = `<p><span class = "player">${
        currentEncounter.characterUp.name
      }</span> casts <span class='exp'>${
        spell.name
      }</span> on <span class='tomato'>${capitalizeWord(
        target.encounterName
      )}</span> for <span class='orange'>${dmg}</span> points of <span class='red'>damage</span>!</p>`;
      printMessage(msg);
      msg = `
            <p>The <span class=tomato>${target.name}</span> ${target.healthState}</p>
            `;
      printMessage(msg);
    } else {
      msg = `<p><span class = "player">${
        currentEncounter.characterUp.name
      }</span> casts <span class='exp'>${
        spell.name
      }</span> on <span class='tomato'>${capitalizeWord(
        target.encounterName
      )}</span>.</p>`;
      printMessage(msg);
    }

    console.log(spell.specialEffects);

    if (spell.specialEffects === "slow") {
      msg = `
                <p>The <span class=tomato>${target.name}</span> has been <span class='exp'>slowed</span>.</p>
            `;
      printMessage(msg);
    }

    checkEnemyDeath(target);
    if (!encounterOverBool()) {
      endPlayerTurn();
    } else {
      endEncounter();
    }
  }

  function displayToolTip(element) {
    const target = element.parentElement;
    target.classList.add("tooltip-container");
    const tooltip = document.getElementById(
      `${element.dataset.spellName}-tooltip-text`
    );
    tooltip.style.display = "block";
  }

  function removeToolTip(element) {
    const target = element.parentElement;
    target.classList.remove("tooltip-container");
    const tooltip = document.getElementById(
      `${element.dataset.spellName}-tooltip-text`
    );
    tooltip.style.display = "none";
  }

  function getEnemy(name) {
    for (let i = 0; i < currentEncounter.enemies.length; i++) {
      if (currentEncounter.enemies[i].encounterName === name)
        return currentEncounter.enemies[i];
    }
  }

  function processAttack(enemyName, attackType) {
    const enemy = getEnemy(enemyName);
    if (attackType === "attack") {
      const attack = currentEncounter.characterUp.attack;
      const damage = damageFormula(attack, enemy.stats.defense);
      enemy.damage += damage;
      printMessage(
        `<p><span class='player'>${currentEncounter.characterUp.name}</span> hits <span class='tomato'>${enemy.name}</span> for <span class='orange'>${damage}</span> points of <span class='red'>damage</span>!</p>`
      );
    }
    msg = `
            <p>The <span class=tomato>${enemy.name}</span> ${enemy.healthState}</p>
        `;
    printMessage(msg);
    checkEnemyDeath(enemy);
    if (!encounterOverBool()) {
      endPlayerTurn();
    } else {
      endEncounter();
    }
  }

  function processMagicSpell(spellName) {
    let spellcastHTML = "";
    const spell = getMasterSpellList().filter(
      (spellObj) => spellObj.name === spellName
    )[0];
    const caster = currentEncounter.characterUp;
    console.log(spell);
    if (spell.type === "offensive") {
      for (let i = 0; i < currentEncounter.enemies.length; i++) {
        if (currentEncounter.enemies[i].alive) {
          spellcastHTML += `
                                        <div class='col-3 command mt-3'>
                                            <button type="button" id="cast-enemy-${
                                              currentEncounter.enemies[i]
                                                .encounterName
                                            }" data-target="${
            currentEncounter.enemies[i].encounterName
          }" class="btn btn-magic" data-spell="${spellName}">${capitalizeWord(
            currentEncounter.enemies[i].encounterName
          )}</button>
                                        </div>
                                    `;
        }
      }
    }
    spellcastHTML += `
                            <div class='col-3 command'>
                                <button type="button" id="back-spells" class="mt-3 btn btn-info">Back</button>
                            </div>
                        `;
    commands.innerHTML = spellcastHTML;
  }

  function clearEnemyArea() {
    enemyArea.innerHTML = "";
  }

  function clearCommands() {
    commands.innerHTML = "";
  }

  function enemyArrival() {
    if (currentEncounter.enemies.length > 1) {
      msg = `
                <p>${currentEncounter.enemies.length} <span class='tomato'>enemies</span> have arrived!</p>
            `;
    } else if (currentEncounter.enemies.length === 1) {
      msg = `
                <p>${currentEncounter.enemies.length} <span class='tomato'>enemy</span> has arrived!</p>
            `;
    }
    for (let i = 0; i < currentEncounter.enemies.length; i++) {
      msg += `
                <p>A <span class='tomato'>${currentEncounter.enemies[i].name}</span> is here!</p>
            `;
    }
  }

  function getEncounterSize() {
    const randomNumber = randomNumberGenerator(1, 100);
    if (randomNumber >= 75) {
      return 3;
    } else if (randomNumber >= 50) {
      return 1;
    } else {
      return 2;
    }
  }

  function getCurrentEnemies(enemyList, enemyPartySize) {
    const enemies = [];
    for (let i = 0; i < enemyPartySize; i++) {
      const enemyIndex = randomNumberGenerator(0, enemyList.length - 1);
      const currentEnemy = enemyList[enemyIndex];
      currentEnemy.index = i;
      enemies.push(enemyList[enemyIndex]);
    }
    return enemies;
  }

  function getEnemies(area, encounterSize) {
    const potentialEnemies = library.enemiesByArea[area];
    const enemyList = getCurrentEnemies(potentialEnemies, encounterSize);
    const enemies = [];
    const enemiesInEncounter = [];
    for (let i = 0; i < enemyList.length; i++) {
      let enemyNamed = false;
      let enemy = `${enemyList[i]}-1`;
      while (enemyNamed === false) {
        if (!enemiesInEncounter.includes(enemy)) {
          enemiesInEncounter.push(enemy);
          enemyNamed = true;
        } else {
          const sameEnemyIndex = parseInt(enemy.slice(-1));
          enemy = `${enemyList[i]}-${sameEnemyIndex + 1}`;
        }
      }
      enemies.push(new Enemy(enemyList[i], i, parseInt(enemy.slice(-1))));
    }
    return enemies;
  }

  function getNextTurn() {
    let nextFound = false;
    do {
      let highestInit = 0;
      for (let i = 0; i < currentEncounter.whole.length; i++) {
        if (currentEncounter.whole[i].alive) {
          const ticRate = randomNumberGenerator(1, 10);
          const currentCharacter = currentEncounter.whole[i];
          currentCharacter.currentEncounterIndex = i;
          currentCharacter.initiative += ticRate + currentCharacter.stats.speed;
          if (
            currentCharacter.initiative >= 100 &&
            currentCharacter.initiative > highestInit
          ) {
            highestInit = currentCharacter.initiative;
            nextFound = true;
            currentEncounter.characterUp = currentCharacter;
          }
        }
      }
    } while (!nextFound);
    removeDivFocus();
    if (currentEncounter.characterUp.isEnemy) {
      divFocus(
        document.querySelector(
          `[data-name="${currentEncounter.characterUp.encounterName}"]`
        )
      );
    } else {
      divFocus(
        document.querySelector(
          `[data-name="${currentEncounter.characterUp.name}"]`
        )
      );
    }
    takeTurn();
  }

  function initializeInitiative() {
    for (let i = 0; i < currentEncounter.whole.length; i++) {
      currentEncounter.whole[i].initiative = 0;
    }
  }

  function displayEnemies() {
    const enemyList = [];
    for (let i = 0; i < currentEncounter.enemies.length; i++) {
      if (currentEncounter.enemies[i].alive) {
        enemyList.push(currentEncounter.enemies[i]);
      }
    }
    let imgHtml = "";
    enemyArea.innerHTML = imgHtml;
    if (enemyList.length === 1) {
      let i = 0;
      imgHtml = `<div data-name='${
        enemyList[i].encounterName
      }' class='col-${4} center enemy-div'><img src='${enemyList[i].img}'>`;
      imgHtml += `<p class='white enemy-status'>${capitalizeWord(
        enemyList[i].encounterName
      )}</p>`;
      imgHtml += `<p class='white enemy-status'>HP: ${enemyList[i].currentHP}/${enemyList[i].stats.maxHP}</p>`;
      imgHtml += `</div >`;
    } else if (enemyList.length >= 2) {
      for (let i = 0; i < enemyList.length; i++) {
        imgHtml += `<div data-name='${enemyList[i].encounterName}' class='col-${
          12 / enemyList.length
        } center enemy-div'><img src='${enemyList[i].img}'>`;
        imgHtml += `<p class='white enemy-status'>${capitalizeWord(
          enemyList[i].encounterName
        )}</p>`;
        imgHtml += `<p class='white enemy-status'>HP: ${enemyList[i].currentHP}/${enemyList[i].stats.maxHP}</p>`;
        imgHtml += `</div >`;
      }
    }
    enemyArea.insertAdjacentHTML("beforeend", imgHtml);
  }

  function playerAttack() {
    clearCommands();
    let enemyHtml = "";
    for (let i = 0; i < currentEncounter.enemies.length; i++) {
      if (currentEncounter.enemies[i].alive) {
        enemyHtml += `
                                <div class='col-3 command mt-3'>
                                    <button type="button" id="attack-enemy-${
                                      currentEncounter.enemies[i].encounterName
                                    }" data-target="${
          currentEncounter.enemies[i].encounterName
        }" class="btn btn-danger">${capitalizeWord(
          currentEncounter.enemies[i].encounterName
        )}</button>
                                </div>
                            `;
      }
    }
    enemyHtml += `
                        <div class='col-3 command'>
                            <button type="button" id="back" class="mt-3 btn btn-info">Back</button>
                        </div>
                    `;
    commands.innerHTML = enemyHtml;
  }

  function playerMagic(spellType = "all") {
    clearCommands();
    let magicHtml = ``;
    if (spellType === "all") {
      for (let i = 0; i < currentEncounter.characterUp.spells.length; i++) {
        const spell = currentEncounter.characterUp.spells[i];
        console.log(spell);
        magicHtml += `
                    <div class='col-3 command mt-3'>
                        <p id="${
                          spell.name
                        }-tooltip-text" class='tooltip-text'>${
          spell.shortDesc
        }</p>
                        <button type='button' id='spell-${
                          spell.name
                        }' data-spell-name='${
          spell.name
        }' class='btn btn-magic spell'>${capitalizeWord(spell.name)}</btn>
                    </div>
                `;
      }
    } else if (spellType === "support") {
      for (let i = 0; i < currentEncounter.characterUp.spells.length; i++) {
        const spell = currentEncounter.characterUp.spells[i];
        if (spell.type === "support") {
          magicHtml += `
                        <div class='col-3 command mt-3'>
                            <p id="${
                              spell.name
                            }-tooltip-text" class='tooltip-text'>${
            spell.shortDesc
          }</p>
                            <button type='button' id='spell-${
                              spell.name
                            }' data-spell-name='${
            spell.name
          }' class='btn btn-magic spell'>${capitalizeWord(spell.name)}</btn>
                        </div>
                    `;
        }
      }
    } else if (spellType === "offensive") {
      for (let i = 0; i < currentEncounter.characterUp.spells.length; i++) {
        const spell = currentEncounter.characterUp.spells[i];
        if (spell.type === "offensive") {
          magicHtml += `
                        <div class='col-3 command mt-3'>
                            <p id="${
                              spell.name
                            }-tooltip-text" class='tooltip-text'>${
            spell.shortDesc
          }</p>
                            <button type='button' id='spell-${
                              spell.name
                            }' data-spell-name='${
            spell.name
          }' class='btn btn-magic spell'>${capitalizeWord(spell.name)}</btn>
                        </div>
                    `;
        }
      }
    }

    magicHtml += `
                        <div class='col-3 command'>
                            <button type="button" id="back" class="mt-3 btn btn-info">Back</button>
                        </div>`;
    commands.innerHTML = magicHtml;
    const spells = document.querySelectorAll(".spell");
    for (let i = 0; i < spells.length; i++) {
      spells[i].addEventListener("mouseover", (e) => {
        displayToolTip(e.target);
      });
      spells[i].addEventListener("mouseleave", (e) => {
        removeToolTip(e.target);
      });
    }
  }

  function getPreCombatInput() {
    const startBattleBtn = `
                                    <div class='col-3 command'>
                                        <button type="button" id="start-battle-btn" class="mt-3 btn btn-danger">Start Battle!</button>
                                    </div>
                                `;
    commands.insertAdjacentHTML("beforeend", startBattleBtn);
    const fleeBtn = `
                            <div class='col-3 command'>
                                <button type="button" id="flee-battle-btn" class="mt-3 btn btn-warning">Flee Battle!</button>
                            </div>
                        `;
    commands.insertAdjacentHTML("beforeend", fleeBtn);
  }

  function getCombatInput() {
    const attack = `
                            <div class='col-3 command'>
                                <button type="button" id="attack-btn" class="mt-3 btn btn-danger">Attack!</button>
                            </div>
                        `;
    commands.insertAdjacentHTML("beforeend", attack);
    if (
      currentEncounter.characterUp.job.hasSpells &&
      currentEncounter.characterUp.spells.length > 0
    ) {
      const magic = `
                            <div class='col-3 command'>
                                <button type="button" id="magic-btn" class="mt-3 btn btn-magic">Use Magic!</button>
                            </div>
                        `;
      commands.insertAdjacentHTML("beforeend", magic);
    }
  }

  function takeTurn() {
    currentEncounter.characterUp.initiative = 0;
    if (party.members.includes(currentEncounter.characterUp)) {
      getCombatInput();
    } else {
      msg = `<p><span class='tomato'>${capitalizeWord(
        currentEncounter.characterUp.name
      )}</span> attacks</span> <span class='player'>${
        party.members[randomNumberGenerator(0, 3)].name
      }</span> for <span class='orange'>${
        currentEncounter.characterUp.attack.damage
      }</span> points of <span class='red'>damage</span>!</p>`;
      printMessage(msg);
      getNextTurn();
    }
  }

  function enemyStatus() {
    for (let i = 0; i < currentEncounter.enemies.length; i++) {
      const enemy = currentEncounter.enemies[i];
      msg = `
            <p><span class=tomato>${capitalizeWord(enemy.name)}</span> is ${
        enemy.status
      } The <span class=tomato>${enemy.name}</span> ${enemy.healthState}</p>
        `;
      printMessage(msg);
    }
  }

  function scrollToBottom() {
    combatLog.scrollTop = combatLog.scrollHeight;
  }

  function showParty() {
    const partyDiv = document.querySelector("#party");
    let html = "";
    for (let i = 0; i < currentEncounter.playerParty.length; i++) {
      const character = party.members[i];
      html += `
                <div data-name="${character.name}" data-index="${
        character.partyIndex
      }" class="card player-card col-3 p-3 text-center">
                    <img src="${
                      character.job.img
                    }" class="class-img card-img-top mx-auto" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${capitalizeWord(
                          character.name
                        )}</h5>
                        <p class="card-text"><span class="player">HP</span>: ${
                          character.stats.maxHP
                        }/${character.currentHP}</p>
                        <p class="card-text"><span class="exp">MP</span>: ${
                          character.stats.maxMP
                        }/${character.currentMP}</p>
                    </div>
                </div>
            `;
    }
    partyDiv.innerHTML = html;
  }

  function printMessage(message) {
    combatLog.insertAdjacentHTML("beforeend", message);
    scrollToBottom();
  }

  function divFocus(div) {
    div.style.border = ".5em solid rgb(63, 226, 210)";
  }

  function removeDivFocus() {
    const combatantDivs = document.querySelectorAll(`[data-name]`);
    for (let i = 0; i < combatantDivs.length; i++) {
      combatantDivs[i].style.border = "inherit";
    }
  }
};

module.exports = startCombat;
