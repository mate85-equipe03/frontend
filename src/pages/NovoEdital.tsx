import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  CardActions,
  Typography,
  Alert,
} from "@mui/material";

import { PatternFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { NomesEtapasEnum } from "../enums/Enums";
import {
  getDetailsProcessoSeletivo,
  postNovoProsel,
  editProsel,
  editDatasProsel,
} from "../services/Api";
import {
  IDatasEtapas,
  ICadastroEdital,
  IEtapa,
} from "../interfaces/Interfaces";
import BtnSubmitLoading from "../components/BtnSubmitLoading";
import InputData from "../components/InputData";
import editalService from "../services/Edital";

export default function NovoEdital() {
  const navigate = useNavigate();

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [novoEditalError, setNovoEditalError] = useState<boolean>(false);
  const [cadastroEdital, setCadastroEdital] = useState<ICadastroEdital>({
    titulo: "",
    descricao: "",
    semestre: "",
    edital_url: "",
    etapa_inscricao_inicio: "",
    etapa_inscricao_fim: "",
    etapa_analise_inicio: "",
    etapa_analise_fim: "",
    etapa_resultado_inicio: "",
    etapa_resultado_fim: "",
  });

  const [datas, setDatas] = useState<IDatasEtapas>({
    etapa_inscricao_inicio: null,
    etapa_inscricao_fim: null,
    etapa_analise_inicio: null,
    etapa_analise_fim: null,
    etapa_resultado_inicio: null,
    etapa_resultado_fim: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCadastroEdital({
      ...cadastroEdital,
      [event.target.name]: event.target.value,
    });
  };

  const formatData = (data: Dayjs | null) => {
    return data ? data.format("YYYY/MM/DD") : "";
  };

  useEffect(() => {
    // Formata datas
    setCadastroEdital((prevState) => {
      return {
        ...prevState,
        etapa_inscricao_inicio: formatData(datas.etapa_inscricao_inicio),
        etapa_inscricao_fim: formatData(datas.etapa_inscricao_fim),
        etapa_analise_inicio: formatData(datas.etapa_analise_inicio),
        etapa_analise_fim: formatData(datas.etapa_analise_fim),
        etapa_resultado_inicio: formatData(datas.etapa_resultado_inicio),
        etapa_resultado_fim: formatData(datas.etapa_resultado_fim),
      };
    });
  }, [datas]);

  // ==============================
  // Edição
  const { editalId } = useParams();

  const [etapasId, setEtapasId] = React.useState({
    // TODO: interface
    etapa_inscricao: -1,
    etapa_analise: -1,
    etapa_resultado: -1,
  });

  const formatEtapas = (etapas: IEtapa[]) => {
    const inscricao = etapas.find((etapa) =>
      editalService.isInscricoesAbertas(etapa)
    );
    const analise = etapas.find((etapa) =>
      editalService.isAnaliseDeInscricoes(etapa)
    );
    const resultado = etapas.find((etapa) =>
      editalService.isResultadoDisponivel(etapa)
    );
    return { inscricao, analise, resultado };
  };

  useEffect(() => {
    if (Number(editalId)) {
      //Loading 

      getDetailsProcessoSeletivo(Number(editalId))
        .then(({ data }) => {
          const etapas = formatEtapas(data.etapas);

          setCadastroEdital({
            ...cadastroEdital,
            titulo: data.titulo,
            descricao: data.descricao,
            semestre: data.semestre,
            edital_url: data.edital_url,
          });

          if (
            etapas &&
            etapas.inscricao &&
            etapas.analise &&
            etapas.resultado
          ) {
            setEtapasId({
              etapa_inscricao: etapas.inscricao.id,
              etapa_analise: etapas.analise.id,
              etapa_resultado: etapas.resultado.id,
            });

            setDatas({
              etapa_inscricao_inicio: dayjs(etapas.inscricao.data_fim),
              etapa_inscricao_fim: dayjs(etapas.inscricao.data_fim),
              etapa_analise_inicio: dayjs(etapas.analise.data_inicio),
              etapa_analise_fim: dayjs(etapas.analise.data_fim),
              etapa_resultado_inicio: dayjs(etapas.resultado.data_inicio),
              etapa_resultado_fim: dayjs(etapas.resultado.data_fim),
            });
          }
        })
        .catch()
        .finally(() => {
          // setLoadingEdital(false);
        });
    }
  },[]);

  // ========================
  // Integração
  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);

    if (editalId) {
      // Edição

      editProsel(editalId, cadastroEdital)
        .then(() => {
          // setNovoEditalError(false);
          // navigate("/", { state: { updateEdital: true } });
        })
        .catch(() => {
          setNovoEditalError(true);
        })
        .finally(() => {
          setLoadingBtn(false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });

      const editDatas = (
        // melhoria: passar etapa e filtrar id e nome
        etapaId: number,
        dataInicio: string,
        dataFim: string
        // SETLOADING
      ) => {
        // setLoading
        const novasDatas = {
          data_inicio: dataInicio,
          data_fim: dataFim,
        };

        editDatasProsel(editalId, etapaId, novasDatas)
          .then(() => {
            // console.log(data);
          })
          .catch(() => {
            setNovoEditalError(true);
          })
          .finally(() => {
            // setLoadingBtn(false);
            // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          });
      };

      editDatas(
        etapasId.etapa_inscricao,
        cadastroEdital.etapa_inscricao_inicio,
        cadastroEdital.etapa_inscricao_fim
      );

      editDatas(
        etapasId.etapa_analise,
        cadastroEdital.etapa_analise_inicio,
        cadastroEdital.etapa_analise_fim
      );

      editDatas(
        etapasId.etapa_resultado,
        cadastroEdital.etapa_resultado_inicio,
        cadastroEdital.etapa_resultado_fim
      );

      // TODO: redirect ao final de todas as requisições
    } else {
      // Criação
      postNovoProsel(cadastroEdital)
        .then(() => {
          setNovoEditalError(false);
          navigate("/", { state: { novoEdital: true } });
        })
        .catch(() => {
          setNovoEditalError(true);
        })
        .finally(() => {
          setLoadingBtn(false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    }
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {novoEditalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Ocorreu um erro. Tente novamente.
        </Alert>
      )}
      <Card sx={{ minWidth: 275, maxWidth: 500, pb: 4 }}>
        <CardHeader
          title={`${editalId ? "Editar" : "Cadastrar"} Processo Seletivo`}
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />
        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <form id="novo-edital-form" onSubmit={sendForm}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="titulo">Título</InputLabel>
              <OutlinedInput
                id="titulo"
                name="titulo"
                label="Título"
                placeholder="Digite o título do edital"
                type="text"
                value={cadastroEdital.titulo}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="descricao">Descrição</InputLabel>
              <OutlinedInput
                id="descricao"
                name="descricao"
                label="Descrição"
                placeholder="Digite a descrição do edital"
                type="text"
                value={cadastroEdital.descricao}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="Semestre Vigente">
                Semestre Vigente
              </InputLabel>
              <PatternFormat
                id="semestre"
                name="semestre"
                label="Semestre Vigente"
                placeholder="Digite o semestre vigente"
                type="text"
                value={cadastroEdital.semestre}
                onChange={handleChange}
                format="####.#"
                mask="_"
                customInput={OutlinedInput}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="edital_url">URL do Edital</InputLabel>
              <OutlinedInput
                id="edital_url"
                name="edital_url"
                label="URL do Edital"
                placeholder="Digite a URL do edital"
                type="url"
                value={cadastroEdital.edital_url}
                onChange={handleChange}
              />
            </FormControl>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Etapas
            </Typography>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}>
                {NomesEtapasEnum.INSCRICOES_ABERTAS}
              </Typography>
              <InputData
                datas={datas}
                setDatas={setDatas}
                etapa="etapa_inscricao"
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}>
                {NomesEtapasEnum.ANALISE_DE_INSCRICOES}
              </Typography>
              <InputData
                datas={datas}
                setDatas={setDatas}
                etapa="etapa_analise"
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <Typography sx={{ pb: 1 }}>
                {NomesEtapasEnum.RESULTADO_FINAL}
              </Typography>
              <InputData
                datas={datas}
                setDatas={setDatas}
                etapa="etapa_resultado"
              />
            </FormControl>
          </form>
        </CardContent>
        <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <BtnSubmitLoading
              label="Enviar"
              formId="novo-edital-form"
              loading={loadingBtn}
              fullWidth
            />
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
