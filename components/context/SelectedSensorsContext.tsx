import { createContext, useContext, useState } from "react";

export const SelectedSensorsContext = createContext(useState([]));