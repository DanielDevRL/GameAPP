
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http:HttpClient) { }

  ListMovement():Observable<any>{
        
    return this.http.get(base_url+'api/Movement/getListMovement');   
  }
}
