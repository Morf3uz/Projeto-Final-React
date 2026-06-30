function Botao({ variante = 'gold', children, ...rest }) {
    const cls = variante === 'outline' ? 'btn-viaggio-outline'
              : variante === 'danger'  ? 'btn btn-danger btn-sm'
              : 'btn-viaggio-gold'
    return (
        <button className={cls} {...rest}>
            {children}
        </button>
    )
}

export default Botao