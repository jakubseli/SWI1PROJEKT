import { useState, useEffect } from 'react'
import api from '../api/axios'

function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    api.get('/movies').then(res => setMovies(res.data))
  }, [])

  const toggleLike = async (movie) => {
    if (movie.liked) {
      await api.delete(`/movies/${movie.id}/like`)
    } else {
      await api.post(`/movies/${movie.id}/like`)
    }
    setMovies(movies.map(m => m.id === movie.id ? { ...m, liked: !m.liked } : m))
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Browse Movies</h2>
      <div style={styles.grid}>
        {movies.map(movie => (
          <div key={movie.id} style={styles.card}>
            <img src={movie.posterUrl} alt={movie.title} style={styles.poster} />
            <div style={styles.info}>
              <h3 style={styles.title}>{movie.title}</h3>
              <p style={styles.meta}>{movie.director} · {movie.year}</p>
              <p style={styles.genre}>{movie.genre}</p>
              <p style={styles.description}>{movie.description}</p>
              <button
                style={{ ...styles.likeButton, backgroundColor: movie.liked ? '#e50914' : '#333' }}
                onClick={() => toggleLike(movie)}
              >
                {movie.liked ? '❤️ Liked' : '🤍 Like'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '32px',
    backgroundColor: '#141414',
    minHeight: '100vh',
  },
  heading: {
    color: '#fff',
    fontSize: '28px',
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
    gap: '24px',
  },
  card: {
    display: 'flex',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    overflow: 'hidden',
    gap: '16px',
  },
  poster: {
    width: '120px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  info: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: '18px',
  },
  meta: {
    color: '#aaa',
    fontSize: '14px',
  },
  genre: {
    color: '#e50914',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: '13px',
    lineHeight: '1.5',
    flex: 1,
  },
  likeButton: {
    padding: '8px 16px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: '8px',
  },
}

export default Movies