import { useState } from 'react'
import './App.css'
import MatrixBackground from './MatrixBackground'

function App() {
  // Estado para el formulario de contacto
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Enviar formulario usando EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setEnviado(false)
    try {
      const res = await fetch('https://formspree.io/f/mjkwdaov', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
        }),
      })
      if (res.ok) {
        setEnviado(true)
        setForm({ nombre: '', email: '', mensaje: '' })
      } else {
        setError('Error al enviar el mensaje. Intenta nuevamente.')
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    }
  }

  return (
    <>
      <MatrixBackground />
      <div className="hacker-bg">
        <header className="header">
          <h1 className="glitch">&lt;Lautaro Godoy /&gt;</h1>
          <p className="subtitle">Programador Junior | 19 años | Argentina</p>
        </header>
        <section className="about">
          <h2>Sobre mí</h2>
          <p>
            ¡Hola! Soy Lautaro, un apasionado de la programación y la tecnología. Busco mi primera experiencia profesional y me encanta aprender cosas nuevas todos los días.
          </p>
          <div className="skills">
            <span>💻 JavaScript</span>
            <span>⚛️ React</span>
            <span>🌐 HTML/CSS</span>
            <span>🖥️ Git/GitHub</span>
          </div>
        </section>
        <section className="contacto">
          <h2>Contacto</h2>
          <form className="formulario" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="mensaje"
              placeholder="Tu mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
            />
            <button type="submit">Enviar</button>
          </form>
          {enviado && <p className="exito">¡Mensaje enviado! Gracias por contactarme.</p>}
          {error && <p className="error">{error}</p>}
        </section>
        <footer className="footer">
          <p>© 2025 Lautaro Godoy | Inspirado en portafolios de desarrolladores modernos</p>
        </footer>
      </div>
    </>
  )
}

export default App
