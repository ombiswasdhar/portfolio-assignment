import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4 10.5L12 3.5L20 10.5V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V10.5Z" />
        <line x1="12" y1="16" x2="12" y2="18.5" />
      </svg>
    ),
  },
  {
    name: 'Work',
    path: '/work',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" />
        <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" />
        <line x1="12" y1="12" x2="12" y2="14" />
      </svg>
    ),
  },
  {
    name: 'About',
    path: '/about',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="7.5" r="4" />
        <path d="M5 20.5C5 16.5 8.2 14 12 14C15.8 14 19 16.5 19 20.5" />
      </svg>
    ),
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="13" y2="13" />
      </svg>
    ),
  },
]

export default function Nav() {
  const location = useLocation()

  return (
    <header className="sticky top-6 z-50 flex justify-center px-4 w-full pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-[28px] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-neutral-100 transition-all duration-300"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              aria-label={item.name}
              title={item.name}
              className={`group relative flex items-center justify-center transition-all duration-300 ease-out no-underline select-none ${
                isActive
                  ? 'bg-[#181824] text-white px-5 py-2.5 rounded-full shadow-sm gap-2.5'
                  : 'w-11 h-11 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-full'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {isActive && (
                <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>
    </header>
  )
}
