// update-types.js
const { exec } = require("child_process");
require("dotenv").config();

const projectRef = process.env.DATABASE_PROJECT_ID;

if (!projectRef) {
  console.error("DATABASE_PROJECT_ID is not defined in the .env.local file");
  process.exit(1);
}

const command = `npx supabase gen types typescript --project-id "${projectRef}" > types/supabase.ts`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});
