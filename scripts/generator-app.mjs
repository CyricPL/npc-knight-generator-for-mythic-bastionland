import { KNIGHT_TABLES, AGE_TABLE, ATTRIBUTE_TABLE, MEASURE_TABLE } from "./knight-data.mjs";

/**
 * Roll a die of the given size (e.g. 6 for d6, 12 for d12).
 */
function rollDie(size) {
  return Math.floor(Math.random() * size) + 1;
}

/**
 * Try to generate a name from the system's Name RollTable (spark table).
 * Shows an error notification if the table cannot be found.
 */
async function generateRandomName() {
  const searchedPacks = [];

  // Try to find the system's Name roll table in compendium packs
  for (const pack of game.packs) {
    if (pack.documentName !== "RollTable") continue;
    searchedPacks.push(pack.collection);
    const index = await pack.getIndex();
    for (const entry of index) {
      const nameLower = entry.name.toLowerCase();
      if (nameLower === "name" || nameLower === "names") {
        const table = await pack.getDocument(entry._id);
        if (table) {
          const draw = await table.draw({ displayChat: false });
          if (draw.results.length > 0) {
            return draw.results[0].text;
          }
        }
      }
    }
  }

  // Also check world-level roll tables
  const worldTable = game.tables.find(t => {
    const n = t.name.toLowerCase();
    return n === "name" || n === "names";
  });
  if (worldTable) {
    const draw = await worldTable.draw({ displayChat: false });
    if (draw.results.length > 0) {
      return draw.results[0].text;
    }
  }

  // Report error with diagnostic info
  const worldTables = game.tables.map(t => t.name).join(", ") || "(none)";
  const packList = searchedPacks.join(", ") || "(none)";
  const allPackTables = [];
  for (const pack of game.packs) {
    if (pack.documentName !== "RollTable") continue;
    const index = await pack.getIndex();
    for (const entry of index) {
      allPackTables.push(`${pack.collection}: ${entry.name}`);
    }
  }
  const tableList = allPackTables.length > 0 ? allPackTables.join(", ") : "(none found)";

  ui.notifications.error(
    `NPC Knight Generator: Could not find a RollTable named "Name" or "Names". `
    + `Searched ${searchedPacks.length} compendium pack(s): [${packList}]. `
    + `World tables: [${worldTables}]. `
    + `Available compendium RollTables: [${tableList}].`
  );
  console.error("NPC Knight Generator | Name table not found.", {
    searchedPacks,
    worldTables: game.tables.map(t => t.name),
    allPackTables
  });
  return null;
}

/**
 * Parse a scar instruction string and return the dice roll result(s).
 * Patterns: "None", "Roll 1dN", "Roll 2dN, take the lower/higher", "Roll 2d12, take both"
 * Returns an array of numeric results (empty for "None").
 */
function rollScarDice(scarInstruction) {
  if (!scarInstruction || scarInstruction.toLowerCase() === "none") return [];

  const match = scarInstruction.match(/(\d+)d(\d+)/i);
  if (!match) return [];

  const numDice = parseInt(match[1]);
  const dieSize = parseInt(match[2]);
  const lowerStr = scarInstruction.toLowerCase();

  if (numDice === 1) {
    return [rollDie(dieSize)];
  }

  if (numDice === 2) {
    const a = rollDie(dieSize);
    const b = rollDie(dieSize);
    if (lowerStr.includes("take both")) {
      return [a, b];
    } else if (lowerStr.includes("take the lower")) {
      return [Math.min(a, b)];
    } else if (lowerStr.includes("take the higher")) {
      return [Math.max(a, b)];
    }
    return [a, b];
  }

  // Fallback: roll all dice individually
  const results = [];
  for (let i = 0; i < numDice; i++) results.push(rollDie(dieSize));
  return results;
}

/**
 * Find the Scars RollTable in the system compendium and look up a result by number.
 * Returns { name, description } or null if the table can't be found.
 * If the result links to a compendium document, fetches its description.
 */
async function lookupScar(rollValue) {
  // Search compendium packs for a Scars table
  for (const pack of game.packs) {
    if (pack.documentName !== "RollTable") continue;
    const index = await pack.getIndex();
    for (const entry of index) {
      const nameLower = entry.name.toLowerCase();
      if (nameLower === "scar" || nameLower === "scars") {
        const table = await pack.getDocument(entry._id);
        if (table) {
          const result = table.results.find(r => {
            const range = r.range;
            return rollValue >= range[0] && rollValue <= range[1];
          });
          if (result) {
            return await extractScarData(result);
          }
        }
      }
    }
  }

  // Check world-level tables
  const worldTable = game.tables.find(t => {
    const n = t.name.toLowerCase();
    return n === "scar" || n === "scars";
  });
  if (worldTable) {
    const result = worldTable.results.find(r => {
      const range = r.range;
      return rollValue >= range[0] && rollValue <= range[1];
    });
    if (result) {
      return await extractScarData(result);
    }
  }

  ui.notifications.error(
    `NPC Knight Generator: Could not find a RollTable named "Scar" or "Scars" to look up roll ${rollValue}.`
  );
  return null;
}

/**
 * Extract name and description from a RollTable result.
 * If the result links to a compendium document, fetch its description.
 */
async function extractScarData(result) {
  const name = result.text;
  let description = "";

  // If the result links to a compendium document, try to fetch its description
  if (result.documentCollection && result.documentId) {
    try {
      const pack = game.packs.get(result.documentCollection);
      if (pack) {
        const doc = await pack.getDocument(result.documentId);
        if (doc?.system?.description) {
          description = doc.system.description;
        }
      }
    } catch (e) {
      // Fallback: no linked document description available
    }
  }

  return { name, description };
}

/**
 * Roll scars per the Measure of a Life instruction and look them up on the Scars table.
 * Returns an array of { roll, text } objects.
 */
async function rollScars(scarInstruction) {
  const rolls = rollScarDice(scarInstruction);
  if (rolls.length === 0) return [];

  const scars = [];
  for (const roll of rolls) {
    const data = await lookupScar(roll);
    if (data) {
      scars.push({ roll, text: data.name, description: data.description });
    } else {
      scars.push({ roll, text: `(Scar table lookup failed for roll ${roll})`, description: "" });
    }
  }
  return scars;
}

/**
 * Roll a single Measure of a Life column value based on age.
 * Young: 2d12 take lower, Mature: 1d12, Old: 2d12 take higher.
 */
function rollMeasureColumn(age) {
  if (age === "young") {
    return Math.min(rollDie(12), rollDie(12));
  } else if (age === "old") {
    return Math.max(rollDie(12), rollDie(12));
  }
  return rollDie(12);
}

/**
 * Roll Measure of a Life with independent rolls per column.
 * Returns an object with per-column rolls and looked-up values.
 */
async function rollFullMeasure(age) {
  const columns = ["arms", "armor", "steed", "company", "authority", "scars"];
  const rolls = {};
  const result = {};

  for (const col of columns) {
    const roll = rollMeasureColumn(age);
    rolls[col] = roll;
    result[col] = MEASURE_TABLE[roll][col];
  }

  // Roll scars against the scars table
  const scarResults = await rollScars(result.scars);

  return { rolls, ...result, scarResults };
}

/**
 * Steed type ranking for "one rank better" upgrades.
 * Types outside this ranking (pony, hound, hawk, ox) are not upgraded.
 */
const STEED_RANKS = ["riding", "heavy", "charger"];

/**
 * Parse steed modifications from a Measure of a Life steed description.
 * Returns an object with:
 *   - bonus: { vig, cla, spi, gd } stat bonuses
 *   - rankUp: whether to upgrade the steed one rank
 *   - finest: whether this is "the finest in the Realm" (max all stats)
 */
function parseSteedMeasure(steedText) {
  const result = {
    bonus: { vig: 0, cla: 0, spi: 0, gd: 0 },
    rankUp: false,
    finest: false
  };
  if (!steedText) return result;

  const lower = steedText.toLowerCase();

  // "The finest in the Realm" — max all stats
  if (lower.includes("finest in the realm")) {
    result.finest = true;
    return result;
  }

  // "one rank better" — upgrade steed type
  if (lower.includes("one rank better")) {
    result.rankUp = true;
    return result;
  }

  // Match "+Nd6 STAT" or "+N STAT" for stat bonuses
  const dieMatch = steedText.match(/\+(\d+)d(\d+)\s+(all|VIG|CLA|SPI|GD)/i);
  const flatMatch = steedText.match(/\+(\d+)\s+(all)/i);

  if (dieMatch) {
    const numDice = parseInt(dieMatch[1]);
    const dieSize = parseInt(dieMatch[2]);
    const stat = dieMatch[3].toLowerCase();

    let rollTotal = 0;
    for (let i = 0; i < numDice; i++) rollTotal += rollDie(dieSize);

    if (stat === "all") {
      result.bonus.vig = rollTotal;
      result.bonus.cla = rollTotal;
      result.bonus.spi = rollTotal;
      result.bonus.gd = rollTotal;
    } else if (stat === "vig") {
      result.bonus.vig = rollTotal;
    } else if (stat === "cla") {
      result.bonus.cla = rollTotal;
    } else if (stat === "spi") {
      result.bonus.spi = rollTotal;
    } else if (stat === "gd") {
      result.bonus.gd = rollTotal;
    }
  } else if (flatMatch) {
    const flatVal = parseInt(flatMatch[1]);
    result.bonus.vig = flatVal;
    result.bonus.cla = flatVal;
    result.bonus.spi = flatVal;
    result.bonus.gd = flatVal;
  }

  return result;
}

