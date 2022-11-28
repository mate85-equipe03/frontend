import { EtapasEnum, NomesEtapasEnum } from "../enums/Enums";
import { IEtapa } from "../interfaces/Interfaces";

const editalService = {
  etapaAtual(etapaAtual: IEtapa): EtapasEnum {
    switch (etapaAtual.name) {
      case "Inscrições em breve":
        return EtapasEnum.ANTES_DAS_INSCRICOES;
      case "Inscrições":
        return EtapasEnum.INSCRICOES_ABERTAS;
      case "Análise":
        return EtapasEnum.ANALISE_DE_INSCRICOES;
      case "Resultado Final em breve":
        return EtapasEnum.RESULTADO_EM_BREVE;
      case "Resultado Final":
        return EtapasEnum.RESULTADO_DISPONIVEL;
      default: {
        return EtapasEnum.ERROR;
      }
    }
  },

  nomeDaEtapa(etapa: EtapasEnum): NomesEtapasEnum {
    switch (etapa) {
      case EtapasEnum.ANTES_DAS_INSCRICOES:
        return NomesEtapasEnum.ANTES_DAS_INSCRICOES;
      case EtapasEnum.INSCRICOES_ABERTAS:
        return NomesEtapasEnum.INSCRICOES_ABERTAS;
      case EtapasEnum.ANALISE_DE_INSCRICOES:
        return NomesEtapasEnum.ANALISE_DE_INSCRICOES;
      case EtapasEnum.RESULTADO_EM_BREVE:
        return NomesEtapasEnum.RESULTADO_EM_BREVE;
      case EtapasEnum.RESULTADO_DISPONIVEL:
        return NomesEtapasEnum.RESULTADO_FINAL;
      default: {
        return NomesEtapasEnum.ERROR;
      }
    }
  },

  nomeDaEtapaRaw(etapa: IEtapa): NomesEtapasEnum {
    const etapaEnum = editalService.etapaAtual(etapa);
    return editalService.nomeDaEtapa(etapaEnum);
  },

  isInscricoesEmBreve(etapaAtual: IEtapa): boolean {
    return this.etapaAtual(etapaAtual) === EtapasEnum.ANTES_DAS_INSCRICOES;
  },

  isInscricoesAbertas(etapaAtual: IEtapa): boolean {
    return this.etapaAtual(etapaAtual) === EtapasEnum.INSCRICOES_ABERTAS;
  },

  isAnaliseDeInscricoes(etapaAtual: IEtapa): boolean {
    return this.etapaAtual(etapaAtual) === EtapasEnum.ANALISE_DE_INSCRICOES;
  },

  isResultadoEmBreve(etapaAtual: IEtapa): boolean {
    return this.etapaAtual(etapaAtual) === EtapasEnum.RESULTADO_EM_BREVE;
  },

  isResultadoDisponivel(etapaAtual: IEtapa): boolean {
    return this.etapaAtual(etapaAtual) === EtapasEnum.RESULTADO_DISPONIVEL;
  },

  isEtapaValida(etapaAtual: IEtapa, etapasValidas: EtapasEnum[]): boolean {
    return etapasValidas.includes(this.etapaAtual(etapaAtual));
  },
};

export default editalService;
