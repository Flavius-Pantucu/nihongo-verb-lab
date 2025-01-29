import VerbLab from "./verbLab";
import { promises as fs } from "fs";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/src/app/verbs.json", "utf8");
  const data = JSON.parse(file);

  return <VerbLab verbs={data} />;
}
