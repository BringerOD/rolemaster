interface WeaponData {
  damage: number;
  hands: string;
}

interface WeaponItemData extends Item.Data<WeaponData> {
  type: 'weapon';
}

interface ArmorData {
  reduction: number;
  class: 'light' | 'medium' | 'heavy';
}

interface ArmorItemData extends Item.Data<ArmorData> {
  type: 'armor';
}

export type SystemItemData = WeaponItemData | ArmorItemData;
