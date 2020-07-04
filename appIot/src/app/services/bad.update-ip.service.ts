import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ip } from "../interface/message.interface";

@Injectable({
  providedIn: 'root'
})

export class UpdateIpService {
  private ipAddress$ = new Subject<ip>()

  constructor() { }

  updateIpAddress (ipAddress: ip){
    this.ipAddress$.next(ipAddress)
  }

  getUpdateIpAdress$ (): Observable<ip> {
    return this.ipAddress$.asObservable()
  }
}
