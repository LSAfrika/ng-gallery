import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostService } from '../../service/Post.service';
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

  postform:FormData
  captionform: FormGroup;
  namecategory = 'select category';
  captiontext = '';
  uploading=false
  post = 'post';
  // textobservable=of(this.captiontext)
  ngOnInit(): void {
  }

  constructor(public ui: UiService, private postuploader: PostService) {
    // this.instantiatefrom();

    // this.textobservable.subscribe(console.log)

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

  uploadpost(){
    this.postform = new FormData();

    if (this.namecategory === 'namecategory') { return alert('category field can\'t be empty') }
    if ( this.captiontext === '') {this.postform.append('caption', ''); }
    if (this.captiontext !== '') {this.postform.append('caption', this.captiontext); }
    this.postform.append('category', this.namecategory);
    this.filesarray.forEach(image => {

      this.postform.append('photo', image);
    });

    // console.log(this.postform)
    // .pipe(map(res=>console.log(res)))

    this.ui.uploading=true
    this.post='uploading...'
    this.postuploader.Poststatus(this.postform).subscribe(res => {
  console.log(res);

  this.successfulupload()

}
, err => {  console.log(err.message);  console.log(err); });

}


successfulupload(){
  this.ui.uploading=false
  this.post='post'
  this.captiontext=''
  this.postform=new FormData()
  this.filesarray=[]
  this.namecategory='select category'
  alert('upload successful')
  this.ui.openimageuploader=2

}

}
