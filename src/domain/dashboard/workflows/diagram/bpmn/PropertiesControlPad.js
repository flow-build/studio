import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { setPropertiesDrawerItems, toggleDrawer } from 'domain/dashboard/workflows/diagram/features/bpmnSlice';
import { bpmnService } from 'domain/dashboard/workflows/diagram/services/bpmnService';


import { workflowService } from 'domain/dashboard/workflows/diagram/services/workflowService';
import { bpmnSliceReducer, notificationsSliceReducer } from 'domain/dashboard/workflows/diagram/features';

export const store = configureStore({
    reducer: {
        [workflowService.reducerPath]: workflowService.reducer,
        [bpmnService.reducerPath]: bpmnService.reducer,
        bpmn: bpmnSliceReducer,
        notifications: notificationsSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        workflowService.middleware,
        bpmnService.middleware
    ])
});

setupListeners(store.dispatch);

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
                store.dispatch(toggleDrawer(true));
                const string = element.type.split(':')[1];
                const { data } = await store.dispatch(bpmnService.endpoints.getProperties.initiate(string.toLowerCase()));

                store.dispatch(setPropertiesDrawerItems(data?.items));
            } catch (e) {
                console.error(`PropertiesControlPad/handleGetProperties => ${e.error}: ${e.message}`);
            }
        }

        if (isAny(element.businessObject, [
            'bpmn:EndEvent',
            'bpmn:ExclusiveGateway',
            'bpmn:CallActivity',
            'bpmn:ServiceTask',
            'bpmn:SubProcess',
            'bpmn:IntermediateThrowEvent',
            'bpmn:UserTask',
            ''
        ])) {
            return {
                'handle.get-properties': {
                    group: 'model',
                    className: 'bpmn-icon-service-task',
                    title: this.translate('Get Properties'),
                    action: {
                        click: handleGetProperties
                    }
                }
            };
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
];