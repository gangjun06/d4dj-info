import { ApolloError } from "@apollo/client";
import { ReactNode } from "react";

type props = {
  loading: boolean;
  error: ApolloError | undefined;
  children: ReactNode;
  loadingComponent?: ReactNode;
};

export default function WaitQuery({
  loading,
  error,
  children,
  loadingComponent = <></>,
}: props) {
  if (loading) {
    return <>{loadingComponent}</>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return <div className="">{children}</div>;
}
