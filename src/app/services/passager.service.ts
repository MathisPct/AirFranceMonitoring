import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Passager, IPassagerDto} from "../models/passager.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PassagerService {

  constructor(private http: HttpClient) { }

  public getPassager(icao : String): Observable<Passager[]>{
    return this.http.get<any>(`https://randomuser.me/api?results=20&inc=name,picture&seed=${icao}`).pipe(
      map((response) => {
        return response.results.map((dto: any) => new Passager(dto));
      })
    );
  }
}
