import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Subject, Observable } from 'rxjs';
import { ip, dataAccess, saveConfig } from '../interface/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  ipAddress: string
  changeUserDataFlag: boolean
  changeUserDataFlag$ = new Subject<boolean>()

  constructor(private storage: Storage) { }

  flagToggle (){
    console.log('change detected')
    this.changeUserDataFlag = true
    this.changeUserDataFlag$.next(this.changeUserDataFlag)
    this.changeUserDataFlag = false
  }

  setLoggin (user: string, password: string){
    this.storage.set('dataAccess', [user, password])
    this.flagToggle()
  }

  setIp(ip: ip){
    this.storage.set('ip', [ip.ip, ip.ip1, ip.ip2, ip.ip3, ip.ip4, ip.port])
    this.flagToggle()
  }

  setName(name: string){
    this.storage.set('name', name)
    this.flagToggle()
  }

  SaveConfig () {
    let saveConfig: saveConfig
    return new Promise<saveConfig> ((resolve, rejected) => {
      this.storage.get('name').then((name) => {
        return name
      }).then((name) => {
        this.storage.get('ip').then((ip) => {
          return ip
        }).then((ip) => {
          this.storage.get('dataAccess').then((dataAccess) => {
            saveConfig = {
              name: name,
              ipAddress: ip,
              dataAccess: {user: dataAccess[0], password: dataAccess[1]}
            }
            resolve(saveConfig) })
          })
        })
      })      
  }

  watchFlagChanges$(): Observable<boolean>{
    return this.changeUserDataFlag$.asObservable()
  }
}
