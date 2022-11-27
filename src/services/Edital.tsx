import { EtapasEnum } from "../enums/Enums";
import { IEdital, IEtapa } from "../interfaces/Interfaces";

const editalService = {
  
  // TODO: Pegar IDs corretos com o back
  etapaAtual(etapaAtual: IEtapa, edital: IEdital): EtapasEnum {
    switch (etapaAtual.id) {
      case 0:
        return EtapasEnum.INSCRICOES_ABERTAS;
      case 1:
        return EtapasEnum.ANALISE_DE_INSCRICOES;
      case 2:
        return edital.arquivado ? EtapasEnum.RESULTADO_FINAL : EtapasEnum.ERROR;
      default: {
        return EtapasEnum.ERROR;
      }
    }
  },

  isInscricoesAbertas(etapaAtual: IEtapa, edital: IEdital): boolean {
    return (
      this.etapaAtual(etapaAtual, edital) === EtapasEnum.INSCRICOES_ABERTAS
    );
  },

  isAnaliseDeInsricoes(etapaAtual: IEtapa, edital: IEdital): boolean {
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
