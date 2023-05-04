import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, type: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar', 'snackbar-' + type, 'snackbar-center', 'mat-typography'],
      duration: 3000,
    });
  }
}
