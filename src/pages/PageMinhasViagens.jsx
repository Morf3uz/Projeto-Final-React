import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Tabela } from '../components/index.js'
import reservaService from '../services/reservaService.js'

function PageMinhasViagens() {
    const [reservas, setReservas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const { usuarioLogado } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!usuarioLogado) { navigate('/login'); return }
        
        reservaService.listarTodas()
            .then(todas => setReservas(todas.filter(r => r.cliente?.id === usuarioLogado.id)))
            .catch(() => {})
            .finally(() => setCarregando(false))
    }, [usuarioLogado, navigate])

    return (
        <PageTemplate titulo="Minhas Viagens">
            {carregando ? (
                <p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando suas reservas...</p>
            ) : reservas.length === 0 ? (
                <div className="viaggio-card p-5" style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: 'var(--ink)', marginBottom: '8px' }}>
                        Nenhuma viagem reservada ainda.
                    </p>
                    <p style={{ color: 'var(--smoke)', fontSize: '16px', marginBottom: '24px' }}>
                        Explore os pacotes disponíveis e reserve sua próxima aventura.
                    </p>
                    <button className="btn-viaggio-gold" onClick={() => navigate('/pacotes')}>
                        Ver Pacotes
                    </button>
                </div>
            ) : (
                <Tabela
                    colunas={['Data da Reserva', 'Pacote', 'Valor (R$)']}
                    dados={reservas}
                    renderLinha={(reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.dataReserva}</td>
                            <td style={{ fontFamily: "'Playfair Display', serif" }}>{reserva.pacote?.nome ?? '—'}</td>
                            <td style={{ fontFamily: "'Playfair Display', serif", color: 'var(--gold)', fontWeight: 600 }}>
                                {reserva.pacote ? Number(reserva.pacote.preco).toFixed(2) : '—'}
                            </td>
                        </tr>
                    )}
                />
            )}
        </PageTemplate>
    )
}

export default PageMinhasViagens