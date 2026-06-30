import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../authSlice.js'

function MenuNavegacao() {
    const { usuarioLogado } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <nav className="navbar viaggio-navbar px-3 px-md-5 d-flex justify-content-between align-items-center flex-wrap gap-2 py-2">
            <Link to="/" className="viaggio-brand">✦ Viaggio</Link>

            <div className="d-flex align-items-center flex-wrap gap-1 gap-md-2">
                <NavLink to="/destinos" className={({ isActive }) => `nav-link-viaggio${isActive ? ' active' : ''}`}>
                    Destinos
                </NavLink>
                <NavLink to="/pacotes" className={({ isActive }) => `nav-link-viaggio${isActive ? ' active' : ''}`}>
                    Pacotes
                </NavLink>

                {usuarioLogado ? (
                    <>
                        <NavLink to="/minhas-viagens" className={({ isActive }) => `nav-link-viaggio${isActive ? ' active' : ''}`}>
                            Minhas Viagens
                        </NavLink>

                        {usuarioLogado.isAdmin && (
                            <>
                                <NavLink to="/cronogramas" className={({ isActive }) => `nav-link-viaggio${isActive ? ' active' : ''}`}>
                                    Cronogramas
                                </NavLink>
                                <NavLink to="/reservas" className={({ isActive }) => `nav-link-viaggio${isActive ? ' active' : ''}`}>
                                    Reservas
                                </NavLink>
                                <NavLink to="/clientes" className={({ isActive }) => `nav-link-viaggio${isActive ? ' active' : ''}`}>
                                    Clientes
                                </NavLink>
                            </>
                        )}

                        <span style={{ color: 'var(--smoke-lt)', fontSize: '13px', fontFamily: "'Crimson Pro', serif" }}>
                            {usuarioLogado.nome.split(' ')[0]}
                        </span>
                        <button className="btn-viaggio-outline" onClick={handleLogout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={({ isActive }) => `nav-link-viaggio${isActive ? ' active' : ''}`}>
                            Entrar
                        </NavLink>
                        <Link to="/cadastro" className="btn-viaggio-gold" style={{ textDecoration: 'none' }}>
                            Cadastre-se
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default MenuNavegacao