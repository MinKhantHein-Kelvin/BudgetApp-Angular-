import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { expenseList } from '../models/ExpenseList';
import { IncomeList } from '../models/IncomeList';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  // private baseUrl = 'http://localhost:3001'
  private baseUrl = 'https://giant-pink-goat.cyclic.app'

  constructor(private http : HttpClient) { }

  getAllCategory():Observable<any>{
    return this.http.get<any>(this.baseUrl + "/category")
  }

  addNewCategory(categorydata:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + "/category", categorydata)
  }

  deleteCategory(id:any){
    return this.http.delete<any>(this.baseUrl + "/category/" +id)
  }

  getAllExpense():Observable<expenseList[]>{
    return this.http.get<expenseList[]>(this.baseUrl + "/expense")
  }

  addNewExpense(expensedata:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + "/expense", expensedata)
  }

  deleteExpense(id:any){
    return this.http.delete<any>(this.baseUrl + "/expense/" +id)
  }

  getAllIncome():Observable<IncomeList[]>{
    return this.http.get<IncomeList[]>(this.baseUrl + "/income")
  }

  addNewIncome(incomedata:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + "/income", incomedata)
  }

  deleteIncome(id:any){
    return this.http.delete<any>(this.baseUrl + "/income/" +id)
  }
}
