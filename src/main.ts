import { mountApp } from "./alwinApp";
import { createInitialAppState } from "./model";
import type { AppState } from "./types";

const state: AppState = createInitialAppState();
mountApp(state);
