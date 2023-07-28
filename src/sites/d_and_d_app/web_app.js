const classSelector = document.querySelector("select");

class Spell {
  constructor(name = "", index = "", url = "") {
    this.name = name;
    this.index = index;
    this.url = url;
  }
}

/**
 * Finds the main information div and displays it
 *
 * @param {number} x The number that will be parsed into scientific notation.
 * @param {number} f The number of digits after the decimal.
 * @return {string} represting the number x in scientific notation with f number of digts after the decimal
 */
function showInformation() {
  const commonInfo = document.getElementById("common-info");
  commonInfo.style.display = "inherit";
}

/**
 * Takes information pulled from the API and assigns the data to the releveant divs
 *
 * @param {string} className The name of the class being displayed
 * @param {number} hitDie Class's base hit-die
 * @param {string} proficienciesString Base weapon proficiencies of chosen class
 * @param {string} savingThrowsString What saving throw's the class has proficiency in
 * @param {string} startingEquipmentString What equipment the class starts with
 * @param {string} startingEquipmentChoicesString Additional options for starting equipment of chosen class
 * @param {string} subclassString Choices of subclasses for chosen class
 */
function showClassInfo(
  className,
  hitDie,
  proficienciesString,
  proficiencyChoicesString,
  savingThrowsString,
  startingEquipmentString,
  startingEquipmentChoicesString,
  subclassString
) {
  const classNameElement = document.getElementById("name");
  classNameElement.innerHTML = `<span class="text-danger">${className}</span>`;
  const hitDieElement = document.getElementById("hit-die");
  hitDieElement.innerText = `1d${hitDie}`;
  const proficienciesElement = document.getElementById("proficiencies");
  proficienciesElement.innerHTML = proficienciesString;
  const proficiencyChoicesElement = document.getElementById(
    "proficiency-choices"
  );
  proficiencyChoicesElement.innerHTML = proficiencyChoicesString;
  const savingThrowsElement = document.getElementById("saving-throws");
  savingThrowsElement.innerHTML = savingThrowsString;
  const startingEquipmentElement =
    document.getElementById("starting-equipment");
  startingEquipmentElement.innerHTML = startingEquipmentString;
  const startingEquipmentChoicesElement = document.getElementById(
    "starting-equipment-choices"
  );
  startingEquipmentChoicesElement.innerHTML = startingEquipmentChoicesString;
  const subclassElement = document.getElementById("subclasses");
  subclassElement.innerHTML = `${subclassString}`;
}

/**
 * Displays spell casting info for chosen class, seperated from other info as not all classes have magic
 *
 * @param {string} spellcastingInfoString A string representing the basic spell casting abilities of chosen class
 * @param {string} spellAbilityString Special spell-based abilities of chosen class
 */
function showMagicInfo(spellcastingInfoString, spellAbilityString) {
  const spellInformationElement = document.getElementById("spell-information");
  spellInformationElement.innerHTML = spellcastingInfoString;
  const spellcastingAbilityElement = document.getElementById(
    "spellcasting-ability"
  );
  spellcastingAbilityElement.innerHTML = spellAbilityString;
}

/**
 * This code displays all the possible spells the selected class knows in alphabetical order, for visual clarity the color of the boxes are cycled through by data index
 *
 * @param {object} spellList The list of spells for selected class expressed as an object
 */
function displaySpells(spellList) {
  const spellListElement = document.getElementById("spell-list");
  let index = 0;
  let spellIndex = 0;
  let shown0 = false;
  let shown1 = false;
  let shown2 = false;
  let shown3 = false;
  let shown4 = false;
  let shown5 = false;
  let shown6 = false;
  let shown7 = false;
  let shown8 = false;
  let shown9 = false;
  // const sortMethod = document.querySelector(
  //   'input[name="sortingMethod"]:checked'
  // ).value;
  // const sortStyle = document.querySelector(
  //   'input[name="sortingStyle"]:checked'
  // ).value;
  const sortMethod = "spellLevel";
  const sortStyle = "ascending";
  if (sortMethod === "spellLevel") {
    if (sortStyle === "ascending") {
      for (let x = 0; x < spellList.length; x++) {
        const spell = spellList[x];
        let spellMsg = "";
        // if (!shown0) {
        //   spellMsg += `<div><h2>Level 0</h2></div>`;
        //   shown0 = true;
        // }
        // if (spell.dataset.spellLevel === 1 && !shown1) {
        //   spellMsg += `<div><h2>Level 1</h2></div>`;
        //   shown1 = true;
        // }
        if (index === 0) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" class="list-group-item col-3" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}">${spellList[x].name}</a>`;
          index++;
        } else if (index === 1) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" data-api-url="${spellList[x].url}" class="list-group-item list-group-item-primary col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 2) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item list-group-item-secondary col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 3) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item list-group-item-success col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 4) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item list-group-item-danger col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 5) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item list-group-item-warning col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 6) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item list-group-item-info col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 7) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item list-group-item-light col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 8) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item list-group-item-dark col-3">${spellList[x].name}</a>`;
          index++;
        } else if (index === 9) {
          spellMsg += `<a data-spell-index="${spellIndex}" data-index="${index}" data-bs-toggle="modal" href="#spell-modal" data-api-url="https://www.dnd5eapi.co${spellList[x].url}" class="list-group-item col-3">${spellList[x].name}</a>`;
          index = 1;
        }
        spellListElement.innerHTML += spellMsg;
        spellIndex++;
      }
    }
  }
  spellListElement.addEventListener("click", (e) => {
    processSpellClick(e.target);
  });
}

