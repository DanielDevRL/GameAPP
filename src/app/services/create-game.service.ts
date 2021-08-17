
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url =environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class CreateGameService {
   
  constructor(private http:HttpClient) { }

  createGame(formData:any):Observable<any>{
        
    const USERS = [
      { IdUSer: 0, UserName: formData.Player1 },
      { IdUSer: 0, UserName: formData.Player2 },
     
    ];

    return this.http.post(base_url+'api/User', USERS);   
  }

  resetGame(Player1:any,Player2:any):Observable<any>{
        
    const USERS = [
      { IdUSer: 0, UserName: Player1 },
      { IdUSer: 0, UserName: Player2 },
     
    ];

    return this.http.post(base_url+'api/User', USERS);   
  }

}

