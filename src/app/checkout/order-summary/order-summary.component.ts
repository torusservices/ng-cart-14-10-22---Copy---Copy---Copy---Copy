import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  static comment: any;
  constructor() {}
  @Input() cart: any[];
  @Input() free = false;
  @Output() parentFunction: EventEmitter<any>= new EventEmitter()
  comment = ""

  getTotalCost() {
    if (this.cart) {
      return this.cart
        .map((t) => t.unitPrice * t.quantity * t.priceMultiplier)
        .reduce((acc, value) => acc + value, 0);
    }
    
  }


  emitComment() {
    this.parentFunction.emit(this.comment)
}


  ngOnInit(): void {
  }

}
