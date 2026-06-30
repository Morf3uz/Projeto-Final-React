import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Formulario, InputComLabel, SelectComLabel, Botao } from '../components/index.js'
import reservaService from '../services/reservaService.js'
import pacoteService from '../services/pacoteService.js'

function PageFormReserva() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const pacoteIdUrl = searchParams.get('pacoteId') 
    
    const navigate = useNavigate()
    const { usuarioLogado } = useSelector(state => state.auth)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [pacotes, setPacotes] = useState([])
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const editando = Boolean(id)

    useEffect(() => {
        // Nova trava de segurança: Se o usuário não estiver logado, redireciona para o login
        if (!usuarioLogado) {
            navigate('/login')
            return
        }
        
        pacoteService.listarTodos().then(p => setPacotes(p)).catch(() => {})
        
        if (editando) {
            reservaService.buscarPorId(id)
                .then(dados => reset({
                    dataReserva: dados.dataReserva,
                    clienteId: dados.cliente?.id,
                    pacoteId: dados.pacote?.id,
                }))
                .catch(() => navigate('/minhas-viagens'))
        } else if (pacoteIdUrl) {
            reset({ pacoteId: pacoteIdUrl })
        }
    }, [id, pacoteIdUrl, reset, navigate, usuarioLogado])

    async function onSubmit(dados) {
        setCarregando(true)
        setErro(null)
        try {
            const idDoCliente = usuarioLogado?.isAdmin && dados.clienteId 
                ? Number(dados.clienteId) 
                : usuarioLogado.id

            const payload = { 
                ...dados, 
                clienteId: idDoCliente, 
                pacoteId: Number(dados.pacoteId) 
            }

            editando
                ? await reservaService.atualizar(id, payload)
                : await reservaService.cadastrar(payload)
                
            navigate('/minhas-viagens')
        } catch {
            setErro('Erro ao salvar reserva. Verifique se escolheu uma data válida.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <PageTemplate titulo={editando ? 'Editar Reserva' : 'Nova Reserva'}>
            <div style={{ maxWidth: '540px', margin: '0 auto' }}>
                <div className="viaggio-card p-4">
                    {erro && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px' }}>
                            <span className="error-text">{erro}</span>
                        </div>
                    )}
                    <Formulario onSubmit={handleSubmit(onSubmit)}>
                        <InputComLabel
                            label="Data da Reserva"
                            type="date"
                            {...register('dataReserva', { required: 'Data obrigatória' })}
                            erro={errors.dataReserva?.message}
                        />
                        
                        {/* Campo oculto para clientes comuns, visível apenas para Admins */}
                        {usuarioLogado?.isAdmin && (
                            <InputComLabel
                                label="ID do Cliente"
                                type="number"
                                min="1"
                                placeholder="ID numérico do cliente"
                                {...register('clienteId', { 
                                    required: editando ? 'Cliente obrigatório' : false 
                                })}
                                erro={errors.clienteId?.message}
                            />
                        )}

                        <SelectComLabel
                            label="Pacote"
                            {...register('pacoteId', { required: 'Selecione um pacote' })}
                            erro={errors.pacoteId?.message}
                        >
                            <option value="">Selecione um pacote...</option>
                            {pacotes.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nome} — R$ {Number(p.preco).toFixed(2)}
                                </option>
                            ))}
                        </SelectComLabel>
                        
                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <Botao type="submit" disabled={carregando}>
                                {carregando ? 'Processando...' : 'Confirmar Reserva'}
                            </Botao>
                            <Botao variante="outline" type="button" onClick={() => navigate(usuarioLogado?.isAdmin ? '/reservas' : '/pacotes')}>
                                Cancelar
                            </Botao>
                        </div>
                    </Formulario>
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageFormReserva