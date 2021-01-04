import { Component } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  active: boolean = false;
  loading: boolean = false;

  constructor(private appConfigService: AppConfigService) {

  }

  changeConditions() {
    this.appConfigService.updateConfig();
  }
}
