const library = require("./libraries");

class EnemyStats {
  constructor(name) {
    this.maxHP = library.masterEnemyList[name].maxHP;
    this.defense = library.masterEnemyList[name].defense;
    this.magicDefense = library.masterEnemyList[name].magicDefense;
    this.speed = library.masterEnemyList[name].speed;
    this.exp = library.masterEnemyList[name].exp;
    this.goldMin = library.masterEnemyList[name].goldMin;
    this.goldMax = library.masterEnemyList[name].goldMax;
  }
}

module.exports = EnemyStats;
