import { Grid, Button, CardActions } from "@mui/material";
import Loading from "./Loading";

interface IProps {
  label: string;
  form: string;
  loading: boolean;
}
//   export default function EditalItem({ edital, onClick }: IProps) {

export function BtnSubmitLoading(props: IProps) {
  return (
    <CardActions sx={{px: { xs: 5, sm: 10 } }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Button
          fullWidth
          type="submit"
          form={props.form}
          size="large"
          disabled={props.loading}
        >
          {props.loading ? <Loading /> : props.label}
        </Button>
      </Grid>
    </CardActions>
  );
}
