// index.tsx (veya index.js)

import { registerRootComponent } from 'expo';
import App from './App';

// App componentini root olarak kaydeder.
// iOS / Android / web hepsinde bunu kullanır.
registerRootComponent(App);