/**
 * Calls the function to display a popup box with the the spell's information that was clicked on
 *
 * @param {object} e The event object of the spell that was clicked
 */
function processSpellClick(spellElement) {
  const spell = spellElement;
  getSpellInformation(spell.dataset.apiUrl, spell.dataset.spellIndex);
}

/**
 * Makes the call to the API to dynamically retrieve information for spell modal pop-up
 *
 * @param {string} url The individual spell's url in the D&D api
 */
function getSpellInformation(url, spellIndex) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => {
      createSpellModal(data, spellIndex);
    })
    .catch((err) => console.log("Looks like there was a problem.", err));
}

/**
 * Clears all current information in the spell modal
 *
 */
function resetSpellModal() {
  document.getElementById("spell-level").innerHTML = "";
  document.getElementById("spell-school").innerHTML = "";
  document.getElementById("spell-desc").innerHTML = "";
  document.getElementById("attack-type").innerHTML = "";
  document.getElementById("area-of-effect").innerHTML = "";
  document.getElementById("save-dc").innerHTML = "";
  document.getElementById("spell-dmg").innerHTML = "";
  document.getElementById("casting-time").innerHTML = "";
  document.getElementById("spell-components").innerHTML = "";
  document.getElementById("material-components").innerHTML = "";
  document.getElementById("spell-range").innerHTML = "";
  document.getElementById("spell-duration").innerHTML = "";
  document.getElementById("spell-ritual").innerHTML = "";
}

/**
 * Creates a modal window with all the information on the selected spell, information is parsed so only relevant information is presented
 *
 * @param {object} spellData The raw data object with the spell's information from the API
 */
