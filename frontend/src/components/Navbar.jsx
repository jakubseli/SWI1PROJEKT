import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🎬 CinemaBox</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Browse</Link>
        <Link to="/liked" style={styles.link}>My List</Link>
        <span style={styles.username}>👤 {username}</span>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#1a1a1a',
    borderBottom: '1px solid #333',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e50914',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  username: {
    color: '#aaa',
    fontSize: '14px',
  },
  logout: {
    backgroundColor: '#e50914',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}

export default Navbar