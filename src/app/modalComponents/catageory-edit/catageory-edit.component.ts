import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-catageory-edit',
  templateUrl: './catageory-edit.component.html',
  styleUrls: ['./catageory-edit.component.scss']
})
export class CatageoryEditComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @Input() editCategoryObj: any;
  categoryForm : FormGroup = new FormGroup({
    categoryname: new FormControl('', Validators.required)
  });

  categoryObj = {
    id:"",
    code:"",
    description:""
  }

  constructor(private _modal: DialogService) { }

  ngOnInit(): void {
    this.categoryObj.id = this.editCategoryObj.id
    this.categoryObj.description = this.editCategoryObj.description
  }
  handleCancel(){
    this._modal.hide();
  }

  handleSubmit(){
    this.formSubmitted.emit(this.categoryObj);
  }
}
