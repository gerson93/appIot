import { Component, OnInit } from '@angular/core';
import { ip } from "../interface/message.interface";
import { ConfigService } from "../services/config.service";

@Component({
  selector: 'app-menu', 
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private ip1: number
  private ip2: number
  private ip3: number
  private ip4: number
  private port: number
  private ipAddress: ip
  private nameClient: string
  constructor(private config: ConfigService) { }

  ngOnInit() {
  }

  accept() {
    this.ipAddress = {
      ip1: this.ip1,
      ip2: this.ip2,
      ip3: this.ip3,
      ip4: this.ip4,
      port: this.port,
      ip: this.ip1.toString() + "." + this.ip2.toString() + "." + this.ip3.toString() + "." +
        this.ip4.toString() + ":" + this.port.toString()
    }
    this.config.setName(this.nameClient)
    this.config.setIp(this.ipAddress)
  }

}
