import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Tabela, Botao } from '../components/index.js'
import destinoService from '../services/destinoService.js'

function PageListaDestinos() {
    const [destinos, setDestinos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const { usuarioLogado } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        destinoService.listarTodos()
            .then(dados => setDestinos(dados))
            .catch(() => {})
            .finally(() => setCarregando(false))
    }, [])

    function handleExcluir(id) {
        if (!window.confirm('Deseja excluir este destino?')) return
        destinoService.excluir(id)
            .then(() => setDestinos(prev => prev.filter(d => d.id !== id)))
            .catch(() => alert('Erro ao excluir destino.'))
    }

    const colunas = ['Nome', 'País', 'Categoria', 'Duração', ...(usuarioLogado?.isAdmin ? ['Ações'] : [])]

    return (
        <PageTemplate titulo="Destinos">
            {usuarioLogado?.isAdmin && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Link to="/destinos/novo" className="btn-viaggio-gold" style={{ textDecoration: 'none' }}>
                        + Novo Destino
                    </Link>
                </div>
            )}
            {carregando ? (
                <p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando destinos...</p>
            ) : (
                <Tabela
                    colunas={colunas}
                    dados={destinos}
                    renderLinha={(destino) => (
                        <tr key={destino.id}>
                            <td>
                                <Link
                                    to={`/destinos/${destino.id}`}
                                    style={{ color: 'var(--ink)', textDecoration: 'none', fontFamily: "'Playfair Display', serif" }}
                                >
                                    {destino.nome}
                                </Link>
                            </td>
                            <td>{destino.pais}</td>
                            <td>{destino.categoria || '—'}</td>
                            <td>{destino.duracaoDeDias ? `${destino.duracaoDeDias} dias` : '—'}</td>
                            {usuarioLogado?.isAdmin && (
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Botao variante="outline" onClick={() => navigate(`/destinos/${destino.id}/editar`)}>
                                            Editar
                                        </Botao>
                                        <Botao variante="danger" onClick={() => handleExcluir(destino.id)}>
                                            Excluir
                                        </Botao>
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                />
            )}
        </PageTemplate>
    )
}

export default PageListaDestinos