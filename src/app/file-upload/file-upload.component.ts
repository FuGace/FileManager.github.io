import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { TableService } from '../table.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  form: FormGroup;

  @Input() parentFolderId: []; 

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private tableService: TableService
  ) {
    this.form = this.fb.group({
      file: [null]
    })
  }

  ngOnInit() { }

  uploadFile(event) { 
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file });
    this.form.get('file').updateValueAndValidity()
  }

  submitForm() {    
    const formData: any = new FormData();
    const requestObj = {
      fileTypeEnum: "FILE",
      parentFolderId: this.parentFolderId[this.parentFolderId.length - 1]
    }
    formData.append("requestObj", JSON.stringify(requestObj));
    formData.append("multipartFile", this.form.get('file').value);
    this.tableService.sendFile(formData)
    console.log(this.form.get('file').value)
  }
}