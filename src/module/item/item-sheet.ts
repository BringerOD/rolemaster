export class RolemasterItemSheet extends ItemSheet {
  get template() {
    const path = 'systems/rolemaster/templates/sheets/';
    // Return a single sheet for all item types.
    return `${path}/skill-sheet.hbs`;
    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html` -->.

    // return `${path}/${this.item.data.type}-sheet.html`;
  }
}
