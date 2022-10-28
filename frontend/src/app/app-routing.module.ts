import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashComponent } from './pages/games/hash/hash.component';
import { SnakeComponent } from './pages/games/snake/snake.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'}, 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'game/hash',
    component: HashComponent
  },
  {
    path: 'game/snake',
    component: SnakeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
