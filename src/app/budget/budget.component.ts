import { Component, OnInit } from '@angular/core';
import { expenseList } from '../models/ExpenseList';
import { IncomeList } from '../models/IncomeList';
import { BudgetService } from '../services/budget.service';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  incomeTotal = 0;
  expenseTotal = 0;
  totaldata = 0;
  incomelabeldata : any[] = [];
  incomeamountdata : any[] = [];
  expenselabeldata : any[] = [];
  expenseamountdata : any[] = [];

  constructor(private budgetservice : BudgetService) {
   }

  ngOnInit(): void {
      this.TotalExpense();
      this.TotalIncome();
      this.getTotal();

      this.budgetservice.getAllIncome().subscribe((data:IncomeList[])=>{
        let incomechartdata = data.map(item=> item);
        console.log(incomechartdata);

        if(incomechartdata != null){
          incomechartdata.forEach((element:any) => {
            this.incomelabeldata.push(element.category)
            this.incomeamountdata.push(element.amount)
          });
          this.RanderChart(this.incomelabeldata,this.incomeamountdata);
        }
      });

      this.budgetservice.getAllExpense().subscribe((data:expenseList[])=>{
        let expensechartdata = data.map(item=>item);
        if(expensechartdata != null){
          expensechartdata.forEach((element:any) => {
            this.expenselabeldata.push(element.category)
            this.expenseamountdata.push(element.amount)
          });
          this.expenseRanderChart(this.expenselabeldata,this.expenseamountdata);
        }
      })


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

  RanderChart(incomelabel:any, incomedata:any){
    const myChart = new Chart('incomechart', {
      type: 'line',
      data: {
        labels: incomelabel,
        datasets: [{
          label: 'Income',
          data: incomedata,
          borderWidth: 1,
          borderColor  : '#f39c12'
        }]
      },
      options: {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
    }
      // options: {
        // scales: {
        //   x: {
        //     grid: {
        //       display: false
        //     }
        //   },
        //   y: {
        //     grid: {
        //       display: false
        //     }
        //   }
        // }
      // }
    });
  }

  expenseRanderChart(expenselabel:any, expensedata:any){
    const myChart = new Chart('expensechart', {
      type: 'line',
      data: {
        labels: expenselabel,
        datasets: [{
          label: 'Expense',
          data: expensedata,
          borderWidth: 1,
          borderColor  : '#f39c12'
        }]
      },
      options: {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

}
