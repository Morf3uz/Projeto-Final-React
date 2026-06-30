function InputComLabel({ label, erro, ...rest }) {
    return (
        <div className="mb-3">
            <label className="form-label-viaggio d-block mb-1">{label}</label>
            <input className="form-control-viaggio w-100" {...rest} />
            {erro && <span className="error-text d-block">{erro}</span>}
        </div>
    )
}

export default InputComLabel