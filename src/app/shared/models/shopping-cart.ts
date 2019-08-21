import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';


export class ShoppingCart {
  items: ShoppingCartItem[]=[];

  constructor(private itemsMap: {[productId: string] : ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for(let productId in itemsMap){
      let item = itemsMap[productId];

   
      this.items.push( new ShoppingCartItem({
        // title: item.title,
        // imageUrl: item.imageUrl,
        // price: item.productId,
        ...item,
        key: productId
      }));

      // let x = new ShoppingCartItem();
      // Object.assign(x, item); //copy all the properties from source (item) to target (x)
      // x.key = productId;
      // this.items.push(x);
    }
    // console.log("Hey",this.items)
  }

//  get productIds() {
//   return Object.keys(this.items);
//  }

  get totalItemsCount() {
    let count = 0;
    let a={};
    for(let productId in this.itemsMap){

      count += this.itemsMap[productId].quantity;

    }
      return count;
  }

  get totalPrice(){
    let sum = 0;
    for (let productId in this.items){
      sum += this.items[productId].totalPrice;
    }
    // console.log(this.totalPrice)
    return sum;
  }

  getQuantity(product: Product){
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

}
