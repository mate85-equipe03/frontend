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
  IEdital,
  IEtapa,
} from "../interfaces/Interfaces";
import BtnSubmitLoading from "../components/BtnSubmitLoading";
import InputData from "../components/InputData";
import EditalDetails from "./DetalhesEdital";
import editalService from "../services/Edital";

export default function NovoEdital() {
  const navigate = useNavigate();

  const [loadingBtn, setLoadingBtn] = React.useState<boolean>(false);
  const [novoEditalError, setNovoEditalError] = React.useState<boolean>(false);

  const [cadastroEdital, setCadastroEdital] = React.useState<ICadastroEdital>({
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

  const [datas, setDatas] = React.useState<IDatasEtapas>({
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

  const [edital, setEdital] = useState<IEdital | null>(null);

  const [etapasId, setEtapasId] = React.useState({
    //TODO: interface
    etapa_inscricao: -1,
    etapa_analise: -1,
    etapa_resultado: -1,
  });

//   [
//     {
//       "id": 16,
//       "processo_seletivo_id": 6,
//       "name": "Inscrições",
//       "data_inicio": "2023-03-14T00:00:00.000Z",
//       "data_fim": "2023-04-30T00:00:00.000Z",
//       "createdAt": "2022-11-28T00:18:09.697Z"
//   },
//   {
//       "id": 17,
//       "processo_seletivo_id": 6,
//       "name": "Análise",
//       "data_inicio": "2023-05-01T00:00:00.000Z",
//       "data_fim": "2023-06-01T00:00:00.000Z",
//       "createdAt": "2022-11-28T00:18:09.697Z"
//   },
//   {
//       "id": 18,
//       "processo_seletivo_id": 6,
//       "name": "Resultado Final",
//       "data_inicio": "2023-06-01T00:00:00.000Z",
//       "data_fim": "2023-08-01T00:00:00.000Z",
//       "createdAt": "2022-11-28T00:18:09.697Z"
//   }
// ]

  const foo = (etapas:IEtapa[]) => {
    const inscricao = etapas.find(etapa => {
      // editalService.isInscricoesAbertas(etapa);
    });
  };

  useEffect(() => {
    if (Number(editalId)) {
      getDetailsProcessoSeletivo(Number(editalId))
        .then(({ data }) => {
          // console.log(data);

          setCadastroEdital({
            ...cadastroEdital,
            titulo: data.titulo,
            descricao: data.descricao,
            semestre: data.semestre,
            edital_url: data.edital_url,
          });

          setEtapasId({
            //TODO: validar etapa (n carregar a partir da posição do array)
            etapa_inscricao: data.etapas[0].id, 
            etapa_analise: data.etapas[1].id,
            etapa_resultado: data.etapas[2].id,
          });

          setDatas({
            etapa_inscricao_inicio: dayjs(data.etapas[0].data_inicio),
            etapa_inscricao_fim: dayjs(data.etapas[0].data_fim),
            etapa_analise_inicio: dayjs(data.etapas[1].data_inicio),
            etapa_analise_fim: dayjs(data.etapas[1].data_fim),
            etapa_resultado_inicio: dayjs(data.etapas[2].data_inicio),
            etapa_resultado_fim: dayjs(data.etapas[2].data_fim),
          });
        })
        .catch()
        .finally(() => {
          // setLoadingEdital(false);
        });
    }
  }, []);



  // ========================
  // Integração
  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);

    console.log(cadastroEdital);

    if (editalId) {
      // Edição
      console.log("EDIT");

      editProsel(editalId, cadastroEdital)
        .then((data) => {
          // console.log(data);
          // setNovoEditalError(false);
          // navigate("/", { state: { novoEdital: true } });
        })
        .catch(() => {
          setNovoEditalError(true);
        })
        .finally(() => {
          setLoadingBtn(false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });

      // etapasId.map((etapaId:number) => {

      const novasDatas = {
        data_inicio: cadastroEdital.etapa_inscricao_inicio,
        data_fim: cadastroEdital.etapa_inscricao_fim,
      };

      console.log(editalId, novasDatas);

      editDatasProsel(editalId, etapasId.etapa_inscricao, novasDatas)
        .then((data) => {
          console.log(data);
        })
        .catch(() => {
          setNovoEditalError(true);
        })
        .finally(() => {
          // setLoadingBtn(false);
          // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
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
          title={(editalId ? "Editar" : "Cadastrar") + " Processo Seletivo"}
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
