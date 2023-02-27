import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private activeroute:ActivatedRoute) {

    const userid=this.activeroute.snapshot.params.id

    console.log(userid);

  }

  ngOnInit(): void {
  }

}
