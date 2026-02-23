import path from "node:path";
import { getData } from "./get-data.js";
import { writeFile } from "node:fs/promises";

export async function addNewSighting(newSighting) {
  try {
    const sightings = await getData();
    sightings.push(newSighting);
    const pathJSON = path.join("data", "data.json");
    const jsonData = JSON.stringify(sightings, null, 2);
    await writeFile(pathJSON, jsonData, "utf-8");
  } catch (error) {
    console.log(error);
  }
}
