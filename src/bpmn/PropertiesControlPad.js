import { store } from 'config/store'
import { setPropertiesDrawerItems, toggleDrawer } from 'features/bpmnSlice'
import { bpmnService } from 'services/bpmnService'

export default class PropertiesControlPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        async function handleGetProperties(event, element) {
            try {
                store.dispatch(toggleDrawer(true))
                const string = element.type.split(':')[1]
                const { data } = await store.dispatch(bpmnService.endpoints.getProperties.initiate(string.toLowerCase()))

                store.dispatch(setPropertiesDrawerItems(data?.items))
            } catch(e) {
                console.error(`PropertiesControlPad/handleGetProperties => ${e.error}: ${e.message}`)
            }
        }

        return {
            'handle.get-properties': {
                group: 'model',
                className: 'bpmn-icon-service-task',
                title: this.translate('Get Properties'),
                action: {
                    click: handleGetProperties
                }
            }
        }
    }
}

PropertiesControlPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
]