import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Formulario, InputComLabel, SelectComLabel, Botao } from '../components/index.js'
import pacoteService from '../services/pacoteService.js'
import destinoService from '../services/destinoService.js'

function PageFormPacote() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { usuarioLogado } = useSelector(state => state.auth)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [destinos, setDestinos] = useState([])
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const editando = Boolean(id)

    useEffect(() => {
        if (!usuarioLogado?.isAdmin) { navigate('/'); return }
        destinoService.listarTodos().then(d => setDestinos(d)).catch(() => {})
        if (editando) {
            pacoteService.buscarPorId(id)
                .then(dados => reset({ nome: dados.nome, preco: dados.preco, destinoId: dados.destino?.id }))
                .catch(() => navigate('/pacotes'))
        }
    }, [id])

    async function onSubmit(dados) {
        setCarregando(true)
        setErro(null)
        try {
            const payload = { ...dados, preco: Number(dados.preco), destinoId: Number(dados.destinoId) }
            editando
                ? await pacoteService.atualizar(id, payload)
                : await pacoteService.cadastrar(payload)
            navigate('/pacotes')
        } catch {
            setErro('Erro ao salvar pacote.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <PageTemplate titulo={editando ? 'Editar Pacote' : 'Novo Pacote'}>
            <div style={{ maxWidth: '540px' }}>
                <div className="viaggio-card p-4">
                    {erro && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px' }}>
                            <span className="error-text">{erro}</span>
                        </div>
                    )}
                    <Formulario onSubmit={handleSubmit(onSubmit)}>
                        <InputComLabel
                            label="Nome"
                            type="text"
                            placeholder="Nome do pacote"
                            {...register('nome', { required: 'Nome obrigatório' })}
                            erro={errors.nome?.message}
                        />
                        <InputComLabel
                            label="Preço (R$)"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Ex: 1500.00"
                            {...register('preco', { required: 'Preço obrigatório' })}
                            erro={errors.preco?.message}
                        />
                        <SelectComLabel
                            label="Destino"
                            {...register('destinoId', { required: 'Selecione um destino' })}
                            erro={errors.destinoId?.message}
                        >
                            <option value="">Selecione um destino...</option>
                            {destinos.map(d => (
                                <option key={d.id} value={d.id}>{d.nome} — {d.pais}</option>
                            ))}
                        </SelectComLabel>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                            <Botao type="submit" disabled={carregando}>
                                {carregando ? 'Salvando...' : 'Salvar'}
                            </Botao>
                            <Botao variante="outline" type="button" onClick={() => navigate('/pacotes')}>
                                Cancelar
                            </Botao>
                        </div>
                    </Formulario>
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageFormPacote