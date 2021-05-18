import { CharacterResult, AnalyzeSimilarItem, CharacterStatResult } from './../../services/rmce_api';
import { RMCEApiClient } from '../../services/rmce_api';
import { SysActorData, CharacterData, CharacterStat } from './actor-data';
import { SystemItem } from '../item/item';

export class BaseActor extends Actor<SysActorData, SystemItem> {
  async doStuff(): Promise<void> {
    if (this.data.type !== 'character') return;
    console.log(this.data.data.pcOnlyField);
  }

  async prepareData() {
    super.prepareData();

    this.options;
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    const apiClient = new RMCEApiClient();

    if (actorData.data.rmceId) {
      const charData = await apiClient.character_GetCharacterResultById(actorData.data.rmceId);

      // Loaded Character Data
      ui.notifications?.notify(`${charData.result?.content?.name} returned.`);

      if (charData.result && charData.result.content) {
        // Set character data.
        actorData.data.character = new CharacterData();
        actorData.data.characterResult = charData.result.content;

        // set stats
        if (actorData.data.characterResult.stats) this._updateStats(actorData.data.characterResult.stats);

        // set name
        if (charData.result.content?.name) {
          actorData.name = charData.result.content?.name;
        }
      }
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

  getArmorBonus(): number {
    const armor = this.items.find((i) => i.data.type === 'armor');
    if (armor === null || armor.data.type !== 'armor') return 0; // Second condition is to help typescript infer the type on armor.data
    return armor.data.data.reduction;
  }
}
