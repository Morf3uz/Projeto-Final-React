import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Botao } from '../components/index.js'
import destinoService from '../services/destinoService.js'

function PageVisualizarDestino() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { usuarioLogado } = useSelector(state => state.auth)
    const [destino, setDestino] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        destinoService.buscarPorId(id)
            .then(dados => setDestino(dados))
            .catch(() => navigate('/destinos'))
            .finally(() => setCarregando(false))
    }, [id])

    if (carregando) {
        return <PageTemplate><p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando...</p></PageTemplate>
    }
    if (!destino) return null

    return (
        <PageTemplate titulo={destino.nome}>
            <div className="row g-4">
                {destino.imagemUrl && (
                    <div className="col-12 col-md-5">
                        <img
                            src={destino.imagemUrl}
                            alt={destino.nome}
                            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '340px' }}
                        />
                    </div>
                )}
                <div className={destino.imagemUrl ? 'col-12 col-md-7' : 'col-12'}>
                    <div className="viaggio-card p-4">
                        <dl style={{ margin: 0 }}>
                            <div style={{ marginBottom: '14px' }}>
                                <dt className="form-label-viaggio">País</dt>
                                <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>{destino.pais}</dd>
                            </div>
                            {destino.categoria && (
                                <div style={{ marginBottom: '14px' }}>
                                    <dt className="form-label-viaggio">Categoria</dt>
                                    <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>{destino.categoria}</dd>
                                </div>
                            )}
                            {destino.duracaoDeDias && (
                                <div style={{ marginBottom: '14px' }}>
                                    <dt className="form-label-viaggio">Duração</dt>
                                    <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>{destino.duracaoDeDias} dias</dd>
                                </div>
                            )}
                            {destino.descricao && (
                                <div>
                                    <dt className="form-label-viaggio">Descrição</dt>
                                    <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0, lineHeight: 1.65 }}>{destino.descricao}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <Botao variante="outline" onClick={() => navigate('/destinos')}>← Voltar</Botao>
                        {usuarioLogado?.isAdmin && (
                            <Botao onClick={() => navigate(`/destinos/${id}/editar`)}>Editar</Botao>
                        )}
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageVisualizarDestino