import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsStore } from '@/stores/products'
import type { Product } from '../../../../server/types'

export default function ProductEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const getProduct = useProductsStore((s) => s.getProduct)
  const createProduct = useProductsStore((s) => s.createProduct)
  const updateProduct = useProductsStore((s) => s.updateProduct)

  const [product, setProduct] = useState<Product>({} as Product)

  useEffect(() => {
    if (id) {
      getProduct(Number(id)).then((data) => {
        setProduct(data.data)
      })
    }
  }, [id])

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault()
    if (product.id) {
      await updateProduct(product.id, product)
    } else {
      await createProduct(product)
    }
    navigate('/admin/products')
  }

  return (
    <form id="admin-product-edit" className="box" onSubmit={saveProduct}>
      <h1 className="title">{product.id ? 'Edit' : 'New'} Product</h1>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={product.title || ''}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input
            className="input"
            type="number"
            step="0.01"
            value={product.price ?? ''}
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Category</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={product.category || ''}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Brand</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={product.brand || ''}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Thumbnail URL</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={product.thumbnail || ''}
            onChange={(e) => setProduct({ ...product, thumbnail: e.target.value })}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Tags (comma separated)</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={product.tags || ''}
            onChange={(e) => setProduct({ ...product, tags: e.target.value as unknown as string[] })}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">Save</button>
        </div>
        <div className="control">
          <button className="button is-light" type="button" onClick={() => navigate('/admin/products')}>Cancel</button>
        </div>
      </div>
    </form>
  )
}
