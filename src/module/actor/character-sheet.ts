import { copyTextAreaToClipBoard } from '../../services/general';

export class RolemasterCharacterSheet extends ActorSheet {
  static get defaultOptions(): any {
    return {
      ...super.defaultOptions,
      template: 'systems/rolemaster/templates/sheets/character-sheet.hbs',
      classes: ['rolemaster'],
      title: 'Rolemaster Character Sheet',
      width: 900,
      height: 900,
      resizable: true,
      closeOnSubmit: false,
      submitOnClose: true,
      submitOnChange: true,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'default' }],
    };
  }

  activateListeners(html: JQuery): void {
    super.activateListeners(html);

    html.find('.rollable').click(this._onRoll.bind(this));
    html.find('.copytoclipboard').click(this._onCopy.bind(this));

    // // Everything below here is only needed if the sheet is editable
    // if (!this.options.editable) return;

    // // Add Inventory Item
    // html.find('.item-create').click(this._onItemCreate.bind(this));

    // // Update Inventory Item
    // html.find('.item-edit').click(ev => {
    //   const li = $(ev.currentTarget).parents(".item");
    //   const item = this.actor.getOwnedItem(li.data("itemId"));
    //   item.sheet.render(true);
    // });

    // // Delete Inventory Item
    // html.find('.item-delete').click(ev => {
    //   const li = $(ev.currentTarget).parents(".item");
    //   this.actor.deleteOwnedItem(li.data("itemId"));
    //   li.slideUp(200, () => this.render(false));
    // });
  }

  _onRoll(event: any) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      const roll = new Roll(dataset.roll, this.actor.data.data);
      const label = dataset.label ? `Rolling ${dataset.label}` : '';

      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
      });
    }
  }

  _onCopy(event: any) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      const label = dataset.label ? `Rolling ${dataset.label}` : '';
      copyTextAreaToClipBoard('/r ' + dataset.roll + '#' + label);
    }
  }
}
