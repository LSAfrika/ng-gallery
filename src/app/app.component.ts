import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { UiService } from './services/ui.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lstudiosafrika';

  constructor(public ui:UiService,private api:ApiService){}

}
