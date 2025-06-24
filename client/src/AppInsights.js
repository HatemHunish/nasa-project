import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_APPINSIGHTS_KEY,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: {
        history: null, // set later
      }
    }
  }
});

export { appInsights, reactPlugin };
