import type { App } from 'vue';
import signalModelDirective from '../lib/signals/v-signal-model.js';

export default (app: App) => {
    app.directive('signal-model', signalModelDirective);
};
