import { Grid, Button, CardActions } from "@mui/material";
import Loading from "./Loading";

interface IProps {
  label: string;
  formId: string;
  loading: boolean;
}

export default function BtnSubmitLoading({ label, formId, loading }: IProps) {
  return (
    <CardActions sx={{ px: { xs: 5, sm: 10 } }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Button
          fullWidth
          type="submit"
          form-id={formId}
          size="large"
          disabled={loading}
        >
          {loading ? <Loading /> : label}
        </Button>
      </Grid>
    </CardActions>
  );
}
