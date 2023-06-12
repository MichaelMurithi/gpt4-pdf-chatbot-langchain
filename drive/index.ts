import { runSample } from "./quickstart";
import { loadEnvVariablesAndCreateAuthFile } from "./setup";

loadEnvVariablesAndCreateAuthFile();
await runSample()
    .catch(e => console.log(e));