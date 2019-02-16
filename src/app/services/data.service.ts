import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpClient) { }

  getData(city) {
    return this.httpService.get('https://vast-shore-74260.herokuapp.com/banks?city=' + city);
  }
}

