import { createBrowserRouter } from 'react-router-dom'
import {
    Page404, PageCadastro, PageHome, PageLogin,
    PageListaDestinos, PageVisualizarDestino, PageFormDestino,
    PageListaPacotes, PageVisualizarPacote, PageFormPacote,
    PageListaCronogramas, PageFormCronograma,
    PageListaReservas, PageFormReserva,
    PageListaClientes, PageVisualizarCliente,
    PageMinhasViagens,
} from './pages/index.js'

const router = createBrowserRouter([
    { path: '/',                        element: <PageHome />,               errorElement: <Page404 /> },
    { path: '/login',                   element: <PageLogin /> },
    { path: '/cadastro',                element: <PageCadastro /> },
    { path: '/destinos',                element: <PageListaDestinos /> },
    { path: '/destinos/novo',           element: <PageFormDestino /> },
    { path: '/destinos/:id',            element: <PageVisualizarDestino /> },
    { path: '/destinos/:id/editar',     element: <PageFormDestino /> },
    { path: '/pacotes',                 element: <PageListaPacotes /> },
    { path: '/pacotes/novo',            element: <PageFormPacote /> },
    { path: '/pacotes/:id',             element: <PageVisualizarPacote /> },
    { path: '/pacotes/:id/editar',      element: <PageFormPacote /> },
    { path: '/cronogramas',             element: <PageListaCronogramas /> },
    { path: '/cronogramas/novo',        element: <PageFormCronograma /> },
    { path: '/cronogramas/:id/editar',  element: <PageFormCronograma /> },
    { path: '/reservas',                element: <PageListaReservas /> },
    { path: '/reservas/nova',           element: <PageFormReserva /> },
    { path: '/reservas/:id/editar',     element: <PageFormReserva /> },
    { path: '/clientes',                element: <PageListaClientes /> },
    { path: '/clientes/:id',            element: <PageVisualizarCliente /> },
    { path: '/minhas-viagens',          element: <PageMinhasViagens /> },
])

export default router