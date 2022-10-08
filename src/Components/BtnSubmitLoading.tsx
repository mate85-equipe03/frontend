import { Button } from "@mui/material";
import Loading from "./Loading";

interface IProps {
  label: string;
  formId: string;
  loading: boolean;
  fullWidth?: boolean;
}

export default function BtnSubmitLoading({
  label,
  formId,
  loading,
  fullWidth,
}: IProps) {
  return (
    <Button
      fullWidth={fullWidth}
      type="submit"
      form={formId}
      size="large"
      disabled={loading}
    >
      {loading ? <Loading /> : label}
    </Button>
  );
}

BtnSubmitLoading.defaultProps = {
  fullWidth: false,
};