function createSpellModal(spellData, spellIndex) {
  resetSpellModal();
  document.getElementById("spell-modal").dataset.spellIndex = spellIndex;
  const spellLevelElement = document.getElementById("spell-level");
  const spellLevel = spellData.level;
  spellLevelElement.innerHTML = `<p>Spell Level: <span class='turqoise'>${spellLevel}</span></p>`;

  const spellSchoolElement = document.getElementById("spell-school");
  const spellSchool = spellData.school.name;
  spellSchoolElement.innerHTML = `<p>Spell School: <span class='green'>${spellSchool}</span></p>`;

  const spellNameElement = document.getElementById("spell-label");
  const spellName = spellData.name;
  spellNameElement.innerHTML = `<span class='turqoise'>${spellName}</span>`;

  const spellDescElement = document.getElementById("spell-desc");
  const spellDesc = [];
  for (let x = 0; x < spellData.desc.length; x++) {
    spellDesc.push(spellData.desc[x]);
  }
  const spellDescString = spellDesc.join(`<br><br>`);
  spellDescElement.innerHTML = `<p><span class='grey'>${spellDescString}</span>`;

  if (spellData.attack_type) {
    const spellAttackTypeElement = document.getElementById("attack-type");
    const spellAttackType = spellData.attack_type;
    spellAttackTypeElement.innerHTML = `<p><span class='turqoise'>${spellName}</span> requires a <span class='green'>${spellAttackType}</span> attack roll to hit.</p>`;
  }

  if (spellData.area_of_effect) {
    const areaOfEffectElement = document.getElementById("area-of-effect");
    const areaOfEffectType = spellData.area_of_effect.type;
    const areaOfEffectSize = spellData.area_of_effect.size;
    areaOfEffectElement.innerHTML = `<p><span class='turqoise'>${spellName}</span>'s area of effect is a <span class='green'>${areaOfEffectSize}</span> foot <span class='green'>${areaOfEffectType}</span></p>`;
  }

  if (spellData.dc) {
    const saveDCElement = document.getElementById("save-dc");
    const saveDCSuccess = spellData.dc.dc_success;
    const saveDCType = spellData.dc.dc_type.name;
    saveDCElement.innerHTML = `<p>DC Save Ability: <span class='turqoise'>${saveDCType}</span><br>Effects of spell upon successful save: <span class='green'>${saveDCSuccess}</span></p>`;
  }

  if (spellData.damage) {
    const spellDamageElement = document.getElementById("spell-dmg");
    const spellDamageType = spellData.damage.damage_type.name;
    let spellDamage = [];
    let spellDamageMsg;
    let spellDamageArray = [];
    let spellDamageString;
    if (spellData.damage.damage_at_slot_level) {
      spellDamage = spellData.damage.damage_at_slot_level;
      for (const [key, value] of Object.entries(spellDamage)) {
        spellDamageArray.push(`${key}: <span class='turqoise'>${value}</span>`);
      }
      spellDamageString = spellDamageArray.join(`<br>`);
      spellDamageMsg = `Spell damage by spell slot level<br>${spellDamageString}`;
    }
    if (spellData.damage.damage_at_character_level) {
      spellDamage = spellData.damage.damage_at_character_level;
      for (const [key, value] of Object.entries(spellDamage)) {
        spellDamageArray.push(`${key}: <span class='turqoise'>${value}</span>`);
      }
      spellDamageString = spellDamageArray.join(`<br>`);
      spellDamageMsg = `Spell damage by character level<br>${spellDamageString}`;
    }
    spellDamageElement.innerHTML = `<p>Damage Type: <span class='turqoise'>${spellDamageType}</span><br>${spellDamageMsg}</p>`;
  }

  const castingTimeElement = document.getElementById("casting-time");
  const castingTime = spellData.casting_time;
  castingTimeElement.innerHTML = `<p>Casting time: <span class='turqoise'>${castingTime}</span></p>`;

  const spellComponentsElement = document.getElementById("spell-components");
  const spellComponents = spellData.components.join(`, `);
  spellComponentsElement.innerHTML = `<p>Spell Components: <span class='green'>${spellComponents}</span>.`;

  if (spellData.material) {
    const spellMaterialElement = document.getElementById("material-components");
    const spellMaterial = spellData.material;
    spellMaterialElement.innerHTML = `<p>Spell Materials: <span class='green'>${spellMaterial}</span>`;
  }

  const spellRangeElement = document.getElementById("spell-range");
  const spellRange = spellData.range;
  spellRangeElement.innerHTML = `<p>Range: <span class='turqoise'>${spellRange}</span>`;

  const spellDurationElement = document.getElementById("spell-duration");
  const spellDuration = spellData.duration;
  spellDurationElement.innerHTML = `<p>Spell Duration: <span class='turqoise'>${spellDuration}</span>`;

  const spellRitualElement = document.getElementById("spell-ritual");
  const spellRitual = spellData.ritual;
  let ritualMsg;
  if (spellRitual) {
    ritualMsg = `<p><span class='turqoise'>This spell can be used as a ritual</span>.</p>`;
  } else {
    ritualMsg = `<p><span class='green'>This spell cannot be used as a ritual</span>.</p>`;
  }
  spellRitualElement.innerHTML = ritualMsg;
}

/**
 * creates a spell list array of spell objects out of input spells object
 *
 * @param {object} spells Object containing spell data from API
 */
function addSpells(spells) {
  spellList = [];
  for (let x = 0; x < spells.length; x++) {
    const spell = new Spell(spells[x].name, spells[x].index, spells[x].url);
    spellList.push(spell);
  }
  displaySpells(spellList);
}

/**
 * Retrieves information from the D&D api based on the name of a class
 *
 * @param {string} chosenClass The name of the class to be looked up in the API
 */
function getInformation(chosenClass) {
  return fetch(`https://www.dnd5eapi.co/api/classes/${chosenClass}`)
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => {
      parseData(data);
    })
    .catch((err) => console.log("Looks like there was a problem.", err));
}

/**
 * Converts the raw data from the API to useable information that can be plugged into the various divs, also shows or hides magic information div depending on whether it's present or not
 *
 * @param {object} data The data object from the API
 */
