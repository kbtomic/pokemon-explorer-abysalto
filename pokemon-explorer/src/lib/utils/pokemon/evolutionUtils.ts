import { EvolutionDetail } from '@/types';
import { EvolutionTriggerType, EvolutionMethod } from '@/lib/constants/enums';

export const getPokemonIdFromUrl = (url: string): number => {
  return parseInt(url.split('/').slice(-2)[0]);
};

export const getEvolutionTriggers = (details: EvolutionDetail[]): string[] => {
  return details.map(detail => formatEvolutionTrigger(detail));
};

export const formatEvolutionTrigger = (detail: EvolutionDetail): string => {
  const triggers: string[] = [];

  if (detail.min_level) {
    triggers.push(`${EvolutionMethod.LEVEL} ${detail.min_level}`);
  }

  if (detail.item) {
    triggers.push(`${EvolutionMethod.ITEM} ${detail.item.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  }

  if (detail.held_item) {
    triggers.push(`${EvolutionMethod.HELD_ITEM} ${detail.held_item.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  }

  if (detail.known_move) {
    triggers.push(`${EvolutionMethod.KNOWN_MOVE} ${detail.known_move.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  }

  if (detail.known_move_type) {
    triggers.push(`${EvolutionMethod.KNOWN_MOVE} ${detail.known_move_type.name.toUpperCase()} type`);
  }

  if (detail.min_happiness) {
    triggers.push(`${EvolutionMethod.FRIENDSHIP}`);
  }

  if (detail.min_beauty) {
    triggers.push(`${EvolutionMethod.BEAUTY}`);
  }

  if (detail.needs_overworld_rain) {
    triggers.push(`${EvolutionMethod.RAIN}`);
  }

  if (detail.party_species) {
    triggers.push(`${EvolutionMethod.PARTY_SPECIES} ${detail.party_species.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  }

  if (detail.party_type) {
    triggers.push(`${EvolutionMethod.PARTY_TYPE} ${detail.party_type.name.toUpperCase()}`);
  }

  if (detail.relative_physical_stats) {
    triggers.push(`${EvolutionMethod.PHYSICAL_STATS} ${detail.relative_physical_stats > 0 ? 'Attack > Defense' : 'Defense > Attack'}`);
  }

  if (detail.trade_species) {
    triggers.push(`${EvolutionMethod.TRADE_SPECIES} ${detail.trade_species.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  }

  if (detail.turn_upside_down) {
    triggers.push(`${EvolutionMethod.UPSIDE_DOWN}`);
  }

  if (detail.gender) {
    triggers.push(`Gender: ${detail.gender === 1 ? 'Female' : 'Male'}`);
  }

  if (detail.location) {
    triggers.push(`${EvolutionMethod.LOCATION} ${detail.location.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  }

  if (detail.time_of_day) {
    triggers.push(`${EvolutionMethod.TIME_OF_DAY} ${detail.time_of_day}`);
  }

  if (detail.min_affection) {
    triggers.push(`Min affection: ${detail.min_affection}`);
  }

  if (detail.trigger.name === EvolutionTriggerType.TRADE) {
    triggers.push(EvolutionMethod.TRADE);
  }

  return triggers.length > 0 ? triggers.join(', ') : EvolutionMethod.SPECIAL;
};
