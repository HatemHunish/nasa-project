import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_APPINSIGHTS_KEY, // Use .env
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: null } // Will be set in main App file
    }
  }
});

appInsights.loadAppInsights();

export { reactPlugin, appInsights };
