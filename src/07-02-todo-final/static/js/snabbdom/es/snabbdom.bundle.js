import { init } from './snabbdom.js';
import { attributesModule } from './modules/attributes.js'; // for setting attributes on DOM elements
import { classModule } from './modules/class.js'; // makes it easy to toggle classes
import { propsModule } from './modules/props.js'; // for setting properties on DOM elements
import { styleModule } from './modules/style.js'; // handles styling on elements with support for animations
import { eventListenersModule } from './modules/eventlisteners.js'; // attaches event listeners
import { datasetModule } from './modules/dataset.js';
import { h } from './h.js'; // helper function for creating vnodes
var patch = init([
    attributesModule,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    datasetModule
]);
export var snabbdomBundle = { patch: patch, h: h };
export default snabbdomBundle;
export {
    patch,
    h
}
//# sourceMappingURL=snabbdom.bundle.js.map