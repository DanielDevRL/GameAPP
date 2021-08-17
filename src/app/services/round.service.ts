
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url =environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor(private http:HttpClient) { }

  ListResult(codGame:any):Observable<any>{    
    return this.http.get(base_url+'api/Round/ListResultRount?codGame='+codGame);   
  }

  registerRound(codGame:any,idUser:any,idMovement:any,RoundNumer:any, calc:any):Observable<any>{

    const Round = { IdRound: 0, CodGame:codGame, IdUSer:idUser, IdMovement:idMovement,RoundNumber:RoundNumer };

    console.log(Round);
    
    return this.http.post(base_url+'api/Round/RegisterMovement?calc='+calc,Round);
 
  }
}
