import { UploaderService } from './../../service/uploader.service';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})
export class ImageuploadComponent implements OnInit {

  filesarray: File[] = [];

  captionform: FormGroup;
  namecategory = 'select category';
  ngOnInit(): void {
  }

  constructor(public ui: UiService, public imageuploader: UploaderService, private fb: FormBuilder) {
    this.instantiatefrom();
   }



  instantiatefrom(){
    this.captionform = this.fb.group({
      caption: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  get _caption(){
    return this.captionform.get('caption');
  }

  fileattachment(event: any){

    // this.filesarray=
    console.log(event.target.files);
    this.filesarray = [...event.target.files, ...this.filesarray];
    console.log(this.filesarray);




  }

  delete(i: number){

    console.log(i);

    if (Array.isArray(this.filesarray)){

      this.filesarray.splice(i, 1);
      return;

    }



    console.log(this.filesarray);



  }

  closemodal(){
    this.ui.toggleimageuploader();

    setTimeout(() => {

      this.filesarray = [];
    }, 2000);
  }

  category(category: any){
    this.namecategory = category.target.value;
    console.log(this.namecategory);

  }

}
