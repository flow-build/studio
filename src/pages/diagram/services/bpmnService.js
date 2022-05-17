import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bpmnService = createApi({
    reducerPath: 'bpmnService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://x8ki-letl-twmt.n7.xano.io/api:rs1ZTRZ_/nodes/element'
    }),
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: (elementType) => ({
                url: `/${elementType}`
            })
        })
    })
})

export const {
    useGetPropertiesQuery
} = bpmnService