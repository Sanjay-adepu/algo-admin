import React, { useState } from 'react';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Algotronn</div>
        <ul style={{ ...styles.navLinks, ...(sidebarOpen ? styles.navLinksMobileOpen : {}) }}>
       </Link> <li style={styles.navItem}>Orders</li>
          <li style={styles.navItem}>Coupons codes</li>
        </ul>
        <div style={styles.menuIcon} onClick={toggleSidebar}>
          {sidebarOpen ? (
            <div style={styles.closeIcon}>
              <div style={styles.closeLine1}></div>
              <div style={styles.closeLine2}></div>
            </div>
          ) : (
            <div style={styles.hamburger}>
              <div style={styles.line}></div>
              <div style={styles.line}></div>
              <div style={styles.line}></div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div style={styles.sidebar}>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem}>Orders</li>
            <li style={styles.sidebarItem}>Coupons codes</li>
          </ul>
        </div>
      )}
    </>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    color: 'white',
    padding: '0.75rem 1rem',
    position: 'relative',
    zIndex: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
  },
  navItem: {
    cursor: 'pointer',
  },
  menuIcon: {
    display: 'none',
    cursor: 'pointer',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  line: {
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '2px',
  },
  closeIcon: {
    position: 'relative',
    width: '25px',
    height: '25px',
  },
  closeLine1: {
    position: 'absolute',
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    transform: 'rotate(45deg)',
    top: '11px',
    left: '0',
  },
  closeLine2: {
    position: 'absolute',
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    transform: 'rotate(-45deg)',
    top: '11px',
    left: '0',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '250px',
    backgroundColor: 'white',
    paddingTop: '3rem',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    zIndex: 9,
  },
  sidebarList: {
    listStyle: 'none',
    paddingLeft: '1rem',
  },
  sidebarItem: {
    padding: '1rem 0',
    borderBottom: '1px solid #ddd',
    color: '#000',
    cursor: 'pointer',
  },
  // Responsive styles (inline media queries not possible here, so user should add CSS)
  navLinksMobileOpen: {
    display: 'none',
  },
};

// To enable mobile hamburger menu display, add this CSS in your global stylesheet:

/* 
@media (max-width: 768px) {
  ul {
    display: none !important;
  }
  div[style*="menuIcon"] {
    display: block !important;
  }
}
*/