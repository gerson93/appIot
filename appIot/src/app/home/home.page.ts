import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { httpMethods } from "../services/http-request.service";
import { ChartGenerator } from "../services/chart.service";
import { SocketService } from "../services/socket.service";
import { dataChart, dataAccess, validationAccess } from "../interface/message.interface";
import { ConfigService } from "../services/config.service";
import { AlertController } from '@ionic/angular';

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
  private connectDisabled: boolean
  private realTimeDisabled: boolean
  private enableByLoggin: boolean
  private validation: validationAccess
  chart$: Observable<dataChart>
  watchUserDataFlag$: Observable<boolean>
  data: dataChart
  connectState: boolean = false
  onlineState: boolean = false

  constructor(
    private methods: httpMethods,
    private charGen: ChartGenerator,
    private socket: SocketService,
    private config: ConfigService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.observablesConfig()
    this.connectionHandlingError()
  }

  connectionHandlingError(){
    try{
      this.config.SaveConfig().then((saveConfig) => {
        this.methods.getAccess(saveConfig.ipAddress[0], saveConfig.dataAccess).catch((error) =>{
          console.log(error)
        }).then((validation) => {
          this.config.ipAddress = saveConfig.ipAddress[0]
          this.EnableConnection(validation as validationAccess)
        }).then(() => {
          this.socket.init(saveConfig.ipAddress[0], saveConfig.name)
        })
      })
    } catch(error){
      console.log(error)
    }
  }

  EnableConnection(validation: validationAccess) {
    if (validation.access) {
      this.connectDisabled = false
    }
    else {
      this.connectDisabled = true
      this.realTimeDisabled = true
    }
  }

  changeDBConnectStatus(event) {
    if (event.detail.checked) {
      this.connectState = true
      this.realTimeDisabled = false
      this.methods.getDataChart(this.config.ipAddress).then((data) => {
        this.charGen.generate(this.lineCanvas, data)
      })
    }
    else {
      this.connectState = false
      this.realTimeDisabled = true
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
    this.watchUserDataFlag$ = this.config.watchFlagChanges$()
    this.watchUserDataFlag$.subscribe(() => {
      this.connectionHandlingError()
    })
    
  }
}


