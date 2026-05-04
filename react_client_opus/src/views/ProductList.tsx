import { useEffect } from 'react'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import SideBar from '@/components/SideBar'
import ShoppingCart from '@/components/ShoppingCart'

export default function ProductList() {
  const products = useProductsStore((s) => s.products)
  const loadProducts = useProductsStore((s) => s.loadProducts)
  const isCartSidebarOpen = useCartStore((s) => s.isCartSidebarOpen)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    loadProducts()
  }, [])

  function addToCart(productId: number) {
    addItem(productId)
  }

  return (
    <>
      <h1 className="title is-1">Product List</h1>
      <div className="grid is-col-min-10">
        {products.map((product) => (
          <div key={product.id} className="box">
            <img src={product.thumbnail} alt="Product Image" className="image is-4by3" />

            <h4 className="title is-6">{product.title}</h4>
            <h6 className="subtitle is-6" style={{ marginBottom: '.5em', fontStyle: 'italic' }}>
              {product.category} / {product.brand}
            </h6>
            {product.description}
            <button
              className="button is-primary is-small"
              style={{ float: 'right', marginTop: '.5em' }}
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
            <div>
              <span style={{ fontWeight: 'bold', color: '#3273dc' }}>${product.price}</span>
            </div>
          </div>
        ))}
      </div>
      <SideBar width={300} isActive={isCartSidebarOpen}>
        <ShoppingCart />
      </SideBar>
    </>
  )
}
