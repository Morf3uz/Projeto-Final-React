import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Tabela, Botao } from '../components/index.js'
import reservaService from '../services/reservaService.js'

function PageListaReservas() {
    const [reservas, setReservas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const { usuarioLogado } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!usuarioLogado?.isAdmin) { navigate('/'); return }
        reservaService.listarTodas()
            .then(dados => setReservas(dados))
            .catch(() => {})
            .finally(() => setCarregando(false))
    }, [])

    function handleExcluir(id) {
        if (!window.confirm('Deseja excluir esta reserva?')) return
        reservaService.excluir(id)
            .then(() => setReservas(prev => prev.filter(r => r.id !== id)))
            .catch(() => alert('Erro ao excluir reserva.'))
    }

    return (
        <PageTemplate titulo="Reservas">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Link to="/reservas/nova" className="btn-viaggio-gold" style={{ textDecoration: 'none' }}>
                    + Nova Reserva
                </Link>
            </div>
            {carregando ? (
                <p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando reservas...</p>
            ) : (
                <Tabela
                    colunas={['Data', 'Cliente', 'Pacote', 'Valor (R$)', 'Ações']}
                    dados={reservas}
                    renderLinha={(reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.dataReserva}</td>
                            <td>{reserva.cliente?.nome ?? '—'}</td>
                            <td>{reserva.pacote?.nome ?? '—'}</td>
                            <td style={{ fontFamily: "'Playfair Display', serif", color: 'var(--gold)', fontWeight: 600 }}>
                                {reserva.pacote ? Number(reserva.pacote.preco).toFixed(2) : '—'}
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Botao variante="outline" onClick={() => navigate(`/reservas/${reserva.id}/editar`)}>
                                        Editar
                                    </Botao>
                                    <Botao variante="danger" onClick={() => handleExcluir(reserva.id)}>
                                        Excluir
                                    </Botao>
                                </div>
                            </td>
                        </tr>
                    )}
                />
            )}
        </PageTemplate>
    )
}

export default PageListaReservas