import { NPCKnightGeneratorApp } from "./generator-app.mjs";

let generatorApp = null;

Hooks.once("init", () => {
  console.log("NPC Knight Generator | Initializing");

  // Register Handlebars helpers
  Handlebars.registerHelper("eq", function (a, b) {
    return a == b;
  });
  Handlebars.registerHelper("titleCase", function (str) {
    if (!str) return "";
    return String(str).replace(/\b\w/g, c => c.toUpperCase());
  });
  Handlebars.registerHelper("join", function (arr, sep) {
    if (!Array.isArray(arr)) return "";
    return arr.join(typeof sep === "string" ? sep : ", ");
  });
});

Hooks.once("ready", () => {
  console.log("NPC Knight Generator | Ready");
});

/**
 * Add a button to the Actors Directory header for GMs.
 */
Hooks.on("getActorDirectoryEntryContext", () => {});

Hooks.on("renderActorDirectory", (app, html, data) => {
  if (!game.user.isGM) return;

  // For V13 ApplicationV2-based sidebar, html might be an element or jQuery
  const element = html instanceof HTMLElement ? html : html[0] ?? html;

  // Don't add the button if it already exists
  if (element.querySelector(".npc-knight-gen-btn")) return;

  const headerActions = element.querySelector(".header-actions") ?? element.querySelector(".action-buttons");
  if (!headerActions) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("npc-knight-gen-btn");
  btn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> NPC Knight`;
  btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (!generatorApp) {
      generatorApp = new NPCKnightGeneratorApp();
    }
    generatorApp.render(true);
  });

  headerActions.appendChild(btn);
});


