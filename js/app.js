import { router } from './router.js';
import { updateCartBadge } from './cart.js';

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  router();
  updateCartBadge();
});
