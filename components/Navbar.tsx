import AuthButton from "./AuthButton";
import { ModeToggle } from "./Moodtoggle";

function Navbar(): JSX.Element {
  return (
    <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16 items-center mr-6">
      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
        <AuthButton />
      </div>
      <ModeToggle />
    </nav>
  );
}

export { Navbar };
