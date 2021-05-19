import { CharacterResult } from './../../services/rmce_api';
import { SystemItemData } from '../item/item-data';

export class CharacterData {
  campaign?: string | undefined;
  worldId!: string;
  age!: number;
  apperance!: number;
  className?: string | undefined;
  experience!: number;
  description?: string | undefined;
  eyeColor?: string | undefined;
  gender!: string;
  hairColor?: string | undefined;
  height?: string | undefined;
  hits1!: number;
  level!: number;
  name?: string | undefined;
  raceName?: string | undefined;
  weight!: number;
  movement: CharacterMovement[] | undefined;
  stats: CharacterStat[] | undefined;
  primarySkills: CharacterDevelopment[] | undefined;
  secondarySkills: CharacterDevelopment[] | undefined;
  topSkills: CharacterDevelopment[] | undefined;
  spells: CharacterSpellList[] | undefined;
  languages: CharacterLanguage[] | undefined;

}

export class CharacterStat {
  potential?: number | undefined;
  racial?: number | undefined;
  roll?: number | undefined;
  abbreviation?: string | undefined;
  statisticName?: string | undefined;
  development!: boolean;
  developmentPoints?: number | undefined;
  powerPoints?: number | undefined;
  bonus?: number | undefined;
  order!: number;
  total?: number | undefined;
}

export class CharacterLanguage{
  language?: string | undefined;
  read!: number;
  speak!: number;
}

export class CharacterSpellList{
  beginLevel?: number | undefined;
  current?: boolean | undefined;
  endLevel?: number | undefined;
  next?: boolean | undefined;
  spellListId?: string | undefined;
  spellListName?: string | undefined;
}
export class CharacterMovement {
  rate?: string | undefined;
  multiplier?: string | undefined;
  base?: string | undefined;
  feet001?: string | undefined;
  feet003?: string | undefined;
  feet005?: string | undefined;
  feet010?: string | undefined;
}

export class CharacterDevelopment  {
  bonus!: number;
  expandable!: boolean;
  experienceCheck!: boolean;
  experienceCheckTwo!: boolean;
  firstRank!: number;
  levelBonus!: number;
  primary!: number;
  ranks!: number;
  ranksAdded!: number;
  secondRank!: number;
  skillId!: string;
  singleRank!: boolean;
  doesNotDegrade!: boolean;
  sortOrder!: number;
  totalBonus!: number;
  categoryId!: string;
  category?: string | undefined;
  skillName?: string | undefined;
  skillDescription?: string | undefined;
  firstStatId?: string | undefined;
  secondStatId?: string | undefined;
  thirdStatId?: string | undefined;
  firstStatName?: string | undefined;
  cost?: string | undefined;
  stats?: string | undefined;
  thirdStatName?: string | undefined;
  secondStatName?: string | undefined;
  firstStatAbbreviation?: string | undefined;
  secondStatAbbreviation?: string | undefined;
  thirdStatAbbreviation?: string | undefined;
  rankBonusTotal!: number;
  levelBonusTotal!: number;
  statBonusTotal!: number;
  similiarRanks!: number;
  similiarReasoning?: string | undefined;
  similiarRanksUsed!: boolean;
}

interface CharBaseData {
  character: CharacterData | undefined;
  characterResult: CharacterResult | undefined;
  rmceId: string | undefined;
  // Schema from template.json
}

interface CharData extends CharBaseData {
  pcOnlyField: string;
  // Schema from template.json
}

interface CharActorData extends Actor.Data<CharData, SystemItemData> {
  type: 'character';
}

interface NpcData extends CharBaseData {
  npcOnlyField: string;

  // Schema from template.json
}

interface NpcActorData extends Actor.Data<NpcData, SystemItemData> {
  type: 'npc';
}

export type SysActorData = CharActorData | NpcActorData;
