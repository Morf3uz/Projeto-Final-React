import { Link } from 'react-router-dom'
import PageTemplate from '../components/PageTemplate.jsx'

function Page404() {
    return (
        <PageTemplate>
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '96px',
                    fontWeight: 900,
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '16px'
                }}>
                    404
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--ink)', marginBottom: '12px' }}>
                    Página não encontrada
                </h2>
                <p style={{ color: 'var(--smoke)', fontSize: '17px', marginBottom: '32px' }}>
                    A rota que você tentou acessar não existe.
                </p>
                <Link to="/" className="btn-viaggio-gold" style={{ textDecoration: 'none' }}>
                    Voltar ao início
                </Link>
            </div>
        </PageTemplate>
    )
}

export default Page404