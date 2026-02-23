import { addNewSighting } from "../utils/add-new-sightings.js";
import { getData } from "../utils/get-data.js";
import { parseJSONBody } from "../utils/parse-json-body.js";
import { sanitizeIncomingData } from "../utils/sanitize.js";
import { sendResponse } from "../utils/response.js";
import { sightingEvents } from "../utils/sighting.js";
import { stories } from "../data/stories.js";

export async function handleGet(res) {
  try {
    const data = await getData();
    const content = JSON.stringify(data);

    sendResponse(res, 200, "application/json", content);
  } catch (error) {
    const errorResponse = JSON.stringify({ error: error });
    sendResponse(res, 500, "application/json", errorResponse);
  }
}

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req);
    const sanitizedData = sanitizeIncomingData(parsedBody);
    await addNewSighting(sanitizedData);
    sendResponse(res, 201, "application/json", JSON.stringify(sanitizedData));

    sightingEvents.emit("sighting-added", sanitizedData);
  } catch (error) {
    sendResponse(
      res,
      400,
      "application/json",
      JSON.stringify({ error: error }),
    );
  }
}

export async function handleNews(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length);

    res.write(
      `data: ${JSON.stringify({
        event: "news-update",
        story: stories[randomIndex],
      })}\n\n`,
    );
  }, 3000);
}
