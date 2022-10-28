import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() image: string = '';

  constructor() { }

  ngOnInit(): void {
    this.foundImagePath();
  }

  foundImagePath(): void {
    this.image = `../../../assets/${this.image}.png`;
  }

}
