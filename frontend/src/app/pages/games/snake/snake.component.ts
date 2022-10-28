import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
const { io } = require("socket.io-client");


interface GameState {
  player: {
    pos: {
      x: number,
      y: number,
    },
    vel: {
      x: number,
      y: number,
    },
    snake: Array<{
      x: number,
      y: number,
    }>
  },
  food: {
    x: number,
    y: number,
  },
  gridsize: number,
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})

export class SnakeComponent implements OnInit {



  // VARIÁVEIS GLOBAIS
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  gameScreen = document.getElementById('gameScreen');

  gameState: GameState = {
    player: {
      pos: {
        x: 3,
        y: 10,
      },
      vel: {
        x: 1,
        y: 0,
      },
      snake: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
    },
    food: {
      x: 7,
      y: 7,
    },
    gridsize: 20,
  }

  socket = io('http://localhost:3000/');

  constructor(

  ) { }

  // FUNÇÃO QUE SERÁ EXECUTADA ASSIM QUE O COMPONENTE FOR CHAMADO
  ngOnInit(): void {
    const res = this.canvas.nativeElement.getContext('2d');
    if (res) {
      this.ctx = res;
    }

    this.socket.on('message', this.handleInit) // isso fica aqui?
    this.socket.on('gameState', this.handleGameState) // isso fica aqui?

    this.canvas.nativeElement.width = this.canvas.nativeElement.height = 600;

    this.ctx.fillStyle = '#15BDAC';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    document.addEventListener('keydown', this.keyPressed);

    this.paintGame(this.gameState);
  }

  paintGame(state: GameState):void {
    this.ctx.fillStyle = '#15BDAC';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    console.log('paint game')
    const food = state.food;
    const gridsize = state.gridsize;
    const sizePerSquare = this.canvas.nativeElement.width / gridsize;

    this.ctx.fillStyle = '#DC3131';
    this.ctx.fillRect(food.x * sizePerSquare, food.y * sizePerSquare, sizePerSquare, sizePerSquare)

    this.paintPlayer(state, sizePerSquare, '#575453');

  }

  handleGameState(receivedGameState: string) {
    const gameState = JSON.parse(receivedGameState);
    console.log(gameState);
    requestAnimationFrame(() => this.paintGame(gameState));
  }

  // Função que loga qual tecla foi pressionada
  keyPressed(event: KeyboardEvent) {
    console.log(event.keyCode)
  }

  paintPlayer(state: GameState, sizePerSquare: number, colour: string) {
    const playerState = state.player;
    const snake = playerState.snake;

    this.ctx.fillStyle = colour;
    for (let cell of snake) {
      this.ctx.fillRect(cell.x * sizePerSquare, cell.y * sizePerSquare, sizePerSquare, sizePerSquare)
    }
  }

  handleInit(msg: Object) {
    console.log(msg);
  }
}
