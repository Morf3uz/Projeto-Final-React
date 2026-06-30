import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MenuNavegacao from '../components/MenuNavegacao.jsx'
import destinoService from '../services/destinoService.js'
import pacoteService from '../services/pacoteService.js'

function PageHome() {
    const [destinos, setDestinos] = useState([])
    const [pacotes, setPacotes] = useState([])

    useEffect(() => {
        destinoService.listarTodos()
            .then(lista => setDestinos(lista.slice(0, 3)))
            .catch(() => {})

        pacoteService.listarTodos()
            .then(lista => setPacotes(lista.slice(0, 3)))
            .catch(() => {})
    }, [])

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <MenuNavegacao />

            <section style={{ background: 'var(--ink)', padding: '88px 32px', textAlign: 'center', borderBottom: '1px solid var(--gold-line)' }}>
                <div style={{ maxWidth: '620px', margin: '0 auto' }}>
                    <div style={{
                        fontFamily: "'Crimson Pro', serif",
                        fontSize: '12px',
                        letterSpacing: '3.5px',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '18px'
                    }}>
                        Agência de Turismo
                    </div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(44px, 8vw, 76px)',
                        fontWeight: 900,
                        color: 'var(--cream)',
                        lineHeight: 1.08,
                        marginBottom: '22px',
                        letterSpacing: '-0.5px'
                    }}>
                        Viaggio
                    </h1>
                    <p style={{
                        fontFamily: "'Crimson Pro', serif",
                        fontSize: '20px',
                        color: 'rgba(247, 242, 233, 0.65)',
                        lineHeight: 1.65,
                        marginBottom: '40px'
                    }}>
                        Descoberta com elegância. Roteiros cuidadosamente elaborados para quem viaja com propósito.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/destinos" className="btn-viaggio-gold" style={{ textDecoration: 'none' }}>
                            Explorar Destinos
                        </Link>
                        <Link to="/pacotes" className="btn-viaggio-outline" style={{ textDecoration: 'none' }}>
                            Ver Pacotes
                        </Link>
                    </div>
                </div>
            </section>

            {destinos.length > 0 && (
                <section style={{ padding: '64px 32px', background: 'var(--paper)' }}>
                    <div className="container">
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', color: 'var(--ink)', marginBottom: '6px' }}>
                            Destinos em Destaque
                        </h2>
                        <div style={{ width: '36px', height: '2px', background: 'var(--gold)', marginBottom: '32px' }} />
                        <div className="row g-3">
                            {destinos.map(destino => (
                                <div key={destino.id} className="col-12 col-md-6 col-lg-4">
                                    <div className="viaggio-card h-100">
                                        {destino.imagemUrl ? (
                                            <img
                                                src={destino.imagemUrl}
                                                alt={destino.nome}
                                                style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                                            />
                                        ) : (
                                            <div style={{ height: '72px', background: 'var(--parchment)', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ color: 'var(--smoke-lt)', fontStyle: 'italic', fontSize: '13px' }}>Sem imagem</span>
                                            </div>
                                        )}
                                        <div style={{ padding: '16px 18px' }}>
                                            <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', marginBottom: '4px', color: 'var(--ink)' }}>
                                                {destino.nome}
                                            </h5>
                                            <p style={{ fontSize: '13px', color: 'var(--smoke)', margin: 0 }}>
                                                {destino.pais}
                                                {destino.categoria && ` · ${destino.categoria}`}
                                            </p>
                                            {destino.duracaoDeDias && (
                                                <p style={{ fontSize: '12px', color: 'var(--smoke-lt)', marginTop: '4px', marginBottom: 0 }}>
                                                    {destino.duracaoDeDias} dias
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '24px' }}>
                            <Link to="/destinos" style={{ color: 'var(--gold)', fontFamily: "'Crimson Pro', serif", fontSize: '15px', textDecoration: 'none' }}>
                                Ver todos os destinos →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {pacotes.length > 0 && (
                <section style={{ padding: '64px 32px', background: 'var(--cream)' }}>
                    <div className="container">
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', color: 'var(--ink)', marginBottom: '6px' }}>
                            Pacotes Disponíveis
                        </h2>
                        <div style={{ width: '36px', height: '2px', background: 'var(--gold)', marginBottom: '32px' }} />
                        <div className="row g-3">
                            {pacotes.map(pacote => (
                                <div key={pacote.id} className="col-12 col-md-6 col-lg-4">
                                    <div className="viaggio-card h-100" style={{ padding: '24px' }}>
                                        <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', marginBottom: '8px', color: 'var(--ink)' }}>
                                            {pacote.nome}
                                        </h5>
                                        {pacote.destino && (
                                            <p style={{ fontSize: '13px', color: 'var(--smoke)', marginBottom: '12px' }}>
                                                {pacote.destino.nome}
                                            </p>
                                        )}
                                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: 'var(--gold)', fontWeight: 700 }}>
                                            R$ {Number(pacote.preco).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '24px' }}>
                            <Link to="/pacotes" style={{ color: 'var(--gold)', fontFamily: "'Crimson Pro', serif", fontSize: '15px', textDecoration: 'none' }}>
                                Ver todos os pacotes →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <footer style={{ background: 'var(--ink)', borderTop: '1px solid var(--gold-line)', padding: '28px 32px', textAlign: 'center', marginTop: 'auto' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cream)', fontSize: '15px', marginBottom: '4px' }}>
                    ✦ Viaggio{' '}
                    <small style={{ color: 'var(--smoke-lt)', fontSize: '12px' }}>Douglas &amp; Antonio Everton</small>
                </div>
                <p style={{ color: 'var(--smoke)', fontSize: '13px', margin: 0 }}>
                    © {new Date().getFullYear()} — Agência de Turismo
                </p>
            </footer>
        </div>
    )
}

export default PageHome