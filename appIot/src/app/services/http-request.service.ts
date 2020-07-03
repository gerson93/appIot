import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { request, response, dataChart } from "../interface/message.interface";

@Injectable({
  providedIn: 'root'
})

export class httpMethods {
  private goBack: response[] = []
  private data: dataChart
  constructor(private http: HttpClient) { }

  post(request: request): any {
    this.http.post('http://192.168.1.83:8000', request,
      { headers: { "Content-Type": "application/json" } })
      .subscribe((rqst) => {
        this.goBack.push(rqst)
      })
    return this.goBack
  } /* Arreglar esta funcion */

  getDataChart(ipAddress: string): dataChart {
    this.http.get<dataChart>('http://192.168.1.83:8080/dbRequest',
      { headers: { "Content-Type": "application/json" } })
      .subscribe(
        data => {
          this.data = data
        }
      )
    return this.data
  }
}
