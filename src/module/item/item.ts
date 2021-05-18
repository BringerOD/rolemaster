import { SystemItemData } from './item-data';

export class SystemItem extends Item<SystemItemData> {
  doWeaponThing(): void {
    if (this.data.type !== 'weapon') return;
    console.log(this.data.data.damage);
  }
  doArmorThing(): void {
    if (this.data.type !== 'armor') return;
    console.log(this.data.data.reduction);
  }
}
