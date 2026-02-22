import { getData } from "../utils/get-data.js";
import { sendResponse } from "../utils/send-response.js";

export async function handleGet(res) {
  try {
    const data = await  getData();
    const content = JSON.stringify(data);

    sendResponse(res, 200, "application/json", content);
  } catch (error) {
    const errorResponse = JSON.stringify({ error: "Internal Server Error" });
    sendResponse(res, 500, "application/json", errorResponse);
  }
}
