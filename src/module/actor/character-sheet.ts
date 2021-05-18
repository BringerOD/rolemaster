export class RolemasterCharacterSheet extends ActorSheet {
  // static get defaultOptions() {
  //   return mergeObject(super.defaultOptions, {
  //     classes: ["rolemaster"],
  //     template: "systems/rolemaster/templates/sheets/skill-sheet.hbs",
  //     width: 600,
  //     height: 600,
  //      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
  //   });
  // }

  // static get defaultOptions() {
  //   return {
  //     ...super.defaultOptions,
  //     id: SWADE.diceConfig.id,
  //     title: SWADE.diceConfig.title,
  //     template: 'systems/swade/templates/dice-config.html',
  //     classes: ['swade', 'dice-config', 'dice-so-nice'],
  //     width: 500,
  //     height: 'auto' as const,
  //     resizable: false,
  //     closeOnSubmit: false,
  //     submitOnClose: true,
  //     submitOnChange: true,
  //   };
  // }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      template: 'systems/rolemaster/templates/sheets/character-sheet.hbs',
      classes: ['rolemaster'],
      title: 'Rolemaster Character Sheet',
      width: 800,
      height: 900,
      resizable: true,
      closeOnSubmit: false,
      submitOnClose: true,
      submitOnChange: true,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'default' }],
    };
  }

  // get template() {
  //   const path = "systems/rolemaster/templates/sheets/";
  //   // Return a single sheet for all item types.
  //   return `${path}/character-sheet.hbs`;
  //   // Alternatively, you could use the following return statement to do a
  //   // unique item sheet by type, like `weapon-sheet.html` -->.

  //   // return `${path}/${this.item.data.type}-sheet.html`;

  // }
}
