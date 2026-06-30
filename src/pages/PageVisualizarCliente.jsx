import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Botao } from '../components/index.js'
import clienteService from '../services/clienteService.js'

function PageVisualizarCliente() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { usuarioLogado } = useSelector(state => state.auth)
    const [cliente, setCliente] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        if (!usuarioLogado) { navigate('/login'); return }
        if (!usuarioLogado.isAdmin && usuarioLogado.id !== Number(id)) { navigate('/'); return }
        clienteService.buscarPorId(id)
            .then(dados => setCliente(dados))
            .catch(() => navigate('/clientes'))
            .finally(() => setCarregando(false))
    }, [id])

    if (carregando) {
        return <PageTemplate><p style={{ color: 'var(--smoke)', fontStyle: 'italic' }}>Carregando...</p></PageTemplate>
    }
    if (!cliente) return null

    return (
        <PageTemplate titulo={cliente.nome}>
            <div style={{ maxWidth: '480px' }}>
                <div className="viaggio-card p-4">
                    <dl style={{ margin: 0 }}>
                        <div style={{ marginBottom: '14px' }}>
                            <dt className="form-label-viaggio">Nome</dt>
                            <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>{cliente.nome}</dd>
                        </div>
                        <div style={{ marginBottom: '14px' }}>
                            <dt className="form-label-viaggio">E-mail</dt>
                            <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>{cliente.email}</dd>
                        </div>
                        <div style={{ marginBottom: '14px' }}>
                            <dt className="form-label-viaggio">CPF</dt>
                            <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>{cliente.cpf}</dd>
                        </div>
                        <div>
                            <dt className="form-label-viaggio">Perfil</dt>
                            <dd style={{ fontFamily: "'Crimson Pro', serif", fontSize: '17px', margin: 0 }}>
                                {cliente.isAdmin ? 'Administrador' : 'Cliente'}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Botao variante="outline" onClick={() => navigate(usuarioLogado.isAdmin ? '/clientes' : '/')}>
                        ← Voltar
                    </Botao>
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageVisualizarCliente