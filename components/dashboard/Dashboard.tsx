import Link from "next/link";
import { Box } from "../Box";
import { BoxGroup } from "../BoxGroup";
import { Button } from "../ui/button";

function Dashboard(): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <BoxGroup>
        <Box>
          <p>List of Todos</p>
          <Button>
            <Link href="todos">Hey there</Link>
          </Button>
        </Box>
        <Box>
          <Link href="/finances">Financial stuff</Link>{" "}
        </Box>
        <Box> Placeholder 1 </Box>
      </BoxGroup>
      <BoxGroup>
        <Box> Placeholder 2 </Box>
        <Box> Placeholder 3 </Box>
        <Box> Placeholder 4 </Box>
      </BoxGroup>
    </div>
  );
}

export { Dashboard };
