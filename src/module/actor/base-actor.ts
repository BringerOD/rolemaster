import {
  CharacterResult,
  CharacterStatResult,
  CharacterDevelopmentResult,
  CharacterSpellListResult,
  CharacterMovementRateResult,
  CharacterLanguageResult,
} from './../../services/rmce_api';
import { RMCEApiClient } from '../../services/rmce_api';
import {
  SysActorData,
  CharacterData,
  CharacterStat,
  CharacterDevelopment,
  CharacterSpellList,
  CharacterMovement,
  CharacterLanguage,
} from './actor-data';
import { SystemItem } from '../item/item';

export class BaseActor extends Actor<SysActorData, SystemItem> {
  async doStuff(): Promise<void> {
    if (this.data.type !== 'character') return;
    console.log(this.data.data.pcOnlyField);
  }

  async prepareData(): Promise<void> {
    super.prepareData();

    this.options;
    const actorData = this.data;
    // const data = actorData.data;
    // const flags = actorData.flags;

    const apiClient = new RMCEApiClient();

    if (actorData.data.rmceId) {
      const charData = await apiClient.character_GetCharacterResultById(actorData.data.rmceId);

      // Loaded Character Data
      ui.notifications?.notify(`${charData.result?.content?.name} returned.`);

      if (charData.result && charData.result.content) {
        this._updateGeneral(charData.result.content); // Update General Information

        this._updateDevelopment(charData.result.content); // Update General Information

        actorData.data.characterResult = charData.result.content;

        // set name
        if (charData.result.content?.name) {
          actorData.name = charData.result.content?.name;
        }
      }
    }
  }

  private _updateDevelopment(character: CharacterResult) {
    const actorData = this.data;

    if (!actorData.data.character) return;
    if (!character.developmentData) return;
    if (!character.primarySkills) return;
    if (!character.secondarySkills) return;
    if (!character.topStats) return;

    if (character.stats) this._updateStats(character.stats); // set stats

    if (character.spellLists) this._updateSpells(character.spellLists); // set spellLists

    if (character.movementRates) this._updateMovement(character.movementRates); // set movementRates

    if (character.languages) this._updateLanguage(character.languages); // set languages

    actorData.data.character.primarySkills = this._fillSkillList(character.primarySkills);
    actorData.data.character.secondarySkills = this._fillSkillList(character.secondarySkills);
    actorData.data.character.topSkills = this._fillSkillList(character.topStats);
  }
  private _updateGeneral(character: CharacterResult) {
    const actorData = this.data;

    actorData.data.character = new CharacterData();
    actorData.data.character.age = character.age;
    actorData.data.character.name = character.name;
    actorData.data.character.campaign = character.campaign;
    actorData.data.character.worldId = character.worldId;
    actorData.data.character.apperance = character.apperance;
    actorData.data.character.className = character.className;
    actorData.data.character.experience = character.experience;
    actorData.data.character.description = character.description;
    actorData.data.character.eyeColor = character.eyeColor;
    actorData.data.character.gender = character.gender;
    actorData.data.character.hairColor = character.hairColor;
    actorData.data.character.hits1 = character.hits1;
    actorData.data.character.level = character.level;
    actorData.data.character.weight = character.weight;
  }

  private _updateLanguage(sourceList: CharacterLanguageResult[]) {
    const actorData = this.data;

    if (!actorData.data.character) return;

    actorData.data.character.languages = [];

    for (const item of sourceList) {
      const newitem = {} as CharacterLanguage;

      newitem.language = item.language;
      newitem.read = item.read;
      newitem.speak = item.speak;

      actorData.data.character.languages.push(newitem);
    }
  }

  private _updateMovement(sourceList: CharacterMovementRateResult[]) {
    const actorData = this.data;

    if (!actorData.data.character) return;

    actorData.data.character.movement = [];

    for (const item of sourceList) {
      const newitem = {} as CharacterMovement;

      newitem.base = item.base;
      newitem.feet001 = item.feet001;
      newitem.feet003 = item.feet003;
      newitem.feet005 = item.feet005;
      newitem.feet010 = item.feet010;
      newitem.multiplier = item.multiplier;
      newitem.rate = item.rate;

      actorData.data.character.movement.push(newitem);
    }
  }

