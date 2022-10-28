import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { SnakeComponent } from './pages/games/snake/snake.component';
import { HashComponent } from './pages/games/hash/hash.component';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomeService } from './services/home.service';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

const config: SocketIoConfig = { url: 'http://localhost:3000' };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameCardComponent,
    SnakeComponent,
    HashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [HttpClient, HomeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
