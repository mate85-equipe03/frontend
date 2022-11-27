import { EtapasEnum, NomesEtapasEnum } from "../enums/Enums";
import { IEdital, IEtapa } from "../interfaces/Interfaces";

const editalService = {
  etapaAtual(etapaAtual: IEtapa, edital: IEdital): EtapasEnum {
    switch (etapaAtual.name) {
      case "Inscrições":
        return EtapasEnum.INSCRICOES_ABERTAS;
      case "Análise":
        return EtapasEnum.ANALISE_DE_INSCRICOES;
      case "Resultado Final":
        return edital.arquivado ? EtapasEnum.RESULTADO_FINAL : EtapasEnum.ERROR;
      default: {
        return EtapasEnum.ERROR;
      }
    }
  },

  nomeDaEtapa(etapaAtual: EtapasEnum): NomesEtapasEnum {
    switch (etapaAtual) {
      case EtapasEnum.INSCRICOES_ABERTAS:
        return NomesEtapasEnum.INSCRICOES_ABERTAS;
      case EtapasEnum.ANALISE_DE_INSCRICOES:
        return NomesEtapasEnum.ANALISE_DE_INSCRICOES;
      case EtapasEnum.RESULTADO_FINAL:
        return NomesEtapasEnum.RESULTADO_FINAL;
      default: {
        return NomesEtapasEnum.ERROR;
      }
    }
  },

  isInscricoesAbertas(etapaAtual: IEtapa, edital: IEdital): boolean {
    return (
      this.etapaAtual(etapaAtual, edital) === EtapasEnum.INSCRICOES_ABERTAS
    );
  },

  isAnaliseDeInscricoes(etapaAtual: IEtapa, edital: IEdital): boolean {
    return (
      this.etapaAtual(etapaAtual, edital) === EtapasEnum.ANALISE_DE_INSCRICOES
    );
  },

  isResultadoFinal(etapaAtual: IEtapa, edital: IEdital): boolean {
    return this.etapaAtual(etapaAtual, edital) === EtapasEnum.RESULTADO_FINAL;
  },

  isEtapaValida(
    etapaAtual: IEtapa,
    edital: IEdital,
    etapasValidas: EtapasEnum[]
  ): boolean {
    return etapasValidas.includes(this.etapaAtual(etapaAtual, edital));
  },
};

export default editalService;
