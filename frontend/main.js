import { generateGraphSingle } from "../backend/app";

document.getElementById("generate-button").addEventListener("click", async () => {
    await generateGraphSingle();
});
