import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useProductsStore } from '@/stores/products'
import type { Product } from '../../../../server/types'
import { confirm } from '@/components/DialogBoxes'
import PaginationControls from '@/components/PaginationControls'
import type { PagingRequest } from '../../../../server/types/dataEnvelopes'

export default function AdminProductList() {
  const products = useProductsStore((s) => s.products)
  const totalCount = useProductsStore((s) => s.totalCount)
  const loadProducts = useProductsStore((s) => s.loadProducts)
  const deleteProduct = useProductsStore((s) => s.deleteProduct)

  const [pagination, setPagination] = useState<PagingRequest>({ page: 1, pageSize: 10 })
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!totalCount) {
      loadProducts(pagination)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      loadProducts(pagination)
    }, 500)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [pagination])

  async function remove(product: Product) {
    if (await confirm("Delete", `Are you sure that you want to delete ${product.title}`)) {
      deleteProduct(product.id)
    }
  }

  return (
    <div id="admin-product-list">
      <table className="table is-fullwidth is-striped is-hoverable" style={{ marginBottom: 0 }}>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Tags</th>
            <th>
              Description
              <div className="control has-icons-left" style={{ display: 'inline-block', marginLeft: '1em' }}>
                <input
                  type="text"
                  className="input is-rounded is-small"
                  placeholder="Search..."
                  value={pagination.search || ''}
                  onChange={(e) => setPagination({ ...pagination, search: e.target.value })}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </th>
            <th>
              <Link to="/admin/products/edit" className="button is-small is-primary">
                <span>New</span>
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.thumbnail} alt="Product Image" className="image is-4by3" />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>${product.price}</td>
              <td>
                <div className="tags">
                  {product.tags?.map((tag) => (
                    <span key={tag} className="tag is-warning is-light">{tag}</span>
                  ))}
                </div>
              </td>
              <td>{product.description}</td>
              <td>
                <Link to={`/admin/products/edit/${product.id}`} className="button is-small is-warning">
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                </Link>
                <button className="button is-small is-danger" onClick={() => remove(product)}>
                  <span className="icon">
                    <i className="fas fa-trash"></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls
        currentPage={pagination.page}
        pageSize={pagination.pageSize}
        totalPages={Math.ceil((totalCount ?? 1) / (pagination.pageSize ?? 1))}
        onPageChange={(page) => setPagination({ ...pagination, page })}
        onPageSizeChange={(pageSize) => setPagination({ ...pagination, pageSize })}
      />
    </div>
  )
}
