import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import { Subject, Observable, config } from 'rxjs';
import { dataChart, ip } from "../interface/message.interface";

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private dataChart: dataChart
  private update$ = new Subject<dataChart>()

  constructor(private socket: Socket) {
  }

  connectTo(ipAddress: ip){
    console.log('new connection to ' + ipAddress.ip)
    const config: SocketIoConfig = {url: ipAddress.ip, options:{}}
    SocketIoModule.forRoot(config)
  }

  init() {
    this.socket.connect()
    this.socket.on('connect', () => {
      this.socket.emit('identification', { 'id': 'iot1' })
    })
    this.socket.on('connectAccept', (event) => {
      console.log(event)
    })
    this.updateChart()
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