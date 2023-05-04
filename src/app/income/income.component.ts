import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IncomeEditComponent } from '../modalComponents/income-edit/income-edit.component';
import { categoriesList } from '../models/CategoryList';
import { IncomeList } from '../models/IncomeList';
import { BudgetService } from '../services/budget.service';
import { DialogService } from '../services/dialog.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  categoryList : categoriesList[] = [];
  incomeList : IncomeList[] = [];
  subs : Subscription[] = []

  incomeObj = {
    id : '',
    category : '',
    amount : 0
  }

  incomeForm : FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  constructor(private budgetservice : BudgetService, private messageService : MessageService, private _modal: DialogService) { }

  ngOnInit(): void {
    this.getAllCategoryList();
    this.getAllIncomeList();
  }

  getAllCategoryList(){
    this.budgetservice.getAllCategory().subscribe((data:categoriesList[])=>{
      this.categoryList = data;
    });
  }

  getAllIncomeList(){
    this.budgetservice.getAllIncome().subscribe((data:IncomeList[])=>{
      console.log(data);
      this.incomeList = data;

    })
  }

  saveIncome(){
    this.budgetservice.addNewIncome(this.incomeObj).subscribe(data=>{
      if(data.statuscode == 200){
        this.incomeForm.reset();
        this.getAllIncomeList();
        this.messageService.openSnackBar(data.message,'');
      }else{
        this.messageService.openSnackBar(data.message,'');
      }
    })
  }

  deleteIncome(id:any){
    this.budgetservice.deleteIncome(id).subscribe(data=>{
      // console.log(data);
      if(data.statuscode == 200){
        this.getAllIncomeList();
        this.messageService.openSnackBar(data.message,'');
      }else{
        this.messageService.openSnackBar(data.message,'');
      }

    })
  }

  editIncome(obj:any){
    const formSubmitted = new EventEmitter();
    const initialState = {
      formSubmitted,
      editIncomeObj: obj
    };
    this._modal.show(IncomeEditComponent, { class: "incomeEditClass modal-sm", initialState});
    this.subs.push(formSubmitted.subscribe((data: any) => {
      // console.log(data);
      this.budgetservice.addNewIncome(data).subscribe(data=>{
        if(data.statuscode == 200){
          this._modal.hide();
          this.incomeForm.reset();
          this.getAllIncomeList();
          this.messageService.openSnackBar(data.message,'');
        }else{
          this.messageService.openSnackBar(data.message,'');
        }
      })
  }));
  }

}
