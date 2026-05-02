import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      navigate('/')
    } catch (e) {
      setError('Invalid username or password')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.logo}>🎬 CinemaBox</h1>
        <h2 style={styles.title}>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>Sign In</button>
        <p style={styles.registerText}>
          New to CinemaBox? <Link to="/register" style={styles.registerLink}>Sign up now</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#141414',
  },
  box: {
    backgroundColor: '#1a1a1a',
    padding: '48px',
    borderRadius: '8px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  logo: {
    color: '#e50914',
    textAlign: 'center',
    marginBottom: '8px',
  },
  title: {
    color: '#fff',
    marginBottom: '8px',
  },
  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#e50914',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  error: {
    color: '#e50914',
    fontSize: '14px',
  },
  registerText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: '14px',
  },
  registerLink: {
    color: '#fff',
  },
}

export default Login