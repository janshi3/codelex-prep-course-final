import { Cell } from "./Cell";
import { Direction } from "./Direction";

export class Snake {
  snakeTail: Cell[];
  snakeHeadCoord: number[];
  snakeHead: Cell;
  tailLength: number;

  currentDirection: Direction;
  newDirrection: Direction;

  constructor() {
    this.snakeTail = [new Cell(0, 0), new Cell(1, 0)]
    this.snakeHeadCoord = [2, 0]
    this.snakeHead = new Cell(2, 0)
    this.tailLength = 2
    this.setHead()

    this.currentDirection = "Right"
    this.newDirrection = "Right"
  }

  setDirection(direction: Direction) {
    // Get keyboard input
    document.addEventListener('keydown', (event) => {
      var key = event.code;

      // Get direction
      switch (key) {
        case "ArrowLeft":
          this.newDirrection = "Left";
          break;
        case "ArrowRight":
          this.newDirrection = "Right";
          break;
        case "ArrowUp":
          this.newDirrection = "Up";
          break;
        case "ArrowDown":
          this.newDirrection = "Down";
      }
    }, false);
  }

  move() {
    // Remove the tail if the snake isn't growing from food
    if (this.snakeTail.length >= this.tailLength) {
      this.snakeTail.shift()
    }

    // Add the last head position to the tail
    this.snakeTail.push(this.snakeHead)

    this.setCurrentDirection()

    // Move the head coordinates
    switch (this.currentDirection) {
      case "Left":
        this.snakeHeadCoord[0] -= 1;
        break;
      case "Right":
        this.snakeHeadCoord[0] += 1;
        break;
      case "Up":
        this.snakeHeadCoord[1] -= 1;
        break;
      case "Down":
        this.snakeHeadCoord[1] += 1;
    }

    this.setHead()
  }

  grow() {
    this.tailLength += 3;
  }

  // Build the head
  setHead(): void {
    this.snakeHead =  new Cell(this.snakeHeadCoord[0], this.snakeHeadCoord[1])
  }

  getHead(): Cell {
    return this.snakeHead;
  }

  // Check if the new direction isn't making a 180° turn
  setCurrentDirection(): void {
    if ((this.currentDirection == "Down" && this.newDirrection == "Up") ||
    (this.currentDirection == "Up" && this.newDirrection == "Down") ||
    (this.currentDirection == "Left" && this.newDirrection == "Right") ||
    (this.currentDirection == "Right" && this.newDirrection == "Left")) {
      null
    } else {
      // Set as current direction if not
      this.currentDirection = this.newDirrection
    }
  }

  getDirection(): Direction {
    return this.currentDirection;
  }

  getTail(): Cell[] {
    return this.snakeTail;
  }

  // Check if head collides with the tail
  isTakenBySnake(cell: Cell): boolean {
    for (let i = 0; i < this.snakeTail.length; i++) {
        if (this.snakeTail[i].x == cell.x && this.snakeTail[i].y == cell.y) {
          return true
        }
    }
    return false
  }
}
