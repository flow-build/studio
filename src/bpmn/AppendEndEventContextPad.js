export default class AppendEndEventContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        if(config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false);
        }

        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate
        } = this

        function appendEndEvent(event, element) {
            if(autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:EndEvent' })

                autoPlace.append(element, shape)
            } else {
                appendEndEventStart(event, element)
            }
        }

        function appendEndEventStart(event) {
            const shape = elementFactory.createShape({ type: 'bpmn:EndEvent' })
            
            create.start(event, shape, element)
        }

        return {
            'append.end-event': {
                group: 'model',
                className: 'bpmn-icon-end-event-none',
                title: translate('Append EndEvent'),
                action: {
                    click: appendEndEvent,
                    dragstart: appendEndEventStart
                }
            }
        }
    }
}

AppendEndEventContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
]