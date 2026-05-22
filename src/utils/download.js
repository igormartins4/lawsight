function downloadTxt(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function downloadReport(rel) {
  const data = `RELATÓRIO: ${rel.titulo}
${'='.repeat(rel.titulo.length + 11)}

Tipo: ${rel.tipo}
Data: ${rel.data}
Tamanho: ${rel.tamanho}

${rel.descricao}

--- Dados Gerados Automaticamente pelo Lawsight ---
Data de geração: ${new Date().toLocaleString('pt-BR')}
Jurimetria Trabalhista · Dados simulados para demonstração
`
  downloadTxt(`${rel.titulo.replace(/\s+/g, '_').toLowerCase()}.txt`, data)
}

export function downloadContingencia(tema, quantidade, valorMedio, cenarios) {
  const data = `RELATÓRIO DE CONTINGÊNCIA
${'='.repeat(28)}

Tema: ${tema.nome}
Descrição: ${tema.descricao}
Processos considerados: ${quantidade}
Valor médio estimado: R$ ${Number(valorMedio).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

CENÁRIOS:
- Otimista: R$ ${cenarios.otimista.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (improcedência total)
- Realista: R$ ${cenarios.realista.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (ponderação estatística)
- Pessimista: R$ ${cenarios.pessimista.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (procedência total)
- Exposição Total: R$ ${cenarios.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

Taxas do tema:
- Procedente: ${tema.procedente.toFixed(1)}%
- Parcial: ${tema.parcial.toFixed(1)}%
- Improcedente: ${tema.improcedente.toFixed(1)}%

--- Dados Gerados Automaticamente pelo Lawsight ---
Data de geração: ${new Date().toLocaleString('pt-BR')}
Jurimetria Trabalhista · Dados simulados para demonstração
`
  downloadTxt(`contingencia-${tema.id}.txt`, data)
}
