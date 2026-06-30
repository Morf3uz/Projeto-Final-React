import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Formulario, TextareaComLabel, InputComLabel, SelectComLabel, Botao } from '../components/index.js'
import cronogramaService from '../services/cronogramaService.js'
import pacoteService from '../services/pacoteService.js'

function PageFormCronograma() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { usuarioLogado } = useSelector(state => state.auth)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [pacotes, setPacotes] = useState([])
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const editando = Boolean(id)

    useEffect(() => {
        if (!usuarioLogado?.isAdmin) { navigate('/'); return }
        pacoteService.listarTodos().then(p => setPacotes(p)).catch(() => {})
        if (editando) {
            cronogramaService.buscarPorId(id)
                .then(dados => reset({ descricao: dados.descricao, horario: dados.horario, pacoteId: dados.pacote?.id }))
                .catch(() => navigate('/cronogramas'))
        }
    }, [id])

    async function onSubmit(dados) {
        setCarregando(true)
        setErro(null)
        try {
            const payload = { ...dados, pacoteId: Number(dados.pacoteId) }
            editando
                ? await cronogramaService.atualizar(id, payload)
                : await cronogramaService.cadastrar(payload)
            navigate('/cronogramas')
        } catch {
            setErro('Erro ao salvar cronograma.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <PageTemplate titulo={editando ? 'Editar Cronograma' : 'Novo Cronograma'}>
            <div style={{ maxWidth: '540px' }}>
                <div className="viaggio-card p-4">
                    {erro && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px' }}>
                            <span className="error-text">{erro}</span>
                        </div>
                    )}
                    <Formulario onSubmit={handleSubmit(onSubmit)}>
                        <TextareaComLabel
                            label="Descrição"
                            placeholder="Descreva o cronograma..."
                            rows={3}
                            {...register('descricao', { required: 'Descrição obrigatória' })}
                            erro={errors.descricao?.message}
                        />
                        <InputComLabel
                            label="Horário"
                            type="text"
                            placeholder="Ex: 08:00 — 20/07/2025"
                            {...register('horario', { required: 'Horário obrigatório' })}
                            erro={errors.horario?.message}
                        />
                        <SelectComLabel
                            label="Pacote"
                            {...register('pacoteId', { required: 'Selecione um pacote' })}
                            erro={errors.pacoteId?.message}
                        >
                            <option value="">Selecione um pacote...</option>
                            {pacotes.map(p => (
                                <option key={p.id} value={p.id}>{p.nome}</option>
                            ))}
                        </SelectComLabel>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                            <Botao type="submit" disabled={carregando}>
                                {carregando ? 'Salvando...' : 'Salvar'}
                            </Botao>
                            <Botao variante="outline" type="button" onClick={() => navigate('/cronogramas')}>
                                Cancelar
                            </Botao>
                        </div>
                    </Formulario>
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageFormCronograma