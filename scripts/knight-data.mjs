/**
 * NPC Knight Generator Data Tables
 * Based on "NPC Knights for Mythic Bastionland" by The Crowned Comiserate
 * https://thecrownedcomiserate.blogspot.com/2026/03/npc-knights-for-mythic-bastionland.html
 */

// ─── Knight Tables ──────────────────────────────────────────────────────────

export const KNIGHT_TABLES = {
  1: {
    name: "Dangerous Knights",
    knights: {
      1: {
        title: "Surge",
        ability: "Any steed they ride gains +d6 trample",
        weapons: [{ name: "Lance", damage: "d10", tags: ["long", "hefty if mounted"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "well-trained", type: "charger" }
      },
      2: {
        title: "Bull",
        ability: "If they charge on foot, their horned helmet does 2d6 instead",
        weapons: [
          { name: "Horned Helmet", damage: "d6", tags: [] },
          { name: "Mace", damage: "d8", tags: [] }
        ],
        armor: { value: 1, pieces: ["helm"], description: "A1 (horned helm)" },
        steed: { adj: "docile", type: "ox" }
      },
      3: {
        title: "Axe",
        ability: "Axes refuse to harm them",
        weapons: [{ name: "Greataxe", damage: "2d10", tags: ["slow"] }],
        armor: { value: 1, pieces: ["helm"], description: "A1 (helmet)" },
        steed: { adj: "jealous", type: "heavy" }
      },
      4: {
        title: "Fury",
        ability: "Deals an extra d12 to those that have wounded them",
        weapons: [
          { name: "Handaxe", damage: "d6", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["helm", "shield"], description: "A2 (helm, shield)" },
        steed: { adj: "panting", type: "charger" }
      },
      5: {
        title: "Lone",
        ability: "Has an extra armor, doubles all weapon dice when truly on their own",
        weapons: [{ name: "Mace", damage: "d8", tags: ["hefty"] }],
        armor: { value: 3, pieces: ["plate", "coat"], description: "A2/3* (plate, coat)" },
        steed: null
      },
      6: {
        title: "Black",
        ability: "Has no Glory and can never gain any, hated with or without cause",
        weapons: [{ name: "Greataxe", damage: "2d10", tags: [] }],
        armor: { value: 2, pieces: ["helm", "plate"], description: "A2 (helm, plate)" },
        steed: { adj: "stalwart", type: "charger" }
      },
      7: {
        title: "Diamond",
        ability: "Piercing attacks ignore all Armor",
        weapons: [
          { name: "Spear", damage: "d8", tags: ["hefty"] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["coat", "shield"], description: "A2 (coat, shield)" },
        steed: { adj: "drab", type: "heavy" }
      },
      8: {
        title: "Numb",
        ability: "Is not slowed by Mortal Wounds",
        weapons: [{ name: "Maul", damage: "2d10", tags: ["slow"] }],
        armor: { value: 0, pieces: [], description: "none" },
        steed: { adj: "weary", type: "heavy" }
      },
      9: {
        title: "Venom",
        ability: "Good at discovering your failures, venomous words deal d6 SPI damage when striking home",
        weapons: [{ name: "Poisoned Shortsword", damage: "2d6", tags: ["d6 CLA dam on wound"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "pompous", type: "heavy" }
      },
      10: {
        title: "Certain",
        ability: "When they declare something, nothing stops them from making it true, not even death",
        weapons: [{ name: "Greataxe", damage: "2d10", tags: ["slow"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "resigned", type: "heavy" }
      },
      11: {
        title: "Master",
        ability: "Can command all squires, command Knights with save",
        weapons: [
          { name: "Lance", damage: "d10", tags: ["long", "hefty if mounted"] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["plate", "shield"], description: "A2 (plate, shield)" },
        steed: { adj: "premier", type: "charger" }
      },
      12: {
        title: "Arch",
        ability: "The Knight of Knights, perfect in all ways but one",
        weapons: [
          { name: "Longsword", damage: "2d8", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 4, pieces: ["plate", "helm", "coat", "shield"], description: "A4 (plate, helm, coat, shield)" },
        steed: { adj: "chief", type: "charger" }
      }
    }
  },
  2: {
    name: "Troublesome Knights",
    knights: {
      1: {
        title: "Fool",
        ability: "Makes a mockery of the station; any may kill them; doing so means taking their place",
        weapons: [
          { name: "Pitchfork", damage: "d6", tags: ["hefty"] },
          { name: "Barrel Lid Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 1, pieces: ["helm", "shield"], description: "A1 (bucket helm, shield)" },
        steed: { adj: "flea-infested", type: "pony" }
      },
      2: {
        title: "Flower",
        ability: "Sweet-smelling; under no expectation to quest",
        weapons: [{ name: "A Pen (mightier than a sword)", damage: "d4", tags: [] }],
        armor: { value: 0, pieces: [], description: "fine, pristine clothing" },
        steed: { adj: "pampered", type: "riding" }
      },
      3: {
        title: "False",
        ability: "Unknighted, choose or randomly pick a Knight in the realm they are impersonating",
        weapons: [{ name: "As their disguise", damage: "d6", tags: [] }],
        armor: { value: 1, pieces: [], description: "as their disguise" },
        steed: { adj: "confused", type: "riding" }
      },
      4: {
        title: "Incense",
        ability: "Repels beasts by smell alone",
        weapons: [{ name: "Censer Flail", damage: "d8", tags: ["long"] }],
        armor: { value: 2, pieces: ["coat", "helm"], description: "A2 (coat, helm)" },
        steed: { adj: "snot-dripping", type: "riding" }
      },
      5: {
        title: "Rust",
        ability: "Corrodes all iron and steel with enough contact",
        weapons: [{ name: "Greatclub", damage: "2d10", tags: ["slow"] }],
        armor: { value: 2, pieces: ["coat"], description: "A2 (coat, thick layer of rust)" },
        steed: { adj: "red roan", type: "riding" }
      },
      6: {
        title: "Anchor",
        ability: "Immovable by others so long as they haven't moved themselves",
        weapons: [
          { name: "Spear", damage: "d8", tags: ["hefty"] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["shield", "plate"], description: "A2 (shield, plate)" },
        steed: { adj: "stout", type: "heavy" }
      },
      7: {
        title: "Idle",
        ability: "Recovers all Virtues with a full days rest",
        weapons: [{ name: "Pike", damage: "d10", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "restless", type: "riding" }
      },
      8: {
        title: "Alms",
        ability: "Others always need more than them, but they are loved for it; makes others look worse in comparison",
        weapons: [{ name: "Empty Hands", damage: "d4", tags: [] }],
        armor: { value: 0, pieces: [], description: "shirt on their back" },
        steed: { adj: "gifted", type: "pony" }
      },
      9: {
        title: "Feast",
        ability: "Can make any meal a celebration; pantries mysteriously wind up empty",
        weapons: [{ name: "Poleaxe", damage: "d10", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (tight coat)" },
        steed: { adj: "full", type: "heavy" }
      },
      10: {
        title: "Companion",
        ability: "Never alone; roll another Knight in addition to this one",
        weapons: [
          { name: "Spear", damage: "d8", tags: ["hefty"] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 1, pieces: ["shield"], description: "A1 (shield)" },
        steed: { adj: "over-stimulated", type: "riding" }
      },
      11: {
        title: "Seed",
        ability: "Any seed they plant will grow without fail after a Season",
        weapons: [{ name: "Walking Stick", damage: "d8", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "patient", type: "hawk" }
      },
      12: {
        title: "Heretic",
        ability: "Cannot be silenced; not immune to consequence",
        weapons: [{ name: "Spear", damage: "d8", tags: ["hefty"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "skittish", type: "riding" }
      }
    }
  },
  3: {
    name: "Difficult Knights",
    knights: {
      1: {
        title: "Weasel",
        ability: "Can never be definitely proven to have done anything un-virtuous",
        weapons: [{ name: "Second Dagger", damage: "d6", tags: [] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "accomplice", type: "riding" }
      },
      2: {
        title: "Red",
        ability: "Can focus all attention on themselves",
        weapons: [
          { name: "Axe", damage: "d8", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["coat", "shield"], description: "A2 (coat, shield)" },
        steed: { adj: "braided", type: "heavy" }
      },
      3: {
        title: "Nail",
        ability: "Can pin using nails, only they can remove them",
        weapons: [{ name: "Shortbow", damage: "d6", tags: [] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "lucky", type: "riding" }
      },
      4: {
        title: "Judge",
        ability: "Deal an extra d10 to guilty foes",
        weapons: [{ name: "Spear", damage: "d8", tags: ["hefty"] }],
        armor: { value: 2, pieces: ["coat", "helm"], description: "A2 (coat, helm)" },
        steed: { adj: "guilt-ridden", type: "riding" }
      },
      5: {
        title: "Maggot",
        ability: "Can seek out any rotting flesh in a Hex, immune to consequence of consuming it",
        weapons: [{ name: "Axe", damage: "d8", tags: ["hefty"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "fly-swarmed", type: "heavy" }
      },
      6: {
        title: "Grey",
        ability: "Immune to emotional manipulation of all kinds",
        weapons: [{ name: "Horseman's Pick", damage: "d10", tags: ["long"] }],
        armor: { value: 2, pieces: ["plate", "helm"], description: "A2 (plate, helm)" },
        steed: { adj: "gray", type: "riding" }
      },
      7: {
        title: "Drunken",
        ability: "Accomplished something they'd rather forget, add an additional die for Authority, Company, and Scars; won't survive beyond Old Age",
        weapons: [
          { name: "Mace", damage: "d8", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 1, pieces: ["shield"], description: "A1 (shield)" },
        steed: { adj: "sober", type: "heavy" }
      },
      8: {
        title: "Flint",
        ability: "Punch dagger can strike on stone/metal/etc., start fires",
        weapons: [{ name: "Punch Dagger", damage: "d6", tags: [] }],
        armor: { value: 1, pieces: ["plate"], description: "A1 (plate)" },
        steed: { adj: "singed", type: "heavy" }
      },
      9: {
        title: "Flute",
        ability: "Animals and children are entranced by their instrumental music",
        weapons: [{ name: "Pike", damage: "d10", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "dead-eyed", type: "riding" }
      },
      10: {
        title: "Rime",
        ability: "Can freeze any water with enough time, makes for miserable company for the unprepared",
        weapons: [
          { name: "Axe", damage: "d8", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "thick-coated", type: "heavy" }
      },
      11: {
        title: "Rain",
        ability: "Rain clouds follow them, drowning anywhere they remain too long",
        weapons: [{ name: "Warped Axe", damage: "d8", tags: ["hefty"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (rusty mail)" },
        steed: { adj: "sickly", type: "heavy" }
      },
      12: {
        title: "Friend",
        ability: "Can ask for any service, but must perform any service asked",
        weapons: [{ name: "Shortbow", damage: "d6", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "cheery", type: "riding" }
      }
    }
  },
  4: {
    name: "Mysterious Knights",
    knights: {
      1: {
        title: "Hooded",
        ability: "Unrecognizable while wearing hood",
        weapons: [
          { name: "Handaxe", damage: "d6", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["coat", "shield"], description: "A2 (hood, shield)" },
        steed: { adj: "curious", type: "riding" }
      },
      2: {
        title: "Fish",
        ability: "Can swim freely, even when laden with gear or armor",
        weapons: [{ name: "Trident", damage: "d8", tags: ["hefty"] }],
        armor: { value: 2, pieces: ["coat", "helm"], description: "A2 (coat, helm)" },
        steed: { adj: "dripping", type: "heavy" }
      },
      3: {
        title: "Gentle",
        ability: "Cannot be harmed as long as they carry no arms or armor",
        weapons: [],
        armor: { value: 0, pieces: [], description: "none" },
        steed: { adj: "scarred", type: "charger" }
      },
      4: {
        title: "Unknown",
        ability: "Claims to have been involved in many things, no proof they were ever there",
        weapons: [{ name: "Longbow", damage: "d8", tags: [] }],
        armor: { value: 1, pieces: ["helm"], description: "A1 (battered helm)" },
        steed: { adj: "plain", type: "riding" }
      },
      5: {
        title: "Funeral",
        ability: "Knows proper funeral rites, departed can pass on some Glory",
        weapons: [{ name: "Staff", damage: "d8", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "teary-eyed", type: "riding" }
      },
      6: {
        title: "Swan",
        ability: "Nameless, lacking in love or loyalty",
        weapons: [{ name: "Longsword", damage: "2d8", tags: [] }],
        armor: { value: 2, pieces: ["helm", "plate"], description: "A2 (helm, plate)" },
        steed: { adj: "feathered", type: "riding" }
      },
      7: {
        title: "Toadstool",
        ability: "Of excessively small stature",
        weapons: [{ name: "Tiny Spear", damage: "d4", tags: ["hefty"] }],
        armor: { value: 1, pieces: ["helm"], description: "A1 (thimble helm)" },
        steed: { adj: "humoring", type: "hound" }
      },
      8: {
        title: "Giant",
        ability: "Counts as a Warband",
        weapons: [{ name: "Club", damage: "d6", tags: [] }],
        armor: { value: 0, pieces: [], description: "none" },
        steed: { adj: "monstrous", type: "charger" }
      },
      9: {
        title: "Downy",
        ability: "Unaffected by extreme heat or cold",
        weapons: [{ name: "Billhook", damage: "d10", tags: [] }],
        armor: { value: 2, pieces: ["helm", "coat"], description: "A2 (helm, coat)" },
        steed: { adj: "sweaty", type: "riding" }
      },
      10: {
        title: "Cloud",
        ability: "Is weightless, and can float into the sky, easily blown away by strong winds",
        weapons: [{ name: "Base Equipment", damage: "d6", tags: [] }],
        armor: { value: 0, pieces: [], description: "none" },
        steed: { adj: "cirrus", type: "riding" }
      },
      11: {
        title: "Changeling",
        ability: "Desperate to earn their place in society; preferred treatment by the supernatural",
        weapons: [{ name: "Base Equipment", damage: "d6", tags: [] }],
        armor: { value: 1, pieces: ["helm"], description: "A1 (helm)" },
        steed: { adj: "strange", type: "charger" }
      },
      12: {
        title: "Millennium",
        ability: "Never ages past Mature",
        weapons: [
          { name: "Club", damage: "d6", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 1, pieces: ["shield"], description: "A1 (shield)" },
        steed: { adj: "young", type: "riding" }
      }
    }
  },
  5: {
    name: "Helpful Knights",
    knights: {
      1: {
        title: "Oar",
        ability: "Any boat they are rowing will never capsize",
        weapons: [{ name: "Oar", damage: "d10", tags: ["long"] }],
        armor: { value: 1, pieces: ["helm"], description: "A1 (helm)" },
        steed: { adj: "placid", type: "riding" }
      },
      2: {
        title: "Lantern",
        ability: "Aware of all that touches their lantern light",
        weapons: [{ name: "Lantern Staff", damage: "d8", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "sleepy", type: "heavy" }
      },
      3: {
        title: "Watch",
        ability: "Can keep watch all night without rest",
        weapons: [
          { name: "Spear", damage: "d8", tags: ["hefty"] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["coat", "shield"], description: "A2 (coat, shield)" },
        steed: { adj: "calm", type: "riding" }
      },
      4: {
        title: "Shepherd",
        ability: "Suffers hazards and curses on behalf of those in their care",
        weapons: [
          { name: "Shepherd's Crook", damage: "d8", tags: ["long"] },
          { name: "Sling", damage: "d4", tags: ["hefty"] }
        ],
        armor: { value: 1, pieces: ["coat"], description: "A1 (wool coat)" },
        steed: { adj: "best-friend", type: "hound" }
      },
      5: {
        title: "Bower",
        ability: "Able to make and unmake shelter in forests",
        weapons: [{ name: "Shortbow", damage: "d6", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "small", type: "riding" }
      },
      6: {
        title: "Charge",
        ability: "If a charge in their care would die, they die instead; may only have one charge at a time",
        weapons: [{ name: "Lance", damage: "d10", tags: ["long", "hefty if mounted"] }],
        armor: { value: 2, pieces: ["coat", "plate"], description: "A2 (fresh coat, pristine plate)" },
        steed: { adj: "quick", type: "riding" }
      },
      7: {
        title: "Crossroads",
        ability: "Can get a hint at what lies in one direction of a crossroad once per day",
        weapons: [{ name: "Pike", damage: "d10", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "dusty", type: "riding" }
      },
      8: {
        title: "Letter",
        ability: "Everything they write only the intended recipient can read",
        weapons: [
          { name: "Spear", damage: "d8", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 1, pieces: ["shield"], description: "A1 (shield)" },
        steed: { adj: "proud", type: "pony" }
      },
      9: {
        title: "Bearded",
        ability: "Can shave beard and weave its protections into charm, charm loses power when beard grows back next Season",
        weapons: [{ name: "Bearded Axe", damage: "d10", tags: ["long"] }],
        armor: { value: 2, pieces: ["coat"], description: "A2 (coat, beard)" },
        steed: { adj: "bearded", type: "heavy" }
      },
      10: {
        title: "Bone",
        ability: "Can turn fallen monsters and beasts into arms and armor",
        weapons: [{ name: "Bone Knife", damage: "2d6", tags: [] }],
        armor: { value: 1, pieces: ["helm"], description: "A1 (bone helm)" },
        steed: { adj: "portly", type: "heavy" }
      },
      11: {
        title: "Vault",
        ability: "Can store small items in a box only they can open",
        weapons: [
          { name: "Mace", damage: "d8", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["shield", "coat"], description: "A2 (shield, coat)" },
        steed: { adj: "strapping", type: "heavy" }
      },
      12: {
        title: "Song",
        ability: "Can give +1 Glory to those they deem worthy once per Age",
        weapons: [
          { name: "Shortsword", damage: "2d6", tags: [] },
          { name: "Decorated Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["coat", "shield"], description: "A2 (bright gambeson, shield)" },
        steed: { adj: "well-traveled", type: "riding" }
      }
    }
  },
  6: {
    name: "Ominous Knights",
    knights: {
      1: {
        title: "Fern",
        ability: "Cannot be tracked in the wilderness; capable of a feat of great healing once a year, on the summer solstice",
        weapons: [{ name: "Longbow", damage: "d8", tags: ["slow"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "soft-footed", type: "riding" }
      },
      2: {
        title: "Blind",
        ability: "Sees visions of Myths and can share them; receiving them reduces Clarity: they are no Seer",
        weapons: [{ name: "Staff", damage: "d8", tags: ["long"] }],
        armor: { value: 0, pieces: [], description: "none" },
        steed: { adj: "seeing", type: "hound" }
      },
      3: {
        title: "Dream",
        ability: "Can enter the dreams of others, can talk but not harm",
        weapons: [
          { name: "Club", damage: "d6", tags: [] },
          { name: "Shield", damage: "d4", tags: [] }
        ],
        armor: { value: 2, pieces: ["helm", "shield"], description: "A2 (helm, shield)" },
        steed: { adj: "wide-awake", type: "riding" }
      },
      4: {
        title: "Woe",
        ability: "Can tell whether an Omen will occur next Phase (roll ahead), does not know what it will be",
        weapons: [{ name: "Bell-Ringing Mace", damage: "d8", tags: [] }],
        armor: { value: 1, pieces: ["helm"], description: "A1 (helm)" },
        steed: { adj: "veiled", type: "heavy" }
      },
      5: {
        title: "Mourning",
        ability: "Knows the location of all Ruins, can draw forth answers from them",
        weapons: [{ name: "Billhook", damage: "d10", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "morose", type: "heavy" }
      },
      6: {
        title: "Pale",
        ability: "Serves a greater power than Seers; their presence heralds an Omen; can never truly be killed, only delayed",
        weapons: [{ name: "Inevitability", damage: "d12", tags: [] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (funeral shroud)" },
        steed: { adj: "pale", type: "riding" }
      },
      7: {
        title: "North",
        ability: "Always knows true north; what lies there that calls them so?",
        weapons: [{ name: "Billhook", damage: "d10", tags: ["long"] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (coat)" },
        steed: { adj: "lost", type: "riding" }
      },
      8: {
        title: "Broken",
        ability: "Broken in some way, and for a long time; would be bound to grant boon to any that healed them",
        weapons: [{ name: "Shattered Longsword", damage: "d6", tags: [] }],
        armor: { value: 1, pieces: ["coat"], description: "A1 (rusted mail)" },
        steed: { adj: "still-hopeful", type: "charger" }
      },
      9: {
        title: "Null",
        ability: "The absence of a Knight, roll again for who is missing or dead",
        weapons: [{ name: "A Missing Heirloom", damage: "d4", tags: [] }],
        armor: { value: 0, pieces: [], description: "a single boot" },
        steed: { adj: "lonely", type: "riding" }
      },
      10: {
        title: "Dragon",
        ability: "Forward scout of a much more dangerous Realm; seemingly helpful to this one",
        weapons: [
          { name: "Shortsword", damage: "2d6", tags: [] },
          { name: "Fire Breath", damage: "2d6", tags: ["blast"] }
        ],
        armor: { value: 2, pieces: ["coat", "helm"], description: "A2 (coat, helm)" },
        steed: { adj: "foreign", type: "heavy" }
      },
      11: {
        title: "Radiant",
        ability: "Divinely chosen to reach the City, roll a Myth for them to be undertaking: they will complete it",
        weapons: [{ name: "Gifted Longsword", damage: "2d8", tags: [] }],
        armor: { value: 2, pieces: ["coat", "plate"], description: "A2 (coat, plate)" },
        steed: { adj: "prime", type: "charger" }
      },
      12: {
        title: "Last",
        ability: "Once Knighted, none other shall ever be again",
        weapons: [{ name: "Bestowed Heirloom", damage: "2d8", tags: [] }],
        armor: { value: 0, pieces: [], description: "tear-stained legacy" },
        steed: { adj: "veteran", type: "charger" }
      }
    }
  }
};

// ─── Age Table ────────────────────────────────────────────────────────────────

export const AGE_TABLE = {
  1: { age: "young", gloryMod: -1 },
  2: { age: "young", gloryMod: -1 },
  3: { age: "young", gloryMod: -1 },
  4: { age: "mature", gloryMod: 0 },
  5: { age: "mature", gloryMod: 0 },
  6: { age: "old", gloryMod: 3 }
};

// ─── Attribute Spreads ──────────────────────────────────────────────────────

export const ATTRIBUTE_TABLE = {
  1: { label: "Plain",     vig: 10, cla: 10, spi: 10, gd: 3 },
  2: { label: "Bright",    vig: 10, cla: 7,  spi: 13, gd: 2 },
  3: { label: "Clever",    vig: 7,  cla: 13, spi: 10, gd: 3 },
  4: { label: "Strong",    vig: 13, cla: 10, spi: 7,  gd: 5 },
  5: { label: "Admirable", vig: 12, cla: 12, spi: 12, gd: 4 },
  6: { label: "Fearsome",  vig: 14, cla: 14, spi: 14, gd: 6 }
};

// ─── Measure of a Life Table ────────────────────────────────────────────────

export const MEASURE_TABLE = {
  1: {
    arms: "Nothing more than they were promised",
    armor: "It will have to be enough",
    steed: "Lucky to have one",
    company: "A servant, or a friend",
    authority: "None, regardless of Glory",
    scars: "None"
  },
  2: {
    arms: "Old arms, carefully sharpened and maintained",
    armor: "Scratched, but still good",
    steed: "The same they began with",
    company: "A common beast",
    authority: "Less than they are owed",
    scars: "Roll 1d6"
  },
  3: {
    arms: "An additional common arm",
    armor: "What they have has served so far",
    steed: "A cherished steed",
    company: "A sentry",
    authority: "Only what they've earned",
    scars: "Roll 2d8, take the lower"
  },
  4: {
    arms: "1 uncommon arm, a replacement shield",
    armor: "A better shield",
    steed: "One to replace the lost",
    company: "An archer",
    authority: "Acknowledgement of their effort",
    scars: "Roll 1d8"
  },
  5: {
    arms: "1 uncommon arm",
    armor: "New coat and helm",
    steed: "A superior steed (one rank better)",
    company: "A soldier-at-arms",
    authority: "The expectation of a promising future",
    scars: "Roll 2d8, take the higher"
  },
  6: {
    arms: "1 uncommon arm",
    armor: "Stained coat, dented shield",
    steed: "A hardened steed (+1d6 GD)",
    company: "An uncommon beast",
    authority: "Stewardship of a dwelling",
    scars: "Roll 2d10, take the lower"
  },
  7: {
    arms: "1 uncommon arm",
    armor: "Coat, helm, and shield; missing heraldry",
    steed: "A sharp steed (+1d6 CLA)",
    company: "A squire",
    authority: "A place in the Circle, in name only",
    scars: "Roll 1d10"
  },
  8: {
    arms: "A lance, 1 uncommon, a shield",
    armor: "Coat, shield, helm, plate for jousting",
    steed: "A loyal steed (+1d6 SPI)",
    company: "A promising squire (d6 + 6 for virtues, 6 GD)",
    authority: "A place in the Circle",
    scars: "Roll 2d10, take the higher"
  },
  9: {
    arms: "1 rare arm, 1 uncommon",
    armor: "Patched coat and helm",
    steed: "A strong steed (+1d6 VIG)",
    company: "A sellsword",
    authority: "Tenuous trust (1d6: 1-3 Militia, 4-5 Skirmishers, 6: Mercenaries)",
    scars: "Roll 2d12, take the lower"
  },
  10: {
    arms: "1 rare arm: a symbol of authority",
    armor: "Worn coat, helm, and shield",
    steed: "A fine steed (+1d6 all)",
    company: "A sage",
    authority: "Head of an Order (1d6: 1-3 Mercenaries, 4-5 Riders, 6 Knights)",
    scars: "Roll 1d12"
  },
  11: {
    arms: "1 brand new rare arm",
    armor: "New plate, battered helm and coat",
    steed: "A worthy steed (+6 all)",
    company: "Loyal friends + 1 other",
    authority: "An offer of power",
    scars: "Roll 2d12, take the higher"
  },
  12: {
    arms: "Whatever they might need",
    armor: "Shining plate, helm, and coat",
    steed: "The finest in the Realm",
    company: "An ambitious Circle + Council",
    authority: "Backing for rulership",
    scars: "Roll 2d12, take both"
  }
};