function parseData(data) {
  const className = data.name;

  const hitDie = data.hit_die;

  const proficiencies = [];
  for (let x = 0; x < data.proficiencies.length; x++) {
    proficiencies.push(data.proficiencies[x].name);
  }
  const proficienciesString = proficiencies.join(`<br>`);

  const proficiencyChoices = [];
  for (let x = 0; x < data.proficiency_choices.length; x++) {
    proficiencyChoices.push(data.proficiency_choices[x].desc);
  }
  const proficiencyChoicesString = proficiencyChoices.join(`<br>`);

  const savingThrows = [];
  for (let x = 0; x < data.saving_throws.length; x++) {
    savingThrows.push(data.saving_throws[x].name);
  }
  const savingThrowsString = savingThrows.join(`<br>`);

  const startingEquipment = [];
  for (let x = 0; x < data.starting_equipment.length; x++) {
    startingEquipment.push(
      `${data.starting_equipment[x].quantity} x ${data.starting_equipment[x].equipment.name}`
    );
  }
  const startingEquipmentString = startingEquipment.join(`<br>`);

  const startingEquipmentChoices = [];
  for (let x = 0; x < data.starting_equipment_options.length; x++) {
    const index = x + 1;
    startingEquipmentChoices.push(
      `${index}): ${data.starting_equipment_options[x].desc}`
    );
  }
  const startingEquipmentChoicesString = startingEquipmentChoices.join(`<br>`);

  const subclasses = [];
  for (let x = 0; x < data.subclasses.length; x++) {
    subclasses.push(data.subclasses[x].name);
  }
  const subclassString = subclasses.join(`<br>`);

  const magicElement = document.getElementById("magic-info");
  if (!data.spellcasting) {
    magicElement.style.display = "none";
  } else if (data.spellcasting) {
    magicElement.style.display = "block";
    parseMagicData(data);
  }

  showClassInfo(
    className,
    hitDie,
    proficienciesString,
    proficiencyChoicesString,
    savingThrowsString,
    startingEquipmentString,
    startingEquipmentChoicesString,
    subclassString
  );
  setBackgroundImage(className);
}

/**
 * Parses magic data for class if present into useable strings
 *
 * @param {object} data The raw data from the api concering the class's magical abilities
 */
function parseMagicData(data) {
  const spellcastingInfo = [];
  for (let x = 0; x < data.spellcasting.info.length; x++) {
    let name = `${data.spellcasting.info[x].name}`;
    let desc = [];
    for (let i = 0; i < data.spellcasting.info[x].desc.length; i++) {
      desc.push(data.spellcasting.info[x].desc[i]);
    }
    let descString = desc.join(`<br><br>`);
    let msg = `<h4>${name}</h4><p>${descString}<br>`;
    spellcastingInfo.push(msg);
  }
  spellcastingInfoString = spellcastingInfo.join(`<br>`);

  const name = data.name.toLowerCase();
  const spellAbility = data.spellcasting.spellcasting_ability.name;
  const spellAbilityString = `A ${name} uses their ${spellAbility} score to strengthen their magical abilities.`;
  clearSpells();
  getSpells(name);
  showMagicInfo(spellcastingInfoString, spellAbilityString);
}

/**
 * Clears all spells from the spell list element while retaining the parent element
 */
function clearSpells() {
  const spellListElement = document.getElementById("spell-list");
  spellListElement.replaceChildren();
}

/**
 * Calls the API to get information on chosen class's spells
 *
 * @param {string} name The name of the class that the spells will be retrieved for
 */
function getSpells(name) {
  return fetch(`https://www.dnd5eapi.co/api/classes/${name}/spells`)
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => {
      addSpells(data.results);
    })
    .catch((err) => console.log("Looks like there was a problem.", err));
}

/**
 * Checks the status of an API response and either continues if successful or throws an error if not
 *
 * @param {object} response response object from the API
 * @return {object} returns the same object if data is valid
 */
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/**
 * Displays the image from the API of the selected class
 *
 * @param {string} className The number that will be parsed into scientific notation.
 */
function setBackgroundImage(className) {
  const img = document.querySelector("img");
  img.src = `imgs/${className}.png`;
}

classSelector.addEventListener("change", (e) => {
  showInformation();
  getInformation(e.target.value.toLowerCase(0));
});

function spellCycle(direction) {
  const currentSpellIndex = parseInt(
    document.getElementById("spell-modal").dataset.spellIndex
  );
  const numberOfSpells =
    document.getElementById("spell-list").childElementCount - 1;
  let chosenSpell;
  if (direction === "back") {
    if (currentSpellIndex === 0) {
      chosenSpell = document.querySelector(
        `[data-spell-index='${numberOfSpells}']`
      );
    } else {
      chosenSpell = document.querySelector(
        `[data-spell-index='${currentSpellIndex - 1}']`
      );
    }
  } else if (direction === "next") {
    if (currentSpellIndex === numberOfSpells) {
      chosenSpell = document.querySelector(`[data-spell-index='${0}']`);
    } else {
      chosenSpell = document.querySelector(
        `[data-spell-index='${currentSpellIndex + 1}']`
      );
    }
  }
  processSpellClick(chosenSpell);
}

document.getElementById("spell-modal").addEventListener("click", (e) => {
  if (e.target.id === "nav-left") {
    spellCycle("back");
  } else if (e.target.id === "nav-right") {
    spellCycle("next");
  }
});
