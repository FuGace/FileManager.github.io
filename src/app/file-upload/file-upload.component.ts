import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { TableService } from '../table.service';
import { IdsHelper } from '../app.component';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent {
  form: FormGroup;

  @Input() parentFolderId: IdsHelper;
  @Output() refreshPage = new EventEmitter();  

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private tableService: TableService
  ) {
    this.form = this.fb.group({
      file: [null]
    })
  } 

  uploadFile(event) { 
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file });
    this.form.get('file').updateValueAndValidity()
  }

  submitForm() {  
    const formData: any = new FormData();    
    const requestObj = {
      fileTypeEnum: "FILE",
      parentFolderId : this.parentFolderId.getLastId()
    }
    const blobRequestObj = new Blob([JSON.stringify(requestObj)], {
      type: 'application/json',
    });    
    formData.append("requestObj", blobRequestObj);
    formData.append("multipartFile", this.form.get('file').value);
    this.tableService
      .sendFile(formData)
      .toPromise()
      .then(() => {       
        return this.refreshPage.emit(this.parentFolderId.getLastId()  )
      })
  }
}