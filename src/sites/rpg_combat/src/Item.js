const library = require("./libraries");

class Item {
  constructor(name, category, subcategory = null) {
    this.name = name;
    this.type = library.masterItemList[category][subcategory][name].type;
    this.weight = library.masterItemList[category][subcategory][name].weight;
    this.description = library.masterItemList[category][subcategory][name].desc;
    if (subcategory === "weapons") {
      this.hands = library.masterItemList[category][subcategory][name].hands;
      this.attack = library.masterItemList[category][subcategory][name].attack;
      this.damage = library.masterItemList[category][subcategory][name].damage;
      this.dmgRange =
        library.masterItemList[category][subcategory][name].dmgRange;
      if (library.masterItemList[category][subcategory][name].defense) {
        this.defense =
          library.masterItemList[category][subcategory][name].defense;
      }
      if (library.masterItemList[category][subcategory][name].evasion) {
        this.evasion =
          library.masterItemList[category][subcategory][name].evasion;
      }
      if (library.masterItemList[category][subcategory][name].specialEffects) {
        this.specialEffects =
          library.masterItemList[category][subcategory][name].specialEffects;
      }
      this.equippable = true;
      this.equipped = false;
    } else if (subcategory === "armor") {
      this.defense =
        library.masterItemList[category][subcategory][name].defense;
      this.evasion =
        library.masterItemList[category][subcategory][name].evasion;
      this.magicDefense =
        library.masterItemList[category][subcategory][name].magicDefense;
      if (library.masterItemList[category][subcategory][name].specialEffects) {
        this.specialEffects =
          library.masterItemList[category][subcategory][name].specialEffects;
      }
      this.equippable = true;
      this.equipped = false;
    }
  }

  generateItem() {
    const item = new Item(
      this.name,
      this.type,
      this.weight,
      this.description,
      this.attack,
      this.attackRange,
      this.defense,
      this.evasion,
      this.equippable,
      this.equipped,
      this.specialEffects
    );
    return item;
  }
}

module.exports = Item;
