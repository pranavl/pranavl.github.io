export interface IGameConfigurationViewModel {
  gameAreaOptions: {
    type: string;
    value: string;
    label: string;
    icon: string;
  }[];
  cardsInGame: {
    id: string;
    name: string;
    setName: string;
    type: string;
    gameAreaId: string;
    gameAreaLabel: string;
  }[];
}
