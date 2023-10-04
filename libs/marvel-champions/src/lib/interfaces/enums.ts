/**
 * Enumeration: Card type
 */
export enum ECardType {
  ALLY = 'ally',
  ALTER_EGO = 'alter_ego',
  ATTACHMENT = 'attachment',
  ENVIRONMENT = 'environment',
  EVENT = 'event',
  HERO = 'hero',
  MAIN_SCHEME = 'main_scheme',
  MINION = 'minion',
  OBLIGATION = 'obligation',
  PLAYER_SIDE_SCHEME = 'player_side_scheme',
  RESOURCE = 'resource',
  SIDE_SCHEME = 'side_scheme',
  SUPPORT = 'support',
  TREACHERY = 'treachery',
  UPGRADE = 'upgrade',
  VILLAIN = 'villain',
}

/**
 * Enumeration: Card faction/class
 */
export enum ECardFaction {
  AGGRESSION = 'aggression',
  BASIC = 'basic',
  CAMPAIGN = 'campaign',
  ENCOUNTER = 'encounter',
  HERO = 'hero',
  JUSTICE = 'justice',
  LEADERSHIP = 'leadership',
  PROTECTION = 'protection',
}

/**
 * Enumeration: Card group (player/encounter)
 */
export enum ECardGroup {
  PLAYER = 'PLAYER',
  ENCOUNTER = 'ENCOUNTER',
  ALL = 'ALL',
}
