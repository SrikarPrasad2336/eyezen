import type { ComponentType } from 'react'
import BubblesGame from './BubblesGame'
import ColorsGame from './ColorsGame'
import FireflyGame from './FireflyGame'
import GardenGame from './GardenGame'
import HiddenGame from './HiddenGame'
import MazeGame from './MazeGame'
import PeripheralGame from './PeripheralGame'
import SchulteGame from './SchulteGame'
import type { GameProps } from './shared'

// Every game, all 8 of them.
export const GAME_COMPONENTS: Record<string, ComponentType<GameProps>> = {
  firefly: FireflyGame,
  garden: GardenGame,
  schulte: SchulteGame,
  peripheral: PeripheralGame,
  colors: ColorsGame,
  bubbles: BubblesGame,
  hidden: HiddenGame,
  maze: MazeGame,
}