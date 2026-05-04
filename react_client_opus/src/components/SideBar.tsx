import type { ReactNode } from 'react'

type SideBarProps = {
  width?: number
  isActive?: boolean
  children?: ReactNode
}

export default function SideBar({ width = 250, isActive = false, children }: SideBarProps) {
  return (
    <div
      className={`side-bar ${isActive ? 'is-active' : ''}`}
      style={{ width: `${width}px` }}
    >
      {children}
    </div>
  )
}
