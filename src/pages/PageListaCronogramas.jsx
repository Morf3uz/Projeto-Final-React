import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Tabela, Botao } from '../components/index.js'
import cronogramaService from '../services/cronogramaService.js'

function PageListaCronogramas() {
    const [cronogramas, setCronogramas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const { usuarioLogado } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!usuarioLogado) { navigate('/login'); return }
        cronogramaService.listarTodos()
            .then(dados => setCronogramas(dados))
            .catch(() => {})
            .finally(() => setCarregando(false))
    }, [])

    function handleExcluir(id) {
        if (!window.confirm('Deseja excluir este cronograma?')) return
        cronogramaService.excluir(id)
            .then(() => setCronogramas(prev => prev.filter(c => c.id !== id)))
            .catch(() => alert('Erro ao excluir cronograma.'))
    }

    const colunas = ['Descrição', 'Horário', 'Pacote', ...(usuarioLogado?.isAdmin ? ['Ações'] : [])]

    return (
        <PageTemplate titulo="Cronogramas">
            {usuarioLogado?.isAdmin && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Link to="/cronogramas/novo" className="btn-viaggio-gold" style={{ textDecoration: 'none' }}>
                        + Novo Cronograma
                    </Link>
                </div>
            )}
            {carregando ? (
                <p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando cronogramas...</p>
            ) : (
                <Tabela
                    colunas={colunas}
                    dados={cronogramas}
                    renderLinha={(cronograma) => (
                        <tr key={cronograma.id}>
                            <td>{cronograma.descricao}</td>
                            <td>{cronograma.horario}</td>
                            <td>{cronograma.pacote?.nome ?? '—'}</td>
                            {usuarioLogado?.isAdmin && (
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Botao variante="outline" onClick={() => navigate(`/cronogramas/${cronograma.id}/editar`)}>
                                            Editar
                                        </Botao>
                                        <Botao variante="danger" onClick={() => handleExcluir(cronograma.id)}>
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

export default PageListaCronogramas