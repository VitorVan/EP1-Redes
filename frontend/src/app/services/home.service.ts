import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'http';

  constructor(
    private _socket: Socket,
    private _http: HttpClient,
  ) { }

  // post() {
  //   return this._http.
  // }

  sendSocket() {
		this._socket.emit('fetchMovies');
	} 

	// listen event
	onFetchMovies() {
		return this._socket.fromEvent('fetchMovies');
	}

}
