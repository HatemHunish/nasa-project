import { BrowserRouter as Router } from "react-router-dom";
import {
  Arwes,
  SoundsProvider,
  ThemeProvider,
  createSounds,
  createTheme,
} from "arwes";

import AppLayout from "./pages/AppLayout";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";
import { appInsights, reactPlugin } from "./AppInsights";
import { theme, resources, sounds } from "./settings";
const history = createBrowserHistory();
appInsights.config.extensionConfig[reactPlugin.identifier].history = history;
appInsights.loadAppInsights();
const App = () => {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <ThemeProvider theme={createTheme(theme)}>
        <SoundsProvider sounds={createSounds(sounds)}>
          <Arwes
            animate
            background={resources.background.large}
            pattern={resources.pattern}>
            {(anim) => (
              <Router>
                <AppLayout show={anim.entered} />
              </Router>
            )}
          </Arwes>
        </SoundsProvider>
      </ThemeProvider>
      ;
    </AppInsightsContext.Provider>
  );
};

export default App;
