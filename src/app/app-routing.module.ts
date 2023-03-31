import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { BudgetComponent } from './budget/budget.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {path : '', component : BudgetComponent},
  {path : 'income', component : IncomeComponent},
  {path : 'expense', component : ExpenseComponent},
  {path : 'category', component : CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
