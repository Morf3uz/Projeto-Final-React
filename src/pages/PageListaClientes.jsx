import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Tabela, Botao } from '../components/index.js'
import clienteService from '../services/clienteService.js'

function PageListaClientes() {
    const [clientes, setClientes] = useState([])
    const [carregando, setCarregando] = useState(true)
    const { usuarioLogado } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!usuarioLogado?.isAdmin) { navigate('/'); return }
        clienteService.listarTodos()
            .then(dados => setClientes(dados))
            .catch(() => {})
            .finally(() => setCarregando(false))
    }, [])

    function handleExcluir(id) {
        if (!window.confirm('Deseja excluir este cliente?')) return
        clienteService.excluir(id)
            .then(() => setClientes(prev => prev.filter(c => c.id !== id)))
            .catch(() => alert('Erro ao excluir cliente.'))
    }

    return (
        <PageTemplate titulo="Clientes">
            {carregando ? (
                <p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando clientes...</p>
            ) : (
                <Tabela
                    colunas={['Nome', 'E-mail', 'Admin', 'Ações']}
                    dados={clientes}
                    renderLinha={(cliente) => (
                        <tr key={cliente.id}>
                            <td
                                onClick={() => navigate(`/clientes/${cliente.id}`)}
                                style={{ cursor: 'pointer', fontFamily: "'Playfair Display', serif" }}
                            >
                                {cliente.nome}
                            </td>
                            <td>{cliente.email}</td>
                            <td>{cliente.isAdmin ? 'Sim' : 'Não'}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Botao variante="outline" onClick={() => navigate(`/clientes/${cliente.id}`)}>
                                        Ver
                                    </Botao>
                                    <Botao variante="danger" onClick={() => handleExcluir(cliente.id)}>
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

export default PageListaClientes