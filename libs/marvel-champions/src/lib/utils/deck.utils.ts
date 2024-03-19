export interface ShuffleOptions {
  iterations: number;
  piles: number;
}

export function pileShuffle(
  cards: any[],
  options: ShuffleOptions = { iterations: 5, piles: 5 }
) {
  let array = cards;
  for (let i = 0; i < options.iterations; i++) {
    // Create piles
    const piles = new Map<number, any[]>();
    // Split into piles
    for (let j = 0; j < array.length; j++) {
      const pileIndex = j % options.piles;
      if (!piles.has(pileIndex)) {
        piles.set(pileIndex, []);
      }
      piles[pileIndex].push(array[j]);
    }
    array = [...piles.values()].flat();
  }
  return array;
}

export function randomShuffle(cards: any[]) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
