import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { BudgetComponent } from './budget/budget.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { CategoryComponent } from './category/category.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { CatageoryEditComponent } from './modalComponents/catageory-edit/catageory-edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ExpenseEditComponent } from './modalComponents/expense-edit/expense-edit.component';
import { IncomeEditComponent } from './modalComponents/income-edit/income-edit.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    IncomeComponent,
    ExpenseComponent,
    BudgetComponent,
    BottomNavComponent,
    CategoryComponent,
    CatageoryEditComponent,
    ExpenseEditComponent,
    IncomeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
