import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useUsersStore } from '@/stores/users'
import type { User } from '../../../../server/types'
import { confirm } from '@/components/DialogBoxes'
import PaginationControls from '@/components/PaginationControls'
import type { PagingRequest } from '../../../../server/types/dataEnvelopes'

export default function AdminUserList() {
  const users = useUsersStore((s) => s.users)
  const totalCount = useUsersStore((s) => s.totalCount)
  const loadUsers = useUsersStore((s) => s.loadUsers)
  const deleteUser = useUsersStore((s) => s.deleteUser)

  const [pagination, setPagination] = useState<PagingRequest>({ page: 1, pageSize: 10 })
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!totalCount) {
      loadUsers(pagination)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      loadUsers(pagination)
    }, 500)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [pagination])

  async function remove(user: User) {
    if (!user.id) {
      console.error('User ID is missing, cannot delete user.')
      return
    }
    if (await confirm("Delete", `Are you sure that you want to delete ${user.firstName} ${user.lastName}?`)) {
      deleteUser(user.id)
    }
  }

  return (
    <div id="admin-user-list">
      <table className="table is-fullwidth is-striped is-hoverable" style={{ marginBottom: 0 }}>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>
              <div className="control has-icons-left" style={{ display: 'inline-block', marginRight: '1em' }}>
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

              <Link to="/admin/users/edit" className="button is-small is-primary">
                <span>New</span>
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.image} alt="User Avatar" className="image is-32x32 is-rounded" />
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/admin/users/edit/${user.id}`} className="button is-small is-warning">
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                </Link>
                <button className="button is-small is-danger" onClick={() => remove(user)}>
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
