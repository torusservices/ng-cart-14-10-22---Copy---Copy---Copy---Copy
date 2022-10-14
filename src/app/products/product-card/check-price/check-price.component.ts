import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  price: string;
}

@Component({
  selector: 'check-price',
  templateUrl: './check-price.component.html',
})
export class CheckPriceComponent {


  animal: string;
  @Input() price: string;


  constructor(
    public dialog: MatDialog,) {}

 


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '250px',
      data: {
        price: this.price, 
        animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}




@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: './dialog-overview-example-dialog2.html',
  styleUrls: ['./check-price.component.scss'],
})
export class DialogOverviewExampleDialog2 {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}