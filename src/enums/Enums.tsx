/* eslint-disable no-shadow */

export enum EtapasEnum {
  ERROR,
  ANTES_DAS_INSCRICOES,
  INSCRICOES_ABERTAS,
  ANALISE_DE_INSCRICOES,
  RESULTADO_EM_BREVE, // Se já está no período de resultados, mas o professor ainda não liberou o resultado
  RESULTADO_DISPONIVEL,
}

export enum NomesEtapasEnum {
  ERROR = "",
  ANTES_DAS_INSCRICOES = "Inscrições em Breve",
  INSCRICOES_ABERTAS = "Inscrições Abertas",
  ANALISE_DE_INSCRICOES = "Análise de Inscrições",
  RESULTADO_EM_BREVE = "Resultado em Breve",
  RESULTADO_FINAL = "Resultado Disponível",
}
