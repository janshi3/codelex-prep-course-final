import { Cell } from "./Cell";
import configuration from "../configuration";

// Return random integer in range
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class GameField {
  apples: Cell[]

  constructor() {
    // Generate x apples
    this.apples = []
    for (let i = 0; i < configuration.appleAmount; i++) {
      this.apples.push(this.generateApple())
    }
  }
  /**
   * Called when level completed
   */
  seed(): void {
    // Generate new apples
    this.apples = []
    for (let i = 0; i < configuration.appleAmount; i++) {
      this.apples.push(this.generateApple())
    }
  }

  // Generate apple coordinates
  generateApple(): Cell {
    const cell = new Cell(getRandomInt(0, configuration.nbCellsX-1), getRandomInt(0, configuration.nbCellsY-1))

    // Check if an apple already exists in the generated cell
    for (let i = 0; i < this.apples.length; i++) {
        if (this.apples[i].x == cell.x && this.apples[i].y == cell.y) {
          // Run function again if cell taken
          return this.generateApple()
        }
    }
    return cell
  }

  getApples(): Cell[] {
    return this.apples
  }

  // Check if apple exists in this cell
  isAppleInside(cell: Cell): boolean {
    for (let i = 0; i < this.apples.length; i++) {
      if (this.apples[i].x == cell.x && this.apples[i].y == cell.y) {
        return true
      }
    }
  return false
  }

  // Remove apple located in this cell
  removeApple(cell: Cell): void {
    for (let i = 0; i < this.apples.length; i++) {
      if (this.apples[i].x == cell.x && this.apples[i].y == cell.y) {
        this.apples.splice(i, 1)
        break
      }
    }
  }

  // Check if no more apples exist
  isEmpty(): boolean {
    return this.apples.length === 0
  }
}
