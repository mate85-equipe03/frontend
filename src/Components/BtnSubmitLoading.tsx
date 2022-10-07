import { Grid, Button, CardActions } from "@mui/material";
import Loading from "./Loading";

interface IProps {
  label: string;
  form: string;
  loading: boolean;
}
//   export default function EditalItem({ edital, onClick }: IProps) {

export default function BtnSubmitLoading({ label, form, loading }: IProps) {
  return (
    <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Button
          fullWidth
          type="submit"
          form={form}
          size="large"
          disabled={loading}
        >
          {loading ? <Loading /> : label}
        </Button>
      </Grid>
    </CardActions>
  );
}
