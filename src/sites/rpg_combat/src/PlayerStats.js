class PlayerStats {
  constructor(job) {
    this.job = job;
    this.maxHP = this.job.startingHP;
    this.maxMP = this.job.startingMP;
    this.str = this.job.startingStr;
    this.dex = this.job.startingDex;
    this.speed = this.job.startingSpeed;
    this.sta = this.job.startingSta;
    this.int = this.job.startingInt;
    this.luck = this.job.startingLuck;
  }
}

module.exports = PlayerStats;
