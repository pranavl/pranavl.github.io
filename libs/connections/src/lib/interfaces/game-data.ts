export interface Card {
  content: string;
  position: number;
}

export interface Category {
  title: string;
  cards: Card[];
}

export interface ConnectionsGameData {
  id: number;
  print_date: string;
  editor: string;
  categories: Category[];
}
