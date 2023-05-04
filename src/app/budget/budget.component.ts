import { Component, OnInit } from '@angular/core';
import { expenseList } from '../models/ExpenseList';
import { IncomeList } from '../models/IncomeList';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  incomeTotal = 0;
  expenseTotal = 0;
  totaldata = 0;

  constructor(private budgetservice : BudgetService) {
   }

  ngOnInit(): void {
      this.TotalExpense();
      this.TotalIncome();
      this.getTotal();
  }

  TotalIncome(){
    this.budgetservice.getAllIncome().subscribe((data:IncomeList[])=>{
      let total = data.map(item=> item.amount);
      let incomeTotal = total.reduce((total, income)=>{
        return total += income
      },0)
      this.incomeTotal  = incomeTotal;
      this.getTotal();
    });
  }

  TotalExpense(){
    this.budgetservice.getAllExpense().subscribe((data:expenseList[])=>{
      let total = data.map(item=>item.amount);
      let expenseTotal = total.reduce((total,expense)=>{
        return total+= expense
      },0)
      this.expenseTotal  = expenseTotal;
      this.getTotal();
    })
  }

  getTotal(){
    let TotalData = this.incomeTotal-this.expenseTotal;
    this.totaldata = TotalData
  }

}
