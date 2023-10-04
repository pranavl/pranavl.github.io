export interface IBaseCard {
  base_threat_fixed;
  card_set_code;
  card_set_name;
  card_set_type_name_code;
  code;
  deck_limit;
  double_sided;
  escalation_threat_fixed;
  faction_code;
  faction_name;
  health_per_hero;
  hidden;
  illustrator;
  is_unique;
  name;
  octgn_id;
  pack_code;
  pack_name;
  permanent;
  position;
  quantity;
  real_name;
  real_text;
  text;
  threat_fixed;
  type_code;
  type_name;
  url;
}

export interface IHeroCard extends IBaseCard {
  attack;
  deck_options;
  deck_requirements;
  defense;
  flavor;
  hand_size;
  health;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  meta;
  real_traits;
  thwart;
  traits;
}

export interface IAllyCard extends IBaseCard {
  attack;
  attack_cost;
  cost;
  duplicate_of_code;
  duplicate_of_name;
  duplicated_by;
  flavor;
  health;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  real_traits;
  resource_energy;
  resource_mental;
  resource_physical;
  resource_wild;
  set_position;
  spoiler;
  subname;
  thwart;
  thwart_cost;
  traits;
}

export interface IEventCard extends IBaseCard {
  attack;
  attack_cost;
  cost;
  duplicate_of_code;
  duplicate_of_name;
  duplicated_by;
  flavor;
  imagesrc;
  real_traits;
  resource_energy;
  resource_mental;
  resource_physical;
  resource_wild;
  set_position;
  thwart;
  thwart_cost;
  traits;
}

export interface ISupportCard extends IBaseCard {
  cost;
  duplicate_of_code;
  duplicate_of_name;
  duplicated_by;
  flavor;
  imagesrc;
  real_traits;
  resource_energy;
  resource_mental;
  resource_physical;
  resource_wild;
  set_position;
  spoiler;
  traits;
}

export interface IUpgradeCard extends IBaseCard {
  back_name;
  back_text;
  backimagesrc;
  cost;
  duplicate_of_code;
  duplicate_of_name;
  duplicated_by;
  flavor;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  real_traits;
  resource_energy;
  resource_mental;
  resource_physical;
  resource_wild;
  set_position;
  traits;
}

export interface IResourceCard extends IBaseCard {
  duplicate_of_code;
  duplicate_of_name;
  duplicated_by;
  flavor;
  imagesrc;
  real_traits;
  resource_energy;
  resource_mental;
  resource_physical;
  resource_wild;
  set_position;
}

export interface IVillainCard extends IBaseCard {
  attack;
  attack_text;
  base_threat;
  flavor;
  health;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  real_traits;
  scheme;
  scheme_hazard;
  scheme_text;
  set_position;
  spoiler;
  stage;
  traits;
}

export interface IMainSchemeCard extends IBaseCard {
  attack;
  back_flavor;
  back_name;
  back_text;
  backimagesrc;
  base_threat;
  escalation_threat;
  flavor;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  scheme;
  scheme_crisis;
  scheme_hazard;
  set_position;
  spoiler;
  stage;
  threat;
}

export interface IAttachmentCard extends IBaseCard {
  attack;
  attack_text;
  boost;
  boost_text;
  flavor;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  real_traits;
  scheme;
  scheme_text;
  set_position;
  spoiler;
  traits;
}

export interface IMinionCard extends IBaseCard {
  attack;
  attack_text;
  base_threat;
  boost;
  boost_text;
  flavor;
  health;
  imagesrc;
  real_traits;
  scheme;
  scheme_acceleration;
  scheme_text;
  set_position;
  spoiler;
  traits;
}

export interface ITreacheryCard extends IBaseCard {
  boost;
  boost_text;
  flavor;
  imagesrc;
  real_traits;
  set_position;
  spoiler;
  traits;
}

export interface ISideSchemeCard extends IBaseCard {
  base_threat;
  boost;
  boost_text;
  flavor;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  real_traits;
  scheme_acceleration;
  scheme_crisis;
  scheme_hazard;
  set_position;
  spoiler;
  traits;
}

export interface IEnvironmentCard extends IBaseCard {
  back_name;
  back_text;
  backimagesrc;
  flavor;
  imagesrc;
  linked_card;
  linked_to_code;
  linked_to_name;
  real_traits;
  set_position;
  spoiler;
  traits;
}

export interface IObligationCard extends IBaseCard {
  boost;
  flavor;
  imagesrc;
  real_traits;
  set_position;
  spoiler;
  traits;
}

export interface IAlterEgoCard extends IBaseCard {
  hand_size;
  health;
  imagesrc;
  real_traits;
  recover;
  traits;
}

export interface IPlayerSideSchemeCard extends IBaseCard {
  base_threat;
  cost;
  flavor;
  linked_card;
  linked_to_code;
  linked_to_name;
  resource_energy;
  resource_mental;
  resource_physical;
  set_position;
}

export type IAnyCard =
  | IBaseCard
  | IHeroCard
  | IAllyCard
  | IEventCard
  | ISupportCard
  | IUpgradeCard
  | IResourceCard
  | IVillainCard
  | IMainSchemeCard
  | IAttachmentCard
  | IMinionCard
  | ITreacheryCard
  | ISideSchemeCard
  | IEnvironmentCard
  | IObligationCard
  | IAlterEgoCard
  | IPlayerSideSchemeCard;

export type IEncounterCard =
  | IBaseCard
  | IVillainCard
  | IMainSchemeCard
  | IAttachmentCard
  | IMinionCard
  | ITreacheryCard
  | ISideSchemeCard
  | IEnvironmentCard
  | IObligationCard;
