/**
 * Override Context Pad: https://github.com/bpmn-io/bpmn-js/blob/master/lib/Modeler.js#L77
 */
export default class OverrideContextPad {
    constructor(contextPad) {
        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        return {}
    }
}

OverrideContextPad.$inject = [
    'contextPad'
]