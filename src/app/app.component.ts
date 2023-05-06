
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { IOService } from './services/io.service';
import { UiService } from './services/ui.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lstudiosafrika';


  constructor(private ui:UiService,private io:IOService,private auth:AuthService){
this.ui.user()
    // this.router.navigate(['/'])
// if(this.ui.logedinuser !=undefined)
// {
//   console.log('app comp bein called and logged in user is',this.ui.logedinuser);
//   }
    // if(this.ui.logedinuser===undefined){
    //   this.auth.setloginuser()

    // }
    //  if(this.ui.logedinuser!==undefined &&  this.io.socketsetup==false ) {
    //   this.io.setuid()

    // this.io.socketsetup=true
    // }

  }

}
