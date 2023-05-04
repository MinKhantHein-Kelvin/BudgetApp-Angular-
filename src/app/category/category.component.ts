import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CatageoryEditComponent } from '../modalComponents/catageory-edit/catageory-edit.component';
import { categoriesList } from '../models/CategoryList';
import { BudgetService } from '../services/budget.service';
import { DialogService } from '../services/dialog.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList : categoriesList[] = [];
  subs: Subscription[] = [];
  categoryForm : FormGroup = new FormGroup({
    categoryname: new FormControl('', Validators.required)
  });

  categoryObj = {
    id:"",
    code:"",
    description:""
  }

  constructor(private budgetservice: BudgetService, private messageService : MessageService,private _modal: DialogService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(){
    this.budgetservice.getAllCategory().subscribe((data:categoriesList[])=>{
      this.categoryList = data;
    });
  }

  saveCategory(){
    this.budgetservice.addNewCategory(this.categoryObj).subscribe(data=>{
      if(data.statuscode == 200){
        this.categoryForm.reset();
        this.getAllCategory();
        this.messageService.openSnackBar(data.message,'');
      }else{
        this.messageService.openSnackBar(data.message,'');
      }
    })
  }

  deleteCategory(id:any){
    this.budgetservice.deleteCategory(id).subscribe(data=>{
      console.log(data);
      if(data.statuscode == 200){
        this.getAllCategory();
        this.messageService.openSnackBar(data.message,'');
      }else{
        this.messageService.openSnackBar(data.message,'');
      }

    })
  }

  editCategory(obj:any){
    const formSubmitted = new EventEmitter();
    const initialState = {
      formSubmitted,
      editCategoryObj: obj
    };
    this._modal.show(CatageoryEditComponent, { class: "categoryEditClass modal-sm", initialState});
    this.subs.push(formSubmitted.subscribe((data: any) => {
      // console.log(data);
      this.budgetservice.addNewCategory(data).subscribe(data=>{
        if(data.statuscode == 200){
          this._modal.hide();
          this.categoryForm.reset();
          this.getAllCategory();
          this.messageService.openSnackBar(data.message,'');
        }else{
          this.messageService.openSnackBar(data.message,'');
        }
      })
  }));
  }

}
