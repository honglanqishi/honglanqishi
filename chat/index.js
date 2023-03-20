import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { v4 as uuidv4 } from "uuid";
import proxy from "https-proxy-agent";
import nodeFetch from "node-fetch";

import express from 'express'
// var express = require('express');
let router = express.Router();



let v = 'gpt-3.5-turbo-0301'

let v2 = 'gpt-3.5-turbo'

let v3 = 'text-davinci-002-render-sha'

// const { APIKEY, accessToken } = process.env;
var APIKEY = ''
console.log('apiKey',APIKEY)

// const api = new ChatGPTUnofficialProxyAPI({
//     accessToken: accessToken || `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiIyNDQyMDAzQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWJ2VFdxR0pLUGVYOEViWXBVeHJZQjRXcyJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDYwMzgyNjgxMzAwNDkzNjcxMjYiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5MjExOTI2LCJleHAiOjE2ODA0MjE1MjYsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb2ZmbGluZV9hY2Nlc3MifQ.r3rel1vgAZUUdoQayLt3POngVMvF_Qj-lah67_uJqTUb3VMkjjLl-urncGUjPvgr_Bop4ZDt6z_Gat5xjNSibp_AGAvnIbINheKoMWM14MbKbpDboyNUlmLSmbt5_R36EqlkTu8MRPX9NTTpGZ8An1CkViTxUHfFsxwnHpEJRSMqDGTAyJ13vjKA1FGPnnUrusWQZEaDLSqHAWRWLRXB836QMR6vi9cXjv0D_kB08llkortu1KlJAbrJIy93v9UuMNYb3uolpo4zZ-HTlwHDSA-vP1BA0ogPsz1qdcUvDAf7ga8rz2oVj_sAb1-Lv7A3g4fOfMqYN0aaipK85-gY2g`,
//     // apiReverseProxyUrl: 'https://bypass.duti.tech/api/conversation',
//     model: v2
// })
const api = new ChatGPTAPI({
    apiKey: APIKEY || '',
    // apiBaseUrl: 'https://106.55.18.62',
    debug: true,
    completionParams: {
        model: v2
    },
    fetch: (url, options = {}) => {
        const defaultOptions = {
            agent: proxy("https://106.55.18.62:7890"),
        };

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return nodeFetch(url, mergedOptions);
    }
})
// api.model = v2


router.post('/getAnswer', async (req, res) => {
    var ret = ''
    if (req.body.id) {
        ret = await api.sendMessage(req.body.content, {
            conversationId: req.body.conversationId,
            parentMessageId: req.body.id,
           
            systemMessage: `You are ChatGPT, a large language model trained by OpenAI. You answer as concisely as possible for each responseIf you are generat
                ing a list, do not have too many items.Current date: ${new Date().toISOString()}`
        })
    } else {
        console.log(req.body)
        ret = await api.sendMessage(req.body.content, {
            
            systemMessage: `You are ChatGPT, a large language model trained by OpenAI. You answer as concisely as possible for each responseIf you are generat
                ing a list, do not have too many items.Current date: ${new Date().toISOString()}`
        })
    }
    res.send(ret)
})

export default router