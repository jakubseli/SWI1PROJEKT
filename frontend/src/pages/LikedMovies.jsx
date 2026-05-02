import { useState, useEffect } from 'react'
import api from '../api/axios'

function LikedMovies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    api.get('/movies/liked').then(res => setMovies(res.data))
  }, [])

  const unlike = async (movieId) => {
    await api.delete(`/movies/${movieId}/like`)
    setMovies(movies.filter(m => m.id !== movieId))
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Liked Movies</h2>
      {movies.length === 0 ? (
        <p style={styles.empty}>You haven't liked any movies yet. Go browse some!</p>
      ) : (
        <div style={styles.grid}>
          {movies.map(movie => (
            <div key={movie.id} style={styles.card}>
              <img src={movie.posterUrl} alt={movie.title} style={styles.poster} />
              <div style={styles.info}>
                <h3 style={styles.title}>{movie.title}</h3>
                <p style={styles.meta}>{movie.director} · {movie.year}</p>
                <p style={styles.genre}>{movie.genre}</p>
                <p style={styles.description}>{movie.description}</p>
                <button style={styles.unlikeButton} onClick={() => unlike(movie.id)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
  empty: {
    color: '#aaa',
    fontSize: '18px',
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
  unlikeButton: {
    padding: '8px 16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: '8px',
  },
}

export default LikedMovies