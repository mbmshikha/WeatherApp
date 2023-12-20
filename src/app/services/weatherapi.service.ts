import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private APPID: string;
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.APPID = '2e7e1d8fabd7c153330e11d1f13782d9';
    this.API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  }

  getWeatherData(cityName: string):Observable<any> {
    //https://api.openweathermap.org/data/2.5/weather?q=london&APPID=2e7e1d8fabd7c153330e11d1f13782d9&units=metric
    console.log(
      this.API_URL + cityName + '&APPID=' + this.APPID + '&units=metric'
    );
    //return this.http.get(this.API_URL + cityName + '&APPID=' + this.APPID + '&units=metric').

    return this.http
      .get(this.API_URL + cityName + '&APPID=' + this.APPID + '&units=metric')
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }
}
