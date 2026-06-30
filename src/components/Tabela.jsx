function Tabela({ colunas, dados, renderLinha }) {
    return (
        <div className="table-responsive">
            <table className="table viaggio-table w-100 mb-0">
                <thead>
                    <tr>
                        {colunas.map((col, i) => (
                            <th key={i}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dados.length === 0 ? (
                        <tr>
                            <td
                                colSpan={colunas.length}
                                style={{ textAlign: 'center', color: 'var(--smoke-lt)', fontStyle: 'italic', padding: '28px' }}
                            >
                                Nenhum registro encontrado.
                            </td>
                        </tr>
                    ) : (
                        dados.map((item, i) => renderLinha(item, i))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Tabela