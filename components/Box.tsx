import { PropsWithChildren } from "react";

function Box(props: PropsWithChildren): JSX.Element {
  const { children } = props;

  return (
    <div className="border-black border-2 rounded-sm border-solid w-[200px] h-[200px] flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

export { Box };
