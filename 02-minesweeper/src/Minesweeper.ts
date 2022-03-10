import { Level } from "./levels";

export class Cell {
  isOpen: boolean = false;
  mines: number = 0;
  isBomb: boolean = false;
  isFlag: boolean = false;
  isUnsure: boolean = false;
}

// Return random integer in range
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Minesweeper {
  private level: Level;
  columns: number
  rows: number
  cells: Cell[][]

  mines: number[]
  minesLeft: number
  time: number

  questionEnabled: boolean

  tense: boolean
  lost: boolean
  won: boolean

  constructor(level: Level) {
    this.level = level;
    this.columns = this.level.columns
    this.rows = this.level.rows
    this.cells = [[]]
    this.mines = []
    this.minesLeft = this.level.mines 
    this.setCells()

    this.time = 0
    this.questionEnabled = true
    this.tense = false
    this.lost = false
    this.won = false
  }

  columnsCount(): number {
    return this.columns;
  }

  // Get a random cell for the mine
  generateMine(): number {
    const cellCount = this.rows * this.columns - 1
    const mineIndex = getRandomInt(0, cellCount)

    // If cell already occupied, get a different one
    if (this.mines.includes(mineIndex)) {
      return this.generateMine()
    }
    return mineIndex
  }

  // Check how many mines are nearby
  countMines(): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let cellMines = 0

        // If top is not a border
        if (i > 0) {
          if (j > 0) {
            // If to the left is not a border
            if (this.cells[i-1][j-1].isBomb) {
              cellMines++
            }
          }
          // Top center
          if (this.cells[i-1][j].isBomb) {
            cellMines++
          }
          // If to the right is not a border
          if (j != this.columns-1) {
            if (this.cells[i-1][j+1].isBomb) {
              cellMines++
            }
          }
        }

        // Left side
        if (j > 0) {
          if (this.cells[i][j-1].isBomb) {
            cellMines++
          }
        }
        // Right side
        if (j != this.columns-1) {
          if (this.cells[i][j+1].isBomb) {
            cellMines++
          }
        }

        // Bottom left
        if (i != this.rows-1) {
          if (j > 0) {
            if (this.cells[i+1][j-1].isBomb) {
              cellMines++
            }
          }
          // Bottom center
          if (this.cells[i+1][j].isBomb) {
            cellMines++
          }
          // Bottom right
          if (j != this.columns-1) {
            if (this.cells[i+1][j+1].isBomb) {
              cellMines++
            }
          }
        }
        // Add mine count to cell
        this.cells[i][j].mines = cellMines
      }
      
    }
  }

  setCells(): void {
    // Generate array of mine indexes
    for (let i = 0; i < this.minesLeft; i++) {
      this.mines.push(this.generateMine())
    }

    let count = 0
    // Create a matrix of cells
    for (let i = 0; i < this.rows; i++) {
      this.cells[i] = []
      for (let j = 0; j < this.columns; j++) {
        const cell = new Cell()
        // If cell is in the mine array, add a mine to it
        if (this.mines.includes(count)) {
          cell.isBomb = true
        }
        this.cells[i].push(cell)
        count++
      }
    }
    // Check nearby mines for all cells
    this.countMines()
  }

  getCells(): Cell[][] {
    return this.cells
  }

  onLeftMouseDown(x: number, y: number) {
    // Tense face if game still going
    if (!this.won && !this.lost) {
      this.tense = true
    }
  }

  onLeftMouseUp(x: number, y: number) {
    this.tense = false
    if (!this.won && !this.lost) {
      // Open cell
      this.cells[x][y].isOpen = true
      // Lose if open a bomb
      if (this.cells[x][y].isBomb) {
        this.lost = true
      }
    }
  }

  onRightMouseUp(x: number, y: number) {
    if (!this.won && !this.lost) {
      // If just blank
      if (!this.cells[x][y].isFlag && !this.cells[x][y].isUnsure) {
        this.cells[x][y].isFlag = true
      }
      // If flag and ? enabled
      else if (this.cells[x][y].isFlag && !this.cells[x][y].isUnsure && this.questionEnabled) {
        this.cells[x][y].isFlag = false
        this.cells[x][y].isUnsure = true
      }
      // If ?
      else if (this.cells[x][y].isUnsure) {
        this.cells[x][y].isUnsure = false
      }
      // If flag and ? disabled
      else if (this.cells[x][y].isFlag && !this.questionEnabled) {
        this.cells[x][y].isFlag = false
      }
    }
  }

  isTense(): boolean {
    return this.tense;
  }

  timePassed(): number {
    return this.time;
  }

  minesLeftCount() {
    return this.minesLeft;
  }

  reset() {
    // Reset all variables
    this.columns = this.level.columns
    this.rows = this.level.rows
    this.cells = [[]]
    this.mines = []
    this.setCells()
    
    this.minesLeft = this.level.mines
    this.time = 0
    this.questionEnabled = true
    this.tense = false
    this.lost = false
    this.won = false
  }

  currentLevel(): Level {
    return this.level;
  }

  selectLevel(level: Level) {
    // Reset level when changing
    this.level = level
    this.reset()
  }

  isLost(): boolean {
    return this.lost;
  }

  isWon(): boolean {
    return this.won;
  }

  isQuestionMarksEnabled(): boolean {
    return this.questionEnabled;
  }

  toggleQuestionMarksEnabled() {
    // Opposite
    this.questionEnabled = !this.questionEnabled
  }
}
