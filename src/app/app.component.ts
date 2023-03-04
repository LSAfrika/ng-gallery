import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { io } from "socket.io-client";
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lstudiosafrika';

    snapsharebackend='http://localhost:4555'
  socket=io(this.snapsharebackend)
  constructor(private router:Router,private ui:UiService){
this.ui.user()
    // this.router.navigate(['/'])

  }

}
