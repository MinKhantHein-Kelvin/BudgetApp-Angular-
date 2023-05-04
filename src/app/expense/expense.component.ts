import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExpenseEditComponent } from '../modalComponents/expense-edit/expense-edit.component';
import { categoriesList } from '../models/CategoryList';
import { expenseList } from '../models/ExpenseList';
import { BudgetService } from '../services/budget.service';
import { DialogService } from '../services/dialog.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  categoryList : categoriesList[] = []
  expenseList : expenseList[] = [];
  subs: Subscription[] = [];
  expenseObj = {
    id : '',
    category : '',
    amount : 0
  }

  expenseForm : FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  constructor(private budgetservice:BudgetService, private messageService : MessageService, private _modal: DialogService) { }

  ngOnInit(): void {
    this.getAllCategoryList();
    this.getAllExpenseList();
  }

  getAllCategoryList(){
    this.budgetservice.getAllCategory().subscribe((data:categoriesList[])=>{
      this.categoryList = data;
    });
  }

  getAllExpenseList(){
    this.budgetservice.getAllExpense().subscribe((data:expenseList[])=>{
      // console.log(data);
      this.expenseList = data;

    })
  }

  saveExpense(){
    // if(this.expenseForm.valid){
      this.budgetservice.addNewExpense(this.expenseObj).subscribe(data=>{
        if(data.statuscode == 200){
          this.expenseForm.reset();
          this.getAllExpenseList();
          this.messageService.openSnackBar(data.message,'');
        }else{
          this.messageService.openSnackBar(data.message,'');
        }
      })
    // }
  }

  deleteExpense(id:any){
    this.budgetservice.deleteExpense(id).subscribe(data=>{
      // console.log(data);
      if(data.statuscode == 200){
        this.getAllExpenseList();
        this.messageService.openSnackBar(data.message,'');
      }else{
        this.messageService.openSnackBar(data.message,'');
      }

    })
  }

  editExpense(obj:any){
    const formSubmitted = new EventEmitter();
    const initialState = {
      formSubmitted,
      editExpenseObj: obj
    };
    this._modal.show(ExpenseEditComponent, { class: "expenseEditClass modal-sm", initialState});
    this.subs.push(formSubmitted.subscribe((data: any) => {
      // console.log(data);
      this.budgetservice.addNewExpense(data).subscribe(data=>{
        if(data.statuscode == 200){
          this._modal.hide();
          this.expenseForm.reset();
          this.getAllExpenseList();
          this.messageService.openSnackBar(data.message,'');
        }else{
          this.messageService.openSnackBar(data.message,'');
        }
      })
  }));
  }

}
