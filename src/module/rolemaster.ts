import { RolemasterCharacterSheet } from './actor/character-sheet';
import { RolemasterItemSheet } from './item/item-sheet';
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';

import { BaseActor } from './actor/base-actor';
import { SystemItem } from './item/item';

// Initialize system
Hooks.once('init', async () => {
  console.log('rolemaster | Initializing rolemaster');

  // Assign custom classes and constants here

  // Register custom system settings
  registerSettings();

  CONFIG.Actor.entityClass = BaseActor;
  CONFIG.Item.entityClass = SystemItem;

  // Actors.unregisterSheet("core", ActorSheet);
  // Actors.registerSheet("boilerplate", BoilerplateActorSheet, { makeDefault: true });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('rolemaster', RolemasterItemSheet, { makeDefault: true });

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('rolemaster', RolemasterCharacterSheet, {
    makeDefault: true,
    types: ['character', 'npc'],
  });

  Actors.registerSheet('core', ActorSheet, {
    types: ['other'],
  });

  // Preload Handlebars templates
  await preloadTemplates();

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  // Register custom sheets (if any)
});

// Setup system
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the system is ready
});

// Add any additional hooks if necessary
