const library = {
  masterEnemyList: {
    bugbear: {
      name: "bugbear",
      maxHP: 20,
      maxMP: 6,
      attacks: ["bash"],
      defense: 5,
      magicDefense: 5,
      speed: 3,
      exp: 5,
      goldMin: 15,
      goldMax: 20,
      img: "img/bugbear.png",
    },
    goblin: {
      name: "goblin",
      maxHP: 12,
      maxMP: 5,
      attacks: ["bash"],
      defense: 4,
      magicDefense: 3,
      speed: 6,
      exp: 2,
      goldMin: 8,
      goldMax: 12,
      img: "img/goblin.png",
    },
    slime: {
      name: "slime",
      maxHP: 8,
      maxMP: 2,
      attacks: ["bash"],
      defense: 3,
      magicDefense: 8,
      speed: 3,
      exp: 3,
      goldMin: 0,
      goldMax: 4,
      img: "img/slime.png",
    },
    spider: {
      name: "spider",
      maxHP: 9,
      maxMP: 8,
      attacks: ["bash"],
      defense: 3,
      magicDefense: 3,
      speed: 7,
      exp: 3,
      goldMin: 0,
      goldMax: 3,
      img: "img/spider.png",
    },
    wolf: {
      name: "wolf",
      maxHP: 14,
      maxMP: 4,
      attacks: ["bash"],
      defense: 3,
      magicDefense: 4,
      speed: 4,
      exp: 5,
      goldMin: 0,
      goldMax: 5,
      img: "img/wolf.png",
    },
  },

  enemiesByArea: {
    area1: ["bugbear", "goblin", "slime", "spider", "wolf"],
    area2: ["wolf"],
  },

  masterSkillList: {
    bash: {
      name: "bash",
      attack: 6,
      damage: 6,
      damageRng: 3,
      choiceWeight: 0,
      speed: "medium",
    },
  },

  masterSpellList: {
    familiar: {
      name: "familiar",
      type: "support",
      target: "self",
      shortDesc:
        "Summons a familiar that attacks on its own every time the character has a turn",
      mpCost: 4,
      speed: "medium",
      specialEffects:
        "does a certain amount of damage to a random enemy when the user takes a turn",
    },
    fire: {
      name: "fire",
      type: "offensive",
      target: "enemy",
      shortDesc:
        "Burns the target in a fiery inferno that can leave the foe burnt",
      hpDamage: 12,
      damageRange: 3,
      mpCost: 4,
      speed: "medium",
      specialEffects: "has a chance to burn the enemy",
    },
    heal: {
      name: "heal",
      type: "support",
      target: "friendly",
      shortDesc: `Heal's target for a small amount`,
      hpHeal: 12,
      mpCost: 4,
      speed: "medium",
    },
    lightning: {
      name: "lightning",
      type: "offensive",
      target: "enemy",
      shortDesc: "Calls nature's galvanizing fury down upon an enemy.",
      hpDamage: 8,
      damageRange: 7,
      mpCost: 4,
      speed: "medium",
      specialEffects:
        "hits other enemies for less damage, every enemy hit has to make a save or have their initiative lowered, the amount of initiative lowered and difficulty of check is based on amount of damage taken",
    },
    slow: {
      name: "slow",
      type: "offensive",
      target: "enemy",
      shortDesc: "Lowers an enemy's speed by a small amount",
      mpCost: 4,
      speed: "medium",
      specialEffects: "slow",
    },
  },

  masterItemList: {
    equipment: {
      weapons: {
        bareHands: {
          name: "bare hands",
          type: "melee",
          weight: "light",
          hands: 2,
          desc: "A hardy pair of fists, although it's hard to cause as much damage without a weapon some prefer to fight without one as it leaves them unecumbered to more easily dodge enemy attacks.",
          attack: 6,
          damage: 3,
          dmgRange: 2,
          evasion: 3,
          specialEffects: ["raises evasion slightly"],
        },
        ironDagger: {
          name: "iron dagger",
          type: "melee",
          weight: "light",
          hands: 1,
          desc: "A dagger that was made for skinning animal carcasses that is now being employed as a weapon of war.",
          attack: 8,
          damage: 5,
          dmgRange: 2,
          critRate: 1.5,
          specialEffects: ["raises rate of critical attacks moderately"],
        },
        oldIronSword: {
          name: "old iron sword",
          type: "melee",
          weight: "medium",
          hands: 1,
          desc: "An old iron sword that's seen better days, although it still maintains an edge.",
          attack: 6,
          damage: 9,
          dmgRange: 4,
        },
        rustedBattleAxe: {
          name: "rusted battle axe",
          type: "melee",
          weight: "heavy",
          hands: 2,
          desc: "An axe from an ancient war that hasn't seen maintenance in awhile... It can cause heavy damage and be used defensively although it's awkward weight makes it unwieldy",
          attack: 4,
          damage: 10,
          dmgRange: 3,
          defense: 5,
          specialEffects: ["raises defense slightly"],
        },
        woodenBow: {
          name: "wooden bow",
          type: "range",
          weight: "light",
          hands: 2,
          desc: "A durable wooden bow that unto now had been primarily used in the hunting of wild game.",
          attack: 10,
          damage: 6,
          dmgRange: 5,
          evasion: 3,
          critRate: 1.3,
          specialEffects: [
            "raises evasion slightly",
            "raises crit rate slightly ",
          ],
        },
        woodenStaff: {
          name: "bare hands",
          type: "melee",
          weight: "light",
          hands: 2,
          desc: "A hardy pair of fists, although it's hard to cause as much damage without a weapon some prefer to fight without one as it leaves them unecumbered to more easily dodge enemy attacks.",
          attack: 6,
          damage: 4,
          evasion: 3,
          defense: 3,
          specialEffects: ["raises evasion slightly"],
        },
      },
      helmets: {},
      armor: {
        curedLeatherJerkin: {
          name: "cured leather jerkin",
          type: "armor",
          weight: "heavy",
          desc: "Stiff and difficult to move in, but it can protect its wearer from clawing talons and biting fangs.",
          defense: 5,
          evasion: 3,
          magicDefense: 2,
        },
        quiltedJerkin: {
          name: "quilted jerkin",
          type: "armor",
          weight: "medium",
          desc: "Although a bit uncomfortable and scratchy, this armor provides a moderate amount of protection as well as ease of movement.",
          defense: 3,
          evasion: 4,
          magicDefense: 3,
        },
        travelersRobe: {
          name: "traveler's robe",
          type: "armor",
          weight: "light",
          desc: "A simple traveler's robe meant to protect one from the elements. Has become favored by those gifted with majikal abilities as it allows for the free movement of the limbs required for the arcane motions used to conjure majiks.",
          defense: 1,
          evasion: 5,
          magicDefense: 5,
        },
      },
      shield: {},
      accessories: {},
    },
  },

  masterJobList: {
    hero: {
      name: "hero",
      startingHP: 14,
      startingMP: 6,
      startingStr: 5,
      startingDex: 6,
      startingSpeed: 5,
      startingSta: 4,
      startingInt: 5,
      startingLuck: 7,
      startingEquipment: {
        weapon: "oldIronSword",
        armor: "quiltedJerkin",
        shield: "",
      },
      heaviestEquipment: "medium",
      img: "img/hero.png",
      hasSpells: true,
      hasAbilities: true,
      spells: {
        2: ["heal"],
      },
    },
    thief: {
      name: "thief",
      startingHP: 12,
      startingMP: 8,
      startingStr: 3,
      startingDex: 8,
      startingSpeed: 8,
      startingSta: 3,
      startingInt: 4,
      startingLuck: 8,
      startingEquipment: {
        weapon: "woodenBow",
        armor: "quiltedJerkin",
        shield: "",
      },
      heaviestEquipment: "medium",
      img: "img/thief.png",
      hasSpells: true,
      hasAbilities: true,
      spells: {
        3: ["slow", "fire"],
      },
    },
    warrior: {
      name: "warrior",
      startingHP: 20,
      startingMP: 0,
      startingStr: 9,
      startingDex: 5,
      startingSpeed: 3,
      startingSta: 6,
      startingInt: 2,
      startingLuck: 3,
      startingEquipment: {
        weapon: "rustedBattleAxe",
        armor: "curedLeatherJerkin",
        shield: "",
      },
      heaviestEquipment: "heavy",
      img: "img/warrior.png",
      hasSpells: false,
      hasAbilities: true,
    },
    witch: {
      name: "witch",
      startingHP: 8,
      startingMP: 14,
      startingStr: 1,
      startingDex: 4,
      startingSpeed: 6,
      startingSta: 4,
      startingInt: 10,
      startingLuck: 4,
      startingEquipment: {
        weapon: "woodenStaff",
        armor: "curedLeatherJerkin",
        shield: "",
      },
      heaviestEquipment: "light",
      img: "img/witch.png",
      hasSpells: true,
      hasAbilities: false,
      spells: {
        1: ["fire"],
        2: ["familiar"],
        3: ["lightning", "heal"],
      },
    },
  },

  jobArray: ["hero", "warrior", "thief", "witch"],

  screens: {
    intro: `
            <div class="d-flex justify-content-center align-items-center vh-100">
              <div id="intro-screen" class="container p-1 position-relative">
                  <div id='naming-sprite' class="position-absolute">
                  </div>
                  <div id='intro-div' class="m-2 row center position-absolute top-50 start-50 translate-middle">
                      <div class="col-3 d-flex flex-column">
                        <button type="button" id="start-naming" class="m-2 btn btn-success">Name Your Party</button>
                        <button type="button" id="start-game" class="m-2 btn btn-info">Skip Naming</button>
                      </div>
                  </div>
              </div>
            </div>
        `,

    nameParty: `
                <label for="character-name" id='character-label' class="text-center col-12">Please enter the main hero's name!</label>
                <div id='character-name-div'>
                    <input name='character-name' class="col-3 m-1" id="character-name-input"></input>
                    <div id="radio-div" class="m-1 col-3">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="genderOptions" id="radioHe" value="male" checked>
                            <label class="form-check-label" for="inlineRadio1">He</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="genderOptions" id="radioShe" value="female">
                            <label class="form-check-label" for="inlineRadio2">She</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="genderOptions" id="radioThey" value="non-binary">
                            <label class="form-check-label" for="inlineRadio3">They</label>
                        </div>
                    </div>
                </div>                
                <button type="button" id="name-character" class="col-3 m-1 btn btn-success">Name Yourself</button>
                
            `,

    battle: `
                <div id='combat-screen' class="container p-3">
                    <div id="enemy-area" class="row mt-1 p-1">

                    </div>
                    <div id="combat-log" class="row p-5 text-center">

                    </div>
                    <div id="party" class="row">

                    </div>
                    <div id="commands" class="row mt-3">

                    </div>
                </div>
            `,

    postBattle: `
                <div id="post-combat-screen" class="container p-1 position-relative">
                    <div id='intro-div' class="row center position-absolute top-50 start-50 translate-middle">
                        <button type="button" id="next-combat" class="btn btn-info col-4">Seek Out an Enemy</button>
                    </div>
                </div>
            `,
  },

  script: {
    intro: {
      getName: [
        `Please enter the main hero's name!`,
        `Name your strong, tough friend!`,
        `Name your tricky, deft-handed friend!`,
        `Name your friend with a mysterious presence!`,
      ],
    },
  },
};

module.exports = library;
