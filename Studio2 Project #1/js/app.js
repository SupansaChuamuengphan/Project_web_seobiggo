new Vue({
    el: '#app',
 data: {
  nameCustomer: '',
  isShowingCart: false,
  isHiding:true,
  products: [
  {
   id:1,
   name:'GOGUMA',
   price: 220,
   picture: './images/p1.png',
   },
   {
   id:2,
   name:'MANGO CHEESE',
   price: 235,
   picture: './images/p2.png',
   },
   {
   id:3,
   name:'MORIHAN GREEN TEA PAT',
   price: 190,
   picture: './images/p3.png',
   },
   {
   id:4,
   name:'OREO',
   price: 220,
   picture: './images/p4.png',
   },
   {
   id:5,
   name:'MELON ICECREAM',
   price: 235,
   picture: './images/p5.png',
   },
   {
   id:6,
   name:'PAT',
   price: 190,
   picture: './images/p6.png',
   },
  ],
  cart: {
   items: []
  },
  tableSelect: {
   numberSelect:0,
  },
  sitSelect: {
   numbsitSelect:0,
  },
 },
 methods: {
  addProductTocart: function(product) {
   var cartItem = this.getCartItem(product)
   if (cartItem != null) {
    cartItem.quantity++
   }else
    {
   this.cart.items.push({
    product: product,
    quantity:1
    
    })
   }

   product.inStock--;
   
  },
  getCartItem: function(product) {

   for(var i=0; i < this.cart.items.length; i++) {
    console.log(this.cart.items[i].product.id+"/"+product.id)
    if (this.cart.items[i].product.id===product.id) {
     return this.cart.items[i];
    }

   }

   return null;
  },
  increaseQty: function(item) {
   item.product.inStock--
   item.quantity++
  },
  decreaseQty: function(item) {
   item.product.inStock++
   item.quantity--

   if (item.quantity == 0) {
    this.removeItemFromCart(item)
     }
   },

   removeItemFromCart: function(item) {
    var index = this.cart.items.indexOf(item)
    if (index != -1) {
     this.cart.items.splice(index,1)
     }
   },

   getDateTime:function () {
      var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      if(month.toString().length == 1) {
           month = '0'+month;
      }
      if(day.toString().length == 1) {
           day = '0'+day;
      }   
      if(hour.toString().length == 1) {
           hour = '0'+hour;
      }
      if(minute.toString().length == 1) {
           minute = '0'+minute;
      }
      if(second.toString().length == 1) {
           second = '0'+second;
      }   
      var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
       return dateTime;
  }
 },
 computed: {
  cartTotal: function() {
   var total = 0

   this.cart.items.forEach(function(item) {
    total += item.quantity * item.product.price
   })

   return total;
  },
  taxAmount: function() {
   return (this.cartTotal*7)/100
  },
  grandTotal: function() {
   return this.cartTotal + this.taxAmount
  }
 },
 filters: {
  currency: function(value) {
   var formatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0
   });

   return formatter.format(value)
  }
 }
});