import { ECardType } from './enums';

export interface ICardTypeDefinition {
  label: string;
  style: string;
}

export const CardTypeDefinitions: Record<ECardType, ICardTypeDefinition> = {
  [ECardType.ALLY]: {
    label: 'Ally',
    style: 'tw-bg-gray-100 tw-text-gray-500',
  },
  [ECardType.ALTER_EGO]: {
    label: 'Alter Ego',
    style: 'tw-bg-blue-100 tw-text-blue-500',
  },
  [ECardType.ATTACHMENT]: {
    label: 'Attachment',
    style: 'tw-bg-gray-100 tw-text-gray-500',
  },
  [ECardType.ENVIRONMENT]: {
    label: 'Environment',
    style: 'tw-bg-gray-100 tw-text-gray-500',
  },
  [ECardType.EVENT]: {
    label: 'Event',
    style: 'tw-bg-gray-100 tw-text-gray-500',
  },
  [ECardType.HERO]: {
    label: 'Hero',
    style: 'tw-bg-blue-100 tw-text-blue-500',
  },
  [ECardType.MAIN_SCHEME]: {
    label: 'Main Scheme',
    style: 'tw-bg-orange-100 tw-text-orange-500',
  },
  [ECardType.MINION]: {
    label: 'Minion',
    style: 'tw-bg-green-100 tw-text-green-500',
  },
  [ECardType.OBLIGATION]: {
    label: 'Obligation',
    style: 'tw-bg-blue-100 tw-text-blue-500',
  },
  [ECardType.PLAYER_SIDE_SCHEME]: {
    label: 'Player Side Scheme',
    style: 'tw-bg-blue-100 tw-text-blue-500',
  },
  [ECardType.RESOURCE]: {
    label: 'Resource',
    style: 'tw-bg-gray-100 tw-text-gray-500',
  },
  [ECardType.SIDE_SCHEME]: {
    label: 'Side Scheme',
    style: 'tw-bg-orange-100 tw-text-orange-500',
  },
  [ECardType.SUPPORT]: {
    label: 'Support',
    style: 'tw-bg-gray-100 tw-text-gray-500',
  },
  [ECardType.TREACHERY]: {
    label: 'Treachery',
    style: 'tw-bg-red-100 tw-text-red-500',
  },
  [ECardType.UPGRADE]: {
    label: 'Upgrade',
    style: 'tw-bg-gray-100 tw-text-gray-500',
  },
  [ECardType.VILLAIN]: {
    label: 'Villain',
    style: 'tw-bg-purple-100 tw-text-purple-500',
  },
};
