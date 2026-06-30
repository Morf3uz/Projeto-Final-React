import MenuNavegacao from './MenuNavegacao.jsx'

function PageTemplate({ titulo, children }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <MenuNavegacao />
            <main className="container py-5" style={{ flex: 1 }}>
                {titulo && <h1 className="page-title-viaggio">{titulo}</h1>}
                {children}
            </main>
            <footer style={{ background: 'var(--ink)', borderTop: '1px solid var(--gold-line)', padding: '28px 32px', textAlign: 'center' }}>
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

export default PageTemplate