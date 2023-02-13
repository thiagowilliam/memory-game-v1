import { useRef, useState } from 'react'
import { duplicateRegenateSortArray } from '../../utils/card-utils'
import { Card, CardsProps } from '../Card'
import './styles.scss'

export interface GridProps {
  cards: CardsProps[]
}

export function Grid({ cards }: GridProps) {
  const [stateCards, setStateCards] = useState(() => {
    return duplicateRegenateSortArray(cards)
  })

  const [matches, setMacthes] = useState(0)
  const [moves, setMoves] = useState(0)

  const first = useRef<CardsProps | null>(null)
  const second = useRef<CardsProps | null>(null)

  const unflip = useRef(false)

  const handleReset = () => {
    setStateCards(duplicateRegenateSortArray(cards))
    first.current = null
    second.current = null

    unflip.current = false
    setMacthes(0)
    setMoves(0)
  }

  const handleclick = (id: string) => {
    const newStateCards = stateCards.map((card) => {
      //Se o id do cartão não for o id clicado, não faz nada
      if (card.id !== id) return card
      // se o cartão já estiver virado, não faz nada
      if (card.flipped) return card

      //desviro possivel cartas erradas
      if (unflip.current && first.current && second.current) {
        first.current.flipped = false
        second.current.flipped = false

        first.current = null
        second.current = null

        unflip.current = false
      }
      //virar o card
      card.flipped = true

      //configura primeiro e segundo cartão clicados
      if (first.current == null) {
        first.current = card
      } else if (second.current == null) {
        second.current = card
      }

      //se eu tenho os dois cart~oes virados, comparar se são iguais
      if (first.current && second.current) {
        //A pessoa acertou
        if (first.current.back === second.current.back) {
          first.current = null
          second.current = null
          setMacthes((m) => m + 1)
        } else {
          //A pessoa errou
          unflip.current = true
        }

        setMoves((m) => m + 1)
      }

      return card
    })

    setStateCards(newStateCards)
  }
  return (
    <>
      <h1>Memory Game</h1>
      <div>
        Moves: {moves} | Matches: {matches} |{' '}
        <button onClick={() => handleReset()}>Reset</button>
      </div>
      <div className="grid">
        {stateCards.map((card) => {
          return <Card {...card} key={card.id} handleClick={handleclick} />
        })}
      </div>
    </>
  )
}
