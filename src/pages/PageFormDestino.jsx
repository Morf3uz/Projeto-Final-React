import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageTemplate, Formulario, InputComLabel, TextareaComLabel, Botao } from '../components/index.js'
import destinoService from '../services/destinoService.js'

function PageFormDestino() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { usuarioLogado } = useSelector(state => state.auth)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const editando = Boolean(id)

    useEffect(() => {
        if (!usuarioLogado?.isAdmin) { navigate('/'); return }
        if (editando) {
            destinoService.buscarPorId(id)
                .then(dados => reset(dados))
                .catch(() => navigate('/destinos'))
        }
    }, [id])

    async function onSubmit(dados) {
        setCarregando(true)
        setErro(null)
        try {
            editando
                ? await destinoService.atualizar(id, dados)
                : await destinoService.cadastrar(dados)
            navigate('/destinos')
        } catch {
            setErro('Erro ao salvar destino.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <PageTemplate titulo={editando ? 'Editar Destino' : 'Novo Destino'}>
            <div style={{ maxWidth: '600px' }}>
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
                            placeholder="Nome do destino"
                            {...register('nome', { required: 'Nome obrigatório' })}
                            erro={errors.nome?.message}
                        />
                        <InputComLabel
                            label="País"
                            type="text"
                            placeholder="País"
                            {...register('pais', { required: 'País obrigatório' })}
                            erro={errors.pais?.message}
                        />
                        <InputComLabel
                            label="Categoria"
                            type="text"
                            placeholder="Ex: Praia, Montanha, Cultural..."
                            {...register('categoria')}
                            erro={errors.categoria?.message}
                        />
                        <InputComLabel
                            label="Duração (dias)"
                            type="number"
                            min="1"
                            placeholder="Ex: 7"
                            {...register('duracaoDeDias', { valueAsNumber: true })}
                            erro={errors.duracaoDeDias?.message}
                        />
                        <InputComLabel
                            label="URL da Imagem"
                            type="text"
                            placeholder="https://..."
                            {...register('imagemUrl')}
                            erro={errors.imagemUrl?.message}
                        />
                        <TextareaComLabel
                            label="Descrição"
                            placeholder="Descreva o destino..."
                            rows={4}
                            {...register('descricao')}
                            erro={errors.descricao?.message}
                        />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                            <Botao type="submit" disabled={carregando}>
                                {carregando ? 'Salvando...' : 'Salvar'}
                            </Botao>
                            <Botao variante="outline" type="button" onClick={() => navigate('/destinos')}>
                                Cancelar
                            </Botao>
                        </div>
                    </Formulario>
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageFormDestino