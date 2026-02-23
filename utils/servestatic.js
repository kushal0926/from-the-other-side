import { readFile } from "node:fs/promises";
import path from "node:path";
import { sendResponse } from "./response.js";
import { getContentType } from "./get-content-type.js";

export async function serveStatic(req, res, baseDir) {
  const publicDir = path.join(baseDir, "public");
  const filePath = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url,
  );
  const ext = path.extname(filePath);
  const contentType = getContentType(ext);

  try {
    const content = await readFile(filePath);
    sendResponse(res, 200, contentType, content);
  } catch (error) {
    if (error.code === "ENOENT") {
      const content = await readFile(path.join(publicDir, "404.html"));
      sendResponse(res, 404, "text/html", content);
    } else {
      sendResponse(
        res,
        500,
        "text/html",
        "<html><h1> Server Error: ${ err.code }</h1></html> ",
      );
    }
  }
}
