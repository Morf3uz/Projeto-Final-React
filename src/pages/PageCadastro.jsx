import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import clienteService from '../services/clienteService.js'
import Botao from '../components/Botao.jsx'
import Formulario from '../components/Formulario.jsx'
import InputComLabel from '../components/InputComLabel.jsx'
import PageTemplate from '../components/PageTemplate.jsx'

function PageCadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)

    const formatarCPF = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    async function onSubmit(dados) {
        setCarregando(true)
        setErro(null)
        try {
            await clienteService.cadastrar(dados)
            navigate('/login')
        } catch {
            setErro('Erro ao cadastrar. CPF ou e-mail já podem estar em uso.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <PageTemplate titulo="Criar Conta">
            <div style={{ maxWidth: '540px', margin: '0 auto' }}>
                <div className="viaggio-card p-4 p-md-5">
                    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: 'var(--gold)', marginBottom: '6px' }}>
                            ✦ Viaggio
                        </div>
                        <p style={{ color: 'var(--smoke)', fontSize: '15px', margin: 0 }}>
                            Preencha os dados para criar sua conta
                        </p>
                    </div>

                    {erro && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', textAlign: 'center' }}>
                            <span className="error-text">{erro}</span>
                        </div>
                    )}

                    <Formulario onSubmit={handleSubmit(onSubmit)}>
                        <InputComLabel
                            label="Nome completo"
                            type="text"
                            placeholder="Seu nome completo"
                            {...register('nome', { required: 'Nome obrigatório' })}
                            erro={errors.nome?.message}
                        />
                        <InputComLabel
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            {...register('email', { required: 'E-mail obrigatório' })}
                            erro={errors.email?.message}
                        />
                        <InputComLabel
                            label="CPF"
                            type="text"
                            placeholder="000.000.000-00"
                            {...register('cpf', { 
                                required: 'CPF obrigatório',
                                onChange: (e) => e.target.value = formatarCPF(e.target.value)
                            })}
                            erro={errors.cpf?.message}
                        />
                        <InputComLabel
                            label="Senha"
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Crie uma senha"
                            {...register('senha', {
                                required: 'Senha obrigatória',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            erro={errors.senha?.message}
                        />
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-10px', marginBottom: '15px' }}>
                            <input 
                                type="checkbox" 
                                id="mostrarSenhaCadastro" 
                                checked={mostrarSenha}
                                onChange={() => setMostrarSenha(!mostrarSenha)}
                                style={{ cursor: 'pointer', accentColor: 'var(--gold)' }}
                            />
                            <label htmlFor="mostrarSenhaCadastro" style={{ color: 'var(--smoke)', fontSize: '14px', cursor: 'pointer' }}>
                                Mostrar senha
                            </label>
                        </div>

                        <div className="mt-4">
                            <Botao type="submit" disabled={carregando} style={{ width: '100%' }}>
                                {carregando ? 'Criando conta...' : 'Criar conta'}
                            </Botao>
                        </div>
                    </Formulario>

                    <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--smoke)', fontSize: '15px', marginBottom: 0 }}>
                        Já tem conta?{' '}
                        <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </PageTemplate>
    )
}

export default PageCadastro