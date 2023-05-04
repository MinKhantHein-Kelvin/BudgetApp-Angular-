import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categoriesList } from 'src/app/models/CategoryList';
import { BudgetService } from 'src/app/services/budget.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @Input() editExpenseObj: any;
  categoryList : categoriesList[] = []
  expenseObj = {
    id : '',
    category : '',
    amount : 0
  }

  expenseForm : FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  constructor(private budgetservice:BudgetService,private _modal: DialogService) { }

  ngOnInit(): void {
    this.getAllCategoryList();
    this.expenseObj.id = this.editExpenseObj.id
    this.expenseObj.amount = this.editExpenseObj.amount
    // console.log(this.expenseObj);
    this.expenseObj.category = this.editExpenseObj.category
    // console.log(this.expenseObj);

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
    this.formSubmitted.emit(this.expenseObj);
  }

}
