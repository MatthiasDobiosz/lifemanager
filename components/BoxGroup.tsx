import { PropsWithChildren } from "react";

function BoxGroup(props: PropsWithChildren): JSX.Element {
  const { children } = props;

  return <div className="flex flex-row gap-10">{children}</div>;
}

export { BoxGroup };
