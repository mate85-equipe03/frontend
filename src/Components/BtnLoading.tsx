import { Button } from "@mui/material";
import Loading from "./Loading";

type clickFuntion = () => void;

interface IProps {
  label: string;
  loading: boolean;
  fullWidth?: boolean;
  handleClick: clickFuntion;
}

export default function BtnLoading({
  label,
  loading,
  fullWidth,
  handleClick,
}: IProps) {
  return (
    <Button
      fullWidth={fullWidth}
      type="button"
      size="large"
      disabled={loading}
      onClick={() => handleClick()}
    >
      {loading ? <Loading /> : label}
    </Button>
  );
}

BtnLoading.defaultProps = {
  fullWidth: false,
};
