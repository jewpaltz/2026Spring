import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUsersStore } from '@/stores/users'
import type { User } from '../../../../server/types'

const genders = ['Male', 'Female', 'Other']
const roles = ['Admin', 'User', 'Vendor']

export default function UserEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const getUser = useUsersStore((s) => s.getUser)
  const createUser = useUsersStore((s) => s.createUser)
  const updateUser = useUsersStore((s) => s.updateUser)

  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    if (id) {
      getUser(Number(id)).then((data) => {
        setUser(data.data)
      })
    }
  }, [id])

  async function saveUser(e: React.FormEvent) {
    e.preventDefault()
    if (user.id) {
      await updateUser(user.id, user)
    } else {
      await createUser(user)
    }
    navigate('/admin/users')
  }

  return (
    <form id="admin-user-edit" className="box" onSubmit={saveUser}>
      <h1 className="title">{user.id ? 'Edit' : 'New'} User</h1>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={user.firstName || ''}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={user.lastName || ''}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="email"
            value={user.email || ''}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <select
                className="input"
                value={user.role || ''}
                onChange={(e) => setUser({ ...user, role: e.target.value as User['role'] })}
              >
                <option value="">Select role</option>
                {roles.map((role) => (
                  <option key={role} value={role.toLowerCase()}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <select
                className="input"
                value={user.gender || ''}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option value="">Select gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender.toLowerCase()}>{gender}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Birth Date</label>
            <div className="control has-icons-left">
              <span className="icon is-small is-left">📅</span>
              <input
                className="input"
                type="date"
                value={user.birthDate || ''}
                onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Avatar URL</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={user.image || ''}
            onChange={(e) => setUser({ ...user, image: e.target.value })}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Phone Number</label>
        <div className="control has-icons-left">
          <span className="icon is-small is-left">📞</span>
          <input
            className="input"
            type="tel"
            value={user.phone || ''}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="columns">
        <div className="column is-three-quarters">
          <div className="field">
            <label className="label">Address</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={user.address || ''}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Country</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={user.country || ''}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">City</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={user.city || ''}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">State</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={user.state || ''}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">ZIP Code</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={user.postalCode || ''}
                onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">Save</button>
        </div>
        <div className="control">
          <button className="button is-light" type="button" onClick={() => navigate('/admin/users')}>Cancel</button>
        </div>
      </div>
    </form>
  )
}
