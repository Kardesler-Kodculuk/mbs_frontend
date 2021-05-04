import { createContext } from 'react';

//Alert Context for all alerts
//Setting alerts in the context with multiple re-rendered components make them flicker
//So we made an global context for them and render them in user template directly and set them via setAlerts
export const AlertContext = createContext(null);
