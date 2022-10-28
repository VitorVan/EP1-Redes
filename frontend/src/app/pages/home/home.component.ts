import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {

    this._homeService.sendSocket();
  }

  goToGame(name: string): void {
    this._router.navigateByUrl(`/game/${name}`);
  }

}