/**
 * Upgrade a steed type by one rank if possible.
 * riding → heavy → charger. Types outside the ranking are unchanged.
 */
function upgradeSteedRank(type) {
  const idx = STEED_RANKS.indexOf(type.toLowerCase());
  if (idx >= 0 && idx < STEED_RANKS.length - 1) {
    return STEED_RANKS[idx + 1];
  }
  return type; // Can't upgrade or not in ranking
}

/**
 * Application for generating NPC Knights.
 */
export class NPCKnightGeneratorApp extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  static DEFAULT_OPTIONS = {
    id: "npc-knight-generator",
    tag: "form",
    form: {
      handler: NPCKnightGeneratorApp._onSubmit,
      closeOnSubmit: false,
      submitOnChange: false
    },
    window: {
      title: "NPC Knight Generator",
      icon: "fa-solid fa-shield-halved",
      resizable: true
    },
    position: {
      width: 680,
      height: 700
    },
    classes: ["npc-knight-generator"],
    actions: {
      rollKnight: NPCKnightGeneratorApp._onRollKnight,
      createActor: NPCKnightGeneratorApp._onCreateActor,
      rollMeasure: NPCKnightGeneratorApp._onRollMeasure,
      generateName: NPCKnightGeneratorApp._onGenerateName
    }
  };

  static PARTS = {
    form: {
      template: "modules/npc-knight-generator/templates/generator.hbs",
      scrollable: [".nkg-container"]
    }
  };

  /** Currently generated knight result */
  _result = null;

  /** Custom name for the knight (user-entered or randomly generated) */
  _knightName = "";

  /** Current form selections */
  _selections = {
    tableChoice: "random",
    knightChoice: "random",
    ageChoice: "random",
    attrChoice: "random",
    measureChoice: "roll"
  };

  async close(options) {
    await super.close(options);
    this._result = null;
    this._knightName = "";
    this._selections = {
      tableChoice: "random",
      knightChoice: "random",
      ageChoice: "random",
      attrChoice: "random",
      measureChoice: "roll"
    };
  }

  async _prepareContext(options) {
    const tableChoices = { random: "Random (d6)" };
    for (const [key, table] of Object.entries(KNIGHT_TABLES)) {
      tableChoices[key] = `${key}: ${table.name}`;
    }

    const knightChoices = { random: "Random (d12)" };
    for (let i = 1; i <= 12; i++) {
      knightChoices[i] = `${i}`;
    }

    const ageChoices = {
      random: "Random (d6)",
      young: "Young (-1 Glory)",
      mature: "Mature (no change)",
      old: "Old (+3 Glory)"
    };

    const attrChoices = {
      random: "Random (d6)",
      1: "1: Plain (10/10/10, 3 GD)",
      2: "2: Bright (10/7/13, 2 GD)",
      3: "3: Clever (7/13/10, 3 GD)",
      4: "4: Strong (13/10/7, 5 GD)",
      5: "5: Admirable (12/12/12, 4 GD)",
      6: "6: Fearsome (14/14/14, 6 GD)"
    };

    const measureChoices = {
      none: "Don't Roll",
      roll: "Roll (by age)"
    };

    return {
      tableChoices,
      knightChoices,
      ageChoices,
      attrChoices,
      measureChoices,
      selections: this._selections,
      result: this._result,
      knightName: this._knightName,
      knightTables: KNIGHT_TABLES
    };
  }

  /**
   * Handle the "Roll Knight" action button.
   */
  static async _onRollKnight(event, target) {
    // Read form values
    const form = this.element.querySelector("form") ?? this.element;
    const formData = new FormData(form);

    this._selections.tableChoice = formData.get("tableChoice") ?? "random";
    this._selections.knightChoice = formData.get("knightChoice") ?? "random";
    this._selections.ageChoice = formData.get("ageChoice") ?? "random";
    this._selections.attrChoice = formData.get("attrChoice") ?? "random";
    this._selections.measureChoice = formData.get("measureChoice") ?? "none";

    // Sync the name field so manual edits aren't lost on re-render
    const nameInput = this.element.querySelector("input[name='knightName']");
    if (nameInput) this._knightName = nameInput.value;

    // Determine table
    let tableNum;
    if (this._selections.tableChoice === "random") {
      tableNum = rollDie(6);
    } else {
      tableNum = Number(this._selections.tableChoice);
    }

    // Determine knight
    let knightNum;
    if (this._selections.knightChoice === "random") {
      knightNum = rollDie(12);
    } else {
      knightNum = Number(this._selections.knightChoice);
    }

    const table = KNIGHT_TABLES[tableNum];
    let knight = table.knights[knightNum];

    // ── Special Knight Handling ──────────────────────────────────────────

    // Null Knight: "roll again for who is missing or dead"
    // Generate a different knight entirely — that knight is missing or dead
    let nullInfo = null;
    if (knight.title === "Null") {
      nullInfo = { tableNum, knightNum, tableName: table.name };
      // Roll a new knight (re-roll until we don't get Null again)
      let reTableNum, reKnightNum, reKnight;
      do {
        reTableNum = rollDie(6);
        reKnightNum = rollDie(12);
        reKnight = KNIGHT_TABLES[reTableNum].knights[reKnightNum];
      } while (reKnight.title === "Null");
      tableNum = reTableNum;
      knightNum = reKnightNum;
      knight = reKnight;
    }

    // False Knight: "randomly pick a Knight in the realm they are impersonating"
    // Roll a knight to impersonate — False gets their weapons and armor
    let falseInfo = null;
    if (knight.title === "False") {
      let impTableNum, impKnightNum, impKnight;
      do {
        impTableNum = rollDie(6);
        impKnightNum = rollDie(12);
        impKnight = KNIGHT_TABLES[impTableNum].knights[impKnightNum];
      } while (impKnight.title === "False" || impKnight.title === "Null");
      falseInfo = {
        impersonating: impKnight.title,
        impTableNum,
        impKnightNum,
        impTableName: KNIGHT_TABLES[impTableNum].name,
        weapons: impKnight.weapons,
        armor: impKnight.armor
      };
    }

    // Determine age and glory
    // The age roll value IS the base glory, then the age status modifier adjusts it
    let age, glory;
    if (this._selections.ageChoice === "random") {
      const ageRoll = rollDie(6);
      const ageEntry = AGE_TABLE[ageRoll];
      age = ageEntry.age;
      glory = ageRoll + ageEntry.gloryMod;
    } else {
      age = this._selections.ageChoice;
      // When manually selected, use the max possible roll for that age group
      if (age === "young") {
        glory = 3 + (-1); // max young roll is 3, modifier is -1
      } else if (age === "mature") {
        glory = 5 + 0;    // max mature roll is 5, no modifier
      } else {
        glory = 6 + 3;    // old is always roll 6, modifier is +3
      }
    }

    // Determine attributes
    let attrRoll, attrs;
    if (this._selections.attrChoice === "random") {
      attrRoll = rollDie(6);
    } else {
      attrRoll = Number(this._selections.attrChoice);
    }
    attrs = { ...ATTRIBUTE_TABLE[attrRoll] };

    // Apply age modifiers to virtues and GD
    if (age === "mature") {
      attrs.vig += 2;
      attrs.cla += 2;
      attrs.spi += 2;
      attrs.gd += 3;
    } else if (age === "old") {
      attrs.vig -= 1;
      attrs.cla -= 1;
      attrs.spi -= 1;
      attrs.gd += 6;
    }

    // Black Knight special rule
    if (knight.title === "Black") glory = 0;
    glory = Math.max(0, glory);

    // Measure of a Life — roll independently per column
    let measure = null;
    if (this._selections.measureChoice === "roll") {
      measure = await rollFullMeasure(age);
    }

    this._result = {
      tableNum,
      tableName: KNIGHT_TABLES[tableNum].name,
      knightNum,
      title: knight.title,
      fullTitle: `The ${knight.title} Knight`,
      ability: knight.ability,
      weapons: falseInfo ? falseInfo.weapons : knight.weapons,
      armor: falseInfo ? falseInfo.armor : knight.armor,
      steed: knight.steed,
      age,
      glory,
      attrs,
      measure,
      nullInfo,
      falseInfo
    };

    this.render();
  }

  /**
   * Re-roll just the Measure of a Life.
   */
  static async _onRollMeasure(event, target) {
    if (!this._result) return;
    this._result.measure = await rollFullMeasure(this._result.age);
    this.render();
  }

  /**
   * Generate a random name for the knight.
   */
  static async _onGenerateName(event, target) {
    const name = await generateRandomName();
    if (!name) return; // Error already shown by generateRandomName
    this._knightName = name;
    // Update the input field directly without full re-render
    const nameInput = this.element.querySelector("input[name='knightName']");
    if (nameInput) nameInput.value = name;
  }

  /**
   * Create a Foundry Actor from the generated result.
   */
  static async _onCreateActor(event, target) {
    if (!this._result) return;
    const r = this._result;

    // Read the name from the input field
    const nameInput = this.element.querySelector("input[name='knightName']");
    const knightName = nameInput?.value?.trim() || `The ${r.title} Knight`;

    // Build items array
    const items = [];

    // Ability
    items.push({
      name: `${r.fullTitle} Ability`,
      type: "ability",
      system: {
        description: r.ability
      }
    });

    // Weapons
    for (const w of r.weapons) {
      if (w.name === "Empty Hands" || w.name === "As their disguise" || w.name === "Base Equipment") continue;
      if (w.name.includes("Shield") || w.name.includes("shield")) {
        items.push({
          name: w.name,
          type: "shield",
          system: {
            description: w.tags.join(", "),
            armor: 1,
            damage: w.damage,
            equipped: true
          }
        });
      } else {
        const tags = w.tags || [];
        items.push({
          name: w.name,
          type: "weapon",
          system: {
            description: tags.join(", "),
            damage: w.damage,
            hefty: tags.some(t => t.includes("hefty")),
            long: tags.some(t => t.includes("long")),
            slow: tags.some(t => t.includes("slow")),
            equipped: true
          }
        });
      }
    }

    // Armor pieces — parse the description as the authoritative list of armor items.
    // The description format is "A2 (coat, beard)" or "A1 (horned helm)" etc.
    // Each comma-separated name inside the parens becomes an armor item.
    // We determine the Foundry item type by keyword matching against the name.
    const parenMatch = r.armor.description.match(/\(([^)]+)\)/);
    if (parenMatch) {
      const armorNames = parenMatch[1].split(",").map(s => s.trim());
      for (const rawName of armorNames) {
        const lower = rawName.toLowerCase();

        // Skip shields — they're already created from the weapons array
        if (lower.includes("shield")) continue;

        // Determine item type by keyword
        let armorType;
        if (lower.includes("plate")) {
          armorType = "plate";
        } else if (lower.includes("helm") || lower.includes("helmet")) {
          armorType = "helm";
        } else {
          // Everything else is a coat type (coat, mail, gambeson, beard,
          // funeral shroud, thick layer of rust, hood, etc.)
          armorType = "coat";
        }

        const displayName = rawName.replace(/\b\w/g, c => c.toUpperCase());
        items.push({
          name: displayName,
          type: armorType,
          system: {
            description: "",
            armor: 1,
            equipped: true
          }
        });
      }
    }

    // Build biography
    let bio = `<p><strong>The ${r.title} Knight</strong> — ${r.tableName} (Table ${r.tableNum}, #${r.knightNum})</p>`;

    // Null Knight note
    if (r.nullInfo) {
      bio += `<p><em>Originally rolled The Null Knight (${r.nullInfo.tableName}, Table ${r.nullInfo.tableNum}, #${r.nullInfo.knightNum}). `;
      bio += `The ${r.title} Knight is the knight who is <strong>missing or dead</strong>.</em></p>`;
    }

    // False Knight note
    if (r.falseInfo) {
      bio += `<p><em>The False Knight is impersonating <strong>The ${r.falseInfo.impersonating} Knight</strong> `;
      bio += `(${r.falseInfo.impTableName}, Table ${r.falseInfo.impTableNum}, #${r.falseInfo.impKnightNum}). `;
      bio += `Weapons and armor are from the impersonated knight.</em></p>`;
    }

    bio += `<p><strong>Ability:</strong> ${r.ability}</p>`;
    bio += `<p><strong>Armor:</strong> ${r.armor.description}</p>`;
    if (r.steed) {
      bio += `<p><strong>Steed:</strong> ${r.steed.adj} (${r.steed.type})</p>`;
    } else {
      bio += `<p><strong>Steed:</strong> None</p>`;
    }
    bio += `<p><strong>Attributes:</strong> ${r.attrs.label} — VIG ${r.attrs.vig}, CLA ${r.attrs.cla}, SPI ${r.attrs.spi}, GD ${r.attrs.gd}</p>`;

    if (r.measure) {
      const rv = r.measure.rolls;
      bio += `<hr><p><strong>Measure of a Life:</strong></p>`;
      bio += `<ul>`;
      bio += `<li><strong>Arms (${rv.arms}):</strong> ${r.measure.arms}</li>`;
      bio += `<li><strong>Armor (${rv.armor}):</strong> ${r.measure.armor}</li>`;
      bio += `<li><strong>Steed (${rv.steed}):</strong> ${r.measure.steed}</li>`;
      bio += `<li><strong>Company (${rv.company}):</strong> ${r.measure.company}</li>`;
      bio += `<li><strong>Authority (${rv.authority}):</strong> ${r.measure.authority}</li>`;
      bio += `<li><strong>Scars (${rv.scars}):</strong> ${r.measure.scars}`;
      if (r.measure.scarResults && r.measure.scarResults.length > 0) {
        for (const scar of r.measure.scarResults) {
          bio += `<br>&emsp;Roll ${scar.roll}: ${scar.text}`;
        }
      }
      bio += `</li>`;
      bio += `</ul>`;
    }

    // Add scar items if any were rolled
    if (r.measure?.scarResults) {
      for (const scar of r.measure.scarResults) {
        if (scar.text && !scar.text.startsWith("(Scar table")) {
          items.push({
            name: scar.text,
            type: "scar",
            system: {
              description: scar.description ?? ""
            }
          });
        }
      }
    }

    // Create the Knight actor
    const actorData = {
      name: knightName,
      type: "knight",
      system: {
        biography: bio,
        virtues: {
          vigour: { min: 0, max: r.attrs.vig, value: r.attrs.vig },
          clarity: { min: 0, max: r.attrs.cla, value: r.attrs.cla },
          spirit: { min: 0, max: r.attrs.spi, value: r.attrs.spi }
        },
        guard: { min: 0, max: r.attrs.gd, value: r.attrs.gd },
        age: r.age,
        glory: { min: 0, value: r.glory },
        knight: r.nullInfo
          ? `The ${r.title} Knight (Null — missing or dead)`
          : r.falseInfo
            ? `The False Knight (impersonating The ${r.falseInfo.impersonating} Knight)`
            : `The ${r.title} Knight`,
        fatigue: false
      },
      items
    };

    const actor = await Actor.create(actorData);
    ui.notifications.info(`Created Knight: ${actor.name}`);

    // If steed exists, create a separate steed actor
    if (r.steed) {
      // Base steed stats
      let sVig = 10, sCla = 10, sSpi = 10, sGd = 0;
      let steedType = r.steed.type;

      // Apply Measure of a Life steed modifications if rolled
      if (r.measure?.steed) {
        const mods = parseSteedMeasure(r.measure.steed);

        if (mods.finest) {
          // "The finest in the Realm" — set all stats to max (18)
          sVig = 18;
          sCla = 18;
          sSpi = 18;
          sGd = 18;
        } else {
          if (mods.rankUp) {
            steedType = upgradeSteedRank(steedType);
          }
          sVig += mods.bonus.vig;
          sCla += mods.bonus.cla;
          sSpi += mods.bonus.spi;
          sGd += mods.bonus.gd;
        }
      }

      let steedBio = `<p>Steed of ${knightName}. Type: ${steedType}.</p>`;
      if (r.measure?.steed) {
        steedBio += `<p><strong>Measure of a Life:</strong> ${r.measure.steed}</p>`;
      }

      const steedData = {
        name: `${r.steed.adj.charAt(0).toUpperCase() + r.steed.adj.slice(1)} ${steedType.charAt(0).toUpperCase() + steedType.slice(1)}`,
        type: "steed",
        system: {
          biography: steedBio,
          virtues: {
            vigour: { min: 0, max: sVig, value: sVig },
            clarity: { min: 0, max: sCla, value: sCla },
            spirit: { min: 0, max: sSpi, value: sSpi }
          },
          guard: { min: 0, max: sGd, value: sGd },
          trample: ""
        }
      };
      const steed = await Actor.create(steedData);
      ui.notifications.info(`Created Steed: ${steed.name}`);
    }
  }

  /**
   * Form submission handler (unused since we use action buttons).
   */
  static async _onSubmit(event, form, formData) {
    // No-op; actions handle everything
  }
}
