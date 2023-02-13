import { CardsProps } from '../components/Card'

function keyGen() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export const duplicateArray = <T>(array: T[]): T[] => {
  return array.concat(array)
}

export const sortArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5)
}

export const regenerateCard = (cards: CardsProps[]): CardsProps[] => {
  return cards.map((card) => ({ ...card, id: keyGen() }))
}

export const duplicateRegenateSortArray = (
  cards: CardsProps[],
): CardsProps[] => {
  return sortArray(regenerateCard(duplicateArray(cards)))
}
