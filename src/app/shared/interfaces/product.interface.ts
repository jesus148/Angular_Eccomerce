
// clase modelo
export interface Product{
  // propiedad y tipo de dato
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}




// el ejemplo del rest, de aca sale la tabla
// {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   "rating": {
//   "rate": 3.9,
//   "count": 120
//   }
//   },




// CLASE MODELO PARA EL CARRITO DE COMPRAS
export interface ProductItemCart {
  product: Product;
  quantity :number;
}
