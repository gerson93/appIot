import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../services/config.service";
import { dataChart, ip, validationAccess, dataAccess } from "../interface/message.interface";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class httpMethods {
  private data: dataChart
  private validation: validationAccess

  constructor(private http: HttpClient,
    private config: ConfigService) { }

  getDataChart(ipAddress: string) {
    return new Promise<dataChart>((resolve, rejected) => {
      this.http.get<dataChart>('http://' + ipAddress + '/dbRequest',
        { headers: { "Content-Type": "application/json" } })
      .subscribe(
        data => {
          resolve(data)
        }
      )

    })
  }

  getAccess(ipAddress: string, dataAccess: dataAccess) {
    return new Promise<validationAccess>((resolve, rejected) => {
      this.http.post<validationAccess>('http://' + ipAddress + '/access', dataAccess,
        { headers: { "Content-Type": "application/json" } })
        .subscribe(
          validation => resolve(validation),
          error => { console.log(error) }
        )
    }
    )
  }

}
