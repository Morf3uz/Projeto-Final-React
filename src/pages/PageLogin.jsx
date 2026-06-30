import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginSuccess } from '../authSlice.js'
import loginService from '../services/loginService.js'
import Botao from '../components/Botao.jsx'
import Formulario from '../components/Formulario.jsx'
import InputComLabel from '../components/InputComLabel.jsx'

function PageLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)

    async function onSubmit(dados) {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await loginService.login(dados)
            const tokenJWT = resposta.token
            dispatch(loginSuccess({ token: tokenJWT, usuario: resposta.usuario }))
            localStorage.setItem('token', tokenJWT)
            localStorage.setItem('usuarioLogado', JSON.stringify(resposta.usuario))
            navigate('/')
        } catch {
            setErro('E-mail ou senha inválidos.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 16px'
        }}>
            <div className="viaggio-card p-4 p-md-5" style={{ width: '100%', maxWidth: '420px' }}>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>
                        ✦ Viaggio
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: 'var(--ink)', marginBottom: '6px' }}>
                        Bem-vindo de volta
                    </h1>
                    <p style={{ color: 'var(--smoke)', fontSize: '15px', margin: 0 }}>
                        Acesse sua conta para continuar
                    </p>
                </div>

                {erro && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', textAlign: 'center' }}>
                        <span className="error-text">{erro}</span>
                    </div>
                )}

                <Formulario onSubmit={handleSubmit(onSubmit)}>
                    <InputComLabel
                        label="E-mail"
                        type="email"
                        placeholder="seu@email.com"
                        {...register('email', { required: 'E-mail obrigatório' })}
                        erro={errors.email?.message}
                    />
                    <InputComLabel
                        label="Senha"
                        type="password"
                        placeholder="Sua senha"
                        {...register('senha', { required: 'Senha obrigatória' })}
                        erro={errors.senha?.message}
                    />
                    <div className="mt-4">
                        <Botao type="submit" disabled={carregando} style={{ width: '100%' }}>
                            {carregando ? 'Entrando...' : 'Entrar'}
                        </Botao>
                    </div>
                </Formulario>

                <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--smoke)', fontSize: '15px', marginBottom: 0 }}>
                    Não tem conta?{' '}
                    <Link to="/cadastro" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default PageLogin