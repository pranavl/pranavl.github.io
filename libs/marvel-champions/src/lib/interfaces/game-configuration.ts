export interface IGameAreaOption {
  type: string;
  value: string;
  label: string;
  icon: string;
}

export interface IGameCardConfiguration {
  id: string;
  name: string;
  setName: string;
  type: string;
  gameAreaId: string;
  gameAreaLabel: string;
}

export interface IGameConfigurationViewModel {
  gameAreaOptions: IGameAreaOption[];
  cardsInGame: IGameCardConfiguration[];
}
