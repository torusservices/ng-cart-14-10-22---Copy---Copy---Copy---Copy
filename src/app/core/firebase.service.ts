import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database/';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, CartItem, Order, Metals } from '../shared/interfaces';



@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  cartsUrl = '/carts';
  ordersUrl = '/orders';
  productsUrl = '/products';
  categoriesUrl = '/categories';
  metalsUrl = '/metals';
  locationsUrl = '/locations';

  constructor(private db: AngularFireDatabase) {
    if (!this.getCartKey()) {
      localStorage.setItem('cartKey', db.createPushId());
    }
  }

  getProducts(): Observable<Product[]> {
    return this.db
      .list(this.productsUrl)
      .snapshotChanges()
      .pipe(
        map((products) =>
          products.map(
            (product) =>
              ({
                key: product.payload.key,
                ...(product.payload.val() as {}),
              } as Product)
          )
        )
      );
  }

  getLocations(): Observable<Location[]> {
    return this.db
      .list(this.locationsUrl)
      .snapshotChanges()
      .pipe(
        map((locations) =>
          locations.map(
            (location) =>
              ({
                key: location.payload.key,
                ...(location.payload.val() as {}),
              } as unknown as Location)
          )
        )
      );
  }

  getCategories(): Observable<any[]> {
    return this.db.list(this.categoriesUrl).valueChanges();
  }

  getCartKey() {
    return localStorage.getItem('cartKey');
  }

  getCart(): Observable<CartItem[]> {
    return this.db
      .list(`${this.cartsUrl}/${this.getCartKey()}`)
      .snapshotChanges()
      .pipe(
        map((cart) =>
          cart.map(
            (item) =>
              ({
                key: item.payload.key,
                ...(item.payload.val() as {}),
              } as CartItem)
          )
        )
      );
  }

  clearCart() {
    return this.db.list(`${this.cartsUrl}/${this.getCartKey()}`).remove();
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .list(`${this.ordersUrl}/${this.getCartKey()}`)
      .snapshotChanges()
      .pipe(
        map((orders) =>
          orders.map(
            (order) =>
              ({
                key: order.payload.key,
                items: order.payload.val(),
              } as Order)
          )
        )
      );
  }

  // addOrder(order: CartItem[], comment) {
  //   this.db.database
  //     .ref(this.ordersUrl)
  //     .child(this.getCartKey())
  //     .update({ [new Date().toLocaleString().replace(/\//g, '-')]: order });

  // }

  addOrder(order: CartItem[], comment, address) {
    this.db.database
      .ref(this.ordersUrl)
      .child(this.getCartKey())
      .child(new Date().toLocaleString().replace(/\//g, '-'))
      .update({ items: order, comments: comment, address: address });
  }

  

  addMetals(metals: Metals[]) {
    this.db.database
      .ref('/')
      .update({ metals });
  }


  getCartCount(): Observable<number> {
    return this.getCart().pipe(
      map((cart) =>
        cart
          .map((item: CartItem) => item.quantity)
          .reduce((acc, curr) => acc + curr, 0)
      )
    );
  }

  getCartItem(key: string): Observable<any> {
    return this.db
      .object(`${this.cartsUrl}/${this.getCartKey()}/${key}`)
      .valueChanges();
  }

  getCartItemCount(key: string): Observable<number> {
    return this.getCartItem(key).pipe(
      map((item) => (item ? item.quantity : 0))
    );
  }

  AddCartItem(item: Product) {
    const data = {
      title: item.title,
      unitPrice: item.price,
      quantitative: item.quantitative,
      quantity: 1,
      priceMultiplier: 1,
    };
    return this.updateCartItem(item.key, data);
  }

// need to generate a random key instead of 9 that I have set
  AddCartCustomItem(_itemname,_itemprice) {
    const data = {
      title: _itemname,
      unitPrice: _itemprice,
      quantitative: "true",
      quantity: 1,
      priceMultiplier: 1,
    };
    return this.updateCartItem(data.title, data);
  }



  updateCartItem(itemKey, value) {
    this.db.database
      .ref(this.cartsUrl)
      .child(this.getCartKey())
      .child(itemKey)
      .update(value);
  }

  removeCartItem(key: string) {
    this.db.object(`${this.cartsUrl}/${this.getCartKey()}/${key}`).remove();
  }


  // firestore.list('/orders').valueChanges().subscribe(orders => {
  //   this.grid.dataSource = orders;   //intial data binding to grid
  // });


}

