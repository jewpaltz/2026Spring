import { useCartStore } from '@/stores/cart'

export default function ShoppingCart() {
  const items = useCartStore((s) => s.items)
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const updateItemQuantity = useCartStore((s) => s.updateItemQuantity)

  return (
    <div style={{ padding: '0.5rem' }}>
      <h1 className="title is-2">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.product.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
              <img src={item.product.thumbnail} alt="Product Image" className="image is-64x64" />
              <span>{item.product.title}</span>
              <span>X</span>
              <select
                value={item.quantity}
                className="quantity select is-small"
                style={{ margin: '0 0.5em' }}
                onChange={(e) => updateItemQuantity(item.product.id, Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span style={{ fontWeight: 'bold', marginTop: '1em' }}>
                = ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <p style={{ fontWeight: 'bold', marginTop: '1em' }}>
          Total: ${totalPrice.toFixed(2)}
        </p>
      )}
    </div>
  )
}
