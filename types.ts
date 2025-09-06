export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Should not be stored in client-side state long-term
  profilePicture: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrls: string[];
  sellerId: string;
  sellerName: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Purchase extends Product {
  purchaseDate: string;
}