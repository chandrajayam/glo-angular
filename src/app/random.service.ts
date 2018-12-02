import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RandomService { 
  constructor(private http: HttpClient) {
}
/**
 * call node services for saving data into mongoDB.
 */
public getJSON(id,game): Observable<any> {
  const data ={
    _id:id,
    _game:game
  }
  console.log('Service called : ',data)
  return this.http.post("http://localhost:3000/saveChoice",data)
}
}
