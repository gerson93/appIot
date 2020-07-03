import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { httpMethods } from "../services/http-request.service";
import { ChartGenerator } from "../services/chart.service";
import { SocketService } from "../services/socket.service";
import { ip, dataChart } from "../interface/message.interface";
import { UpdateIpService } from "../services/update-Ip.service";

import { Chart } from "chart.js"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;
  private lineChart: Chart;
  private ipAddress: string
  chart$: Observable<dataChart>
  ipAddress$: Observable<ip>
  data: dataChart
  connectState: boolean = false
  onlineState: boolean = false

  constructor(
    private methods: httpMethods,
    private charGen: ChartGenerator,
    private socket: SocketService,
    private update: UpdateIpService
  ) { }

  ngOnInit() {
    this.socket.init()
    this.observablesConfig()
  }


  changeDBConnectStatus(event) {
    console.log(this.ipAddress)
    if (event.detail.checked) {
      this.connectState = true
      this.data = this.methods.getDataChart(this.ipAddress)
      this.charGen.generate(this.lineCanvas, this.data)
    }
    else {
      this.connectState = false
    }
  }

  changeOnlineStatus(event) {
    if (event.detail.checked && this.connectState) { this.onlineState = true }
    else { this.onlineState = false }
  }

  updateChart(data: dataChart) {
    if (this.connectState && this.onlineState) { this.charGen.addDataToChart(data) }
    else { console.log('offline') }
  }

  observablesConfig() {
    this.chart$ = this.socket.getUpdate$()
    this.chart$.subscribe(data => this.updateChart(data))

    this.ipAddress$ = this.update.getUpdateIpAdress$()
    this.ipAddress$.subscribe(data => {
      console.log(this.ipAddress)
      this.ipAddress = data.ip
      console.log(this.ipAddress)
    })
  }
}
