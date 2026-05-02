import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { username, email, password })
      navigate('/login')
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.logo}>🎬 CinemaBox</h1>
        <h2 style={styles.title}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleRegister}>Create Account</button>
        <p style={styles.loginText}>
          Already have an account? <Link to="/login" style={styles.loginLink}>Sign in</Link>
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
  loginText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: '14px',
  },
  loginLink: {
    color: '#fff',
  },
}

export default Register