  private _updateSpells(sourceList: CharacterSpellListResult[]) {
    const actorData = this.data;

    if (!actorData.data.character) return;

    actorData.data.character.spells = [];

    for (const item of sourceList) {
      const newitem = {} as CharacterSpellList;

      newitem.beginLevel = item.beginLevel;
      newitem.endLevel = item.endLevel;
      newitem.spellListName = item.spellListName;
      newitem.spellListId = item.spellListId;
      newitem.current = item.current;
      newitem.next = item.next;
      actorData.data.character.spells.push(newitem);
    }
  }

  private _updateStats(sourceStats: CharacterStatResult[]) {
    const actorData = this.data;

    if (!actorData.data.character) return;
    actorData.data.character.stats = [];

    sourceStats.sort((a, b) => {
      return a.order - b.order;
    });

    for (const stat of sourceStats) {
      const newStat = {} as CharacterStat;
      newStat.abbreviation = stat.abbreviation;
      newStat.bonus = stat.bonus;
      newStat.development = stat.development;
      newStat.developmentPoints = stat.developmentPoints;
      newStat.order = stat.order;
      newStat.potential = stat.potential;
      newStat.powerPoints = stat.powerPoints;
      newStat.racial = stat.racial;
      newStat.roll = stat.roll;
      newStat.statisticName = stat.abbreviation;
      newStat.total = stat.total;
      actorData.data.character.stats.push(newStat);
    }
  }
  private _fillSkillList(skill: CharacterDevelopmentResult[]): CharacterDevelopment[] {
    const list = [] as CharacterDevelopment[];

    for (const item of skill) {
      const newItem = {} as CharacterDevelopment;

      newItem.expandable = item.expandable;
      newItem.experienceCheck = item.experienceCheck;
      newItem.experienceCheckTwo = item.experienceCheck;
      newItem.firstRank = item.firstRank;
      newItem.primary = item.primary;
      newItem.ranks = item.ranks;
      newItem.ranksAdded = item.ranksAdded;
      newItem.secondRank = item.secondRank;
      newItem.skillId = item.skillId;
      newItem.singleRank = item.singleRank;
      newItem.doesNotDegrade = item.doesNotDegrade;
      newItem.sortOrder = item.sortOrder;

      newItem.categoryId = item.categoryId;
      newItem.category = item.category;
      newItem.skillName = item.skillName;
      newItem.skillDescription = item.skillDescription;
      newItem.firstStatId = item.firstStatId;
      newItem.secondStatId = item.secondStatId;
      newItem.thirdStatId = item.thirdStatId;
      newItem.firstStatName = item.firstStatName;
      newItem.cost = item.cost;
      newItem.stats = item.stats;
      newItem.thirdStatName = item.thirdStatName;
      newItem.secondStatName = item.secondStatName;
      newItem.firstStatAbbreviation = item.firstStatAbbreviation;
      newItem.secondStatAbbreviation = item.secondStatAbbreviation;
      newItem.thirdStatAbbreviation = item.thirdStatAbbreviation;

      newItem.similiarRanks = item.similiarRanks;
      newItem.similiarReasoning = item.similiarReasoning;
      newItem.similiarRanksUsed = item.similiarRanksUsed;

      newItem.levelBonus = parseFloat(item.levelBonus.toFixed());
      newItem.rankBonusTotal = parseFloat(item.rankBonusTotal.toFixed());
      newItem.levelBonusTotal = parseFloat(item.levelBonusTotal.toFixed());
      newItem.statBonusTotal = parseFloat(item.statBonusTotal.toFixed());
      newItem.bonus = parseFloat(item.bonus.toFixed());
      newItem.totalBonus = parseFloat(item.totalBonus.toFixed());

      list.push(newItem);
    }
    return list;
  }
}
