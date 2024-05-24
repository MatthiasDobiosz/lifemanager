"use client";

import { Button } from "./ui/button";

interface SwitcherProps {
  optionOne: string;
  optionTwo: string;
  dailyViewActive: boolean;
  onSwitch: (firstSelected: boolean) => void;
}

function Switcher(props: SwitcherProps): JSX.Element {
  const { optionOne, optionTwo, dailyViewActive, onSwitch } = props;

  return (
    <div className="flex flex-row">
      <Button
        className={`w-[6em] rounded-none`}
        onClick={() => onSwitch(true)}
        variant={dailyViewActive ? "default" : "secondary"}
      >
        {optionOne}
      </Button>
      <Button
        className={`w-[6em] rounded-none`}
        onClick={() => onSwitch(false)}
        variant={dailyViewActive ? "secondary" : "default"}
      >
        {optionTwo}
      </Button>
    </div>
  );
}

export { Switcher };
