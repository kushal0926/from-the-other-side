import sanitizeHtml from "sanitize-html";

export function sanitizeIncomingData(obj) {
  const sanitized = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeHtml(value, {
        allowedTags: ["b"],
        allowedAttributes: {},
      });
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
