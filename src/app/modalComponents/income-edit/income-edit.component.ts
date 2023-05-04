import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categoriesList } from 'src/app/models/CategoryList';
import { BudgetService } from 'src/app/services/budget.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.scss']
})
export class IncomeEditComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @Input() editIncomeObj: any;
  categoryList : categoriesList[] = [];
  incomeObj = {
    id : '',
    category : 0,
    amount : 0
  }

  incomeForm : FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  constructor(private budgetservice:BudgetService,private _modal: DialogService) { }

  ngOnInit(): void {
    this.getAllCategoryList();
    this.incomeObj.id = this.editIncomeObj.id
    this.incomeObj.amount = this.editIncomeObj.amount
    // console.log(this.incomeObj);
    this.incomeObj.category = this.editIncomeObj.category
  }

  getAllCategoryList(){
    this.budgetservice.getAllCategory().subscribe((data:categoriesList[])=>{
      this.categoryList = data;
    });
  }

  handleCancel(){
    this._modal.hide();
  }

  handleSubmit(){
    this.formSubmitted.emit(this.incomeObj);
  }

}
