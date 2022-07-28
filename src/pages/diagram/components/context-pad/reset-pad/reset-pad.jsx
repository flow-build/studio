/**
 * Override Context Pad: https://github.com/bpmn-io/bpmn-js/blob/master/lib/Modeler.js#L77
 */
export default class ResetPad {
  constructor(contextPad) {
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    return {};
  }
}

ResetPad.$inject = ["contextPad"];
