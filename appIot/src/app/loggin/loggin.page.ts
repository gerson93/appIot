import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../services/config.service";

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.page.html',
  styleUrls: ['./loggin.page.scss'],
})
export class LogginPage implements OnInit {
  user: string
  password: string

  constructor(private config: ConfigService) { }

  ngOnInit() {
  }

  accept(){
    this.config.setLoggin(this.user, this.password)
  }

}
