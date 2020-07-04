import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import { Subject, Observable } from 'rxjs';
import { dataChart, ip } from "../interface/message.interface";
import { ConfigService } from "../services/config.service";

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private dataChart: dataChart
  private update$ = new Subject<dataChart>()

  constructor(private socket: Socket, private config: ConfigService) {
  }

  init(ip:string, name: string) {
    this.socket.disconnect()
    this.socket = new Socket ({url: 'http://' + ip, options: {}})
    this.socket.connect()
    this.socket.on('connect', () => {
      this.socket.emit('identification', { 'id': name })
    })
  }

  updateChart(){
    this.socket.on('updateChart', (event) => {
      this.dataChart = event
      this.update$.next(this.dataChart)
    })
  }

  getUpdate$(): Observable<dataChart> {
    return this.update$.asObservable()
  }
}