function TextareaComLabel({ label, erro, rows = 3, ...rest }) {
    return (
        <div className="mb-3">
            <label className="form-label-viaggio d-block mb-1">{label}</label>
            <textarea className="form-control-viaggio w-100" rows={rows} {...rest} />
            {erro && <span className="error-text d-block">{erro}</span>}
        </div>
    )
}

export default TextareaComLabel