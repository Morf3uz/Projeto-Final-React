function SelectComLabel({ label, erro, children, ...rest }) {
    return (
        <div className="mb-3">
            <label className="form-label-viaggio d-block mb-1">{label}</label>
            <select className="form-control-viaggio w-100" {...rest}>
                {children}
            </select>
            {erro && <span className="error-text d-block">{erro}</span>}
        </div>
    )
}

export default SelectComLabel