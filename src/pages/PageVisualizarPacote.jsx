import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Botao } from '../components/index.js'
import pacoteService from '../services/pacoteService.js'

function PageVisualizarPacote() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { usuarioLogado } = useSelector(state => state.auth)
    const [pacote, setPacote] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        pacoteService.buscarPorId(id)
            .then(dados => setPacote(dados))
            .catch(() => navigate('/pacotes'))
            .finally(() => setCarregando(false))
    }, [id])

    if (carregando) {
        return <PageTemplate><p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando...</p></PageTemplate>
    }
    if (!pacote) return null

    return (
        <PageTemplate titulo={pacote.nome}>
            <div style={{ maxWidth: '520px' }}>
                <div className="viaggio-card p-4">
                    <dl style={{ margin: 0 }}>
                        <div style={{ marginBottom: '16px' }}>
                            <dt className="form-label-viaggio">Destino</dt>
                            <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>
                                {pacote.destino ? `${pacote.destino.nome} — ${pacote.destino.pais}` : '—'}
                            </dd>
                        </div>
                        <div>
                            <dt className="form-label-viaggio">Preço</dt>
                            <dd style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--gold)', fontWeight: 700, margin: 0 }}>
                                R$ {Number(pacote.preco).toFixed(2)}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <Botao variante="outline" onClick={() => navigate('/pacotes')}>← Voltar</Botao>
                    {usuarioLogado?.isAdmin && (
                        <Botao onClick={() => navigate(`/pacotes/${id}/editar`)}>Editar</Botao>
                    )}
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageVisualizarPacote