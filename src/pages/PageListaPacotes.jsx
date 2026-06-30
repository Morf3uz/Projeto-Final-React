import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Tabela, Botao } from '../components/index.js'
import pacoteService from '../services/pacoteService.js'

function PageListaPacotes() {
    const [pacotes, setPacotes] = useState([])
    const [carregando, setCarregando] = useState(true)
    const { usuarioLogado } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        pacoteService.listarTodos()
            .then(dados => setPacotes(dados))
            .catch(() => {})
            .finally(() => setCarregando(false))
    }, [])

    function handleExcluir(id) {
        if (!window.confirm('Deseja excluir este pacote?')) return
        pacoteService.excluir(id)
            .then(() => setPacotes(prev => prev.filter(p => p.id !== id)))
            .catch(() => alert('Erro ao excluir pacote.'))
    }

    // Agora a coluna "Ações" aparece para todos (Admin e Cliente)
    const colunas = ['Nome', 'Destino', 'Preço (R$)', 'Ações']

    return (
        <PageTemplate titulo="Pacotes de Turismo">
            {usuarioLogado?.isAdmin && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Link to="/pacotes/novo" className="btn-viaggio-gold" style={{ textDecoration: 'none' }}>
                        + Novo Pacote
                    </Link>
                </div>
            )}
            {carregando ? (
                <p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando pacotes...</p>
            ) : (
                <Tabela
                    colunas={colunas}
                    dados={pacotes}
                    renderLinha={(pacote) => (
                        <tr key={pacote.id}>
                            <td>
                                <Link
                                    to={`/pacotes/${pacote.id}`}
                                    style={{ color: 'var(--ink)', textDecoration: 'none', fontFamily: "'Playfair Display', serif" }}
                                >
                                    {pacote.nome}
                                </Link>
                            </td>
                            <td>{pacote.destino ? `${pacote.destino.nome} — ${pacote.destino.pais}` : '—'}</td>
                            <td style={{ fontFamily: "'Playfair Display', serif", color: 'var(--gold)', fontWeight: 600 }}>
                                {Number(pacote.preco).toFixed(2)}
                            </td>
                            
                            {/* Lógica Nova: Admin vs Cliente */}
                            <td>
                                {usuarioLogado?.isAdmin ? (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Botao variante="outline" onClick={() => navigate(`/pacotes/${pacote.id}/editar`)}>
                                            Editar
                                        </Botao>
                                        <Botao variante="danger" onClick={() => handleExcluir(pacote.id)}>
                                            Excluir
                                        </Botao>
                                    </div>
                                ) : (
                                    <Botao onClick={() => navigate(`/reservas/nova?pacoteId=${pacote.id}`)}>
                                        Reservar
                                    </Botao>
                                )}
                            </td>
                        </tr>
                    )}
                />
            )}
        </PageTemplate>
    )
}

export default PageListaPacotes