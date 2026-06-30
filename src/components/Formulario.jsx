function Formulario({ onSubmit, children }) {
    return (
        <form onSubmit={onSubmit} noValidate>
            {children}
        </form>
    )
}

export default Formulario