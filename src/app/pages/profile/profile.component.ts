import { UiService } from './../../services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private activeroute:ActivatedRoute,public ui:UiService) {

    const userid=this.activeroute.snapshot.params.id

    console.log(userid);

  }

  ngOnInit(): void {
  }

}
