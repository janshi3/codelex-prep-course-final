export type XO = "X" | "O" | "-";

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export class Game {
  currentCells: XO[]
  currentTurn: XO
  gameOver: boolean

  constructor() {
    this.currentCells = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
    this.currentTurn = "X"
    this.gameOver = false
  }

  getCells(): XO[] {
    return this.currentCells;
  }

  getTurn(): XO {
    return this.currentTurn;
  }

  getWinner(): XO {
    // Check if all 3 fields of any win condition are taken by the current player
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      if (this.currentCells[WIN_CONDITIONS[i][0]] == this.currentTurn &&
        this.currentCells[WIN_CONDITIONS[i][1]] == this.currentTurn &&
        this.currentCells[WIN_CONDITIONS[i][2]] == this.currentTurn) {

          // If yes, current player is the winner
          return this.currentTurn
        }
    }
    return "-";
  }

  isTie(): boolean {
    // Check if an empty cell exists
    for (let i = 0; i < this.currentCells.length; i++) {
      if (this.currentCells[i] == "-") {
        return false
      }

      // Check if there's a winner, to prevent a tie when all fields are filled but there's a winner
      if (this.getWinner() == this.currentTurn) {
        return false
      }
    }
    return true;
  }

  onClick(i: number): void {
    // If clicking on an empty cell and the game is not over, fill the cell
    if (this.currentCells[i] == "-" && !this.gameOver) {
      this.currentCells[i] = this.currentTurn

      // Check if the game is over after the player's turn
      if (this.getWinner() == this.currentTurn || this.isTie()) {
        this.gameOver = true
      } else {

        // Switch turns if not over
        this.currentTurn == "X" ? this.currentTurn = "O" : this.currentTurn = "X"
      }
    }
  }

  restart(): void {
    this.currentCells = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
    this.currentTurn = "X"
    this.gameOver = false
  }
}
