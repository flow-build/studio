import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

import { api } from 'services/api';

export const axiosBaseQuery = ({ baseUrl }) => async (args) => {
    try {
        const result = await api({ ...args, url: baseUrl + args.url });
        return {
            data: result.data
        };
    } catch (e) {
        console.error(`Axios/axiosBaseQuery -> ${e.error}: ${e.message}`);
        return {
            error: {
                status: e.response?.status,
                data: e.response?.data
            }
        };
    }
};

export const getWorkflowAnonymousToken = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/token`, {});

        return response.data.jwtToken || response.data.token;
    } catch (e) {
        throw new Error(`getWorkflowAnonymousToken -> ${e.error}: ${e.message}`);
    }
};

export const workflowService = createApi({
    reducerPath: 'workflowService',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    endpoints: (builder) => ({
        getStateByStepNumber: builder.query({
            query: ({ processId, stepNumber }) => ({
                url: `/states/process/${processId}?stepNumber=${stepNumber}`,
            }),
        }),
        getWorkflows: builder.query({
            query: () => ({
                url: '/workflows'
            })
        }),
        getWFProcessById: builder.query({
            query: (processId) => ({
                url: `/workflows/${processId}/processes`
            })
        }),
        getProcessHistory: builder.query({
            query: (processId) => ({
                url: `/processes/${processId}/history`
            })
        }),
        getWorkflowDiagram: builder.query({
            query: (workflowId) => ({
                url: '/workflows/diagram',
                method: 'POST',
                data: {
                    workflow_id: workflowId
                }
            })
        }),
        getProcessStateById: builder.query({
            query: (processId) => ({
                url: `/processes/${processId}/state`
            })
        }),
        createWorkflowByName: builder.query({
            query: ({ name, data }) => ({
                url: `/workflows/name/${name}/start`,
                method: 'POST',
                data
            })
        })
    })
});

export const {
    useGetWorkflowsQuery,
    useGetWFProcessByIdQuery,
    useGetWorkflowDiagramQuery,
    useGetProcessHistoryQuery,
    useCreateWorkflowByNameQuery,
    useGetProcessStateByIdQuery
} = workflowService;