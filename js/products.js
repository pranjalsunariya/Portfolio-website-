export const products = [
  { id: 1, name: 'Wireless Headphones', price: 2499, emoji: '🎧', category: 'Electronics', description: 'Noise-cancelling over-ear wireless headphones with 30-hour battery life.' },
  { id: 2, name: 'Smart Watch', price: 3999, emoji: '⌚', category: 'Electronics', description: 'Fitness tracking smart watch with heart rate monitor and GPS.' },
  { id: 3, name: 'Backpack', price: 1299, emoji: '🎒', category: 'Accessories', description: 'Water-resistant laptop backpack with multiple compartments.' },
  { id: 4, name: 'Coffee Mug', price: 349, emoji: '☕', category: 'Home', description: 'Ceramic mug that keeps your coffee warm for hours.' },
  { id: 5, name: 'Desk Lamp', price: 899, emoji: '💡', category: 'Home', description: 'Adjustable LED desk lamp with 3 brightness levels.' },
  { id: 6, name: 'Running Shoes', price: 2999, emoji: '👟', category: 'Footwear', description: 'Lightweight running shoes with breathable mesh upper.' }
];

export function getProductById(id) {
  return products.find(p => p.id === Number(id));
}
