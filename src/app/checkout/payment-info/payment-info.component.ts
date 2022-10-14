import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent implements OnInit {
  constructor(private firebase: FirebaseService) {}
  @Input() free = false;
  @Output() locationpicked: EventEmitter<any>= new EventEmitter()
  @Output() selectedAddress: EventEmitter<any>= new EventEmitter()
  locations: any[];
  OrderAddress= "";

  selected() {
    this.locationpicked.emit(true)
}

emitAddress() {
  this.selectedAddress.emit(this.OrderAddress)

}


ngOnInit(): void {
  this.firebase.getLocations().subscribe((value) => {
    this.locations = value;

    console.log(this.locations)
  });
}

}
