import { EventEmitter } from "node:events";
import { createAlert } from "./create-alert.js";

export const sightingEvents = new EventEmitter();

sightingEvents.on("sighting-added", createAlert);
