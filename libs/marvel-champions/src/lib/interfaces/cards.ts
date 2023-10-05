export interface ICard {
  code: string;
  pack_code: string;
  pack_name: string;
  card_set_code: string;
  card_set_name: string;
  card_set_type_name_code?: string;
  name: string;
  url: string;
  type_code: string;
  type_name: string;
  text?: string;
  subname?: string;
  imagesrc?;

  attack?;
  attack_cost?;
  attack_text?;
  back_flavor?;
  back_name?;
  back_text?;
  backimagesrc?;
  base_threat?;
  base_threat_fixed?;
  boost?;
  boost_text?;
  cost?;
  deck_limit?;
  double_sided?;
  escalation_threat?;
  escalation_threat_fixed?;
  faction_code?;
  faction_name?;
  flavor?;
  health?;
  health_per_hero?;
  hidden?;
  illustrator?;
  is_unique?;
  linked_card?;
  linked_to_code?;
  linked_to_name?;
  octgn_id?;
  permanent?;
  position?;
  quantity?;
  real_name?;
  real_text?;
  real_traits?;
  resource_energy?;
  resource_mental?;
  resource_physical?;
  resource_wild?;
  scheme?;
  scheme_acceleration?;
  scheme_crisis?;
  scheme_hazard?;
  scheme_text?;
  set_position?;
  spoiler?;
  stage?;
  threat?;
  threat_fixed?;
  thwart?;
  thwart_cost?;
  traits?;
}
