import { CSSProperties } from "react";
import { PacmanLoader  } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export type SpinnerProps = {
  color?: string;
  size?: number;
  loading?: boolean;
};

export function Spinner({ color = "#4B5563", size = 40, loading = true }: SpinnerProps) {
  return (
    <PacmanLoader 
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}