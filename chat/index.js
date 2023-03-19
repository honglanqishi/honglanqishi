import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
const { User } = require("../db");
var express = require('express');
let router = express.Router();



let v = 'gpt-3.5-turbo-0301'

let v2 = 'gpt-3.5-turbo'

let v3 = 'text-davinci-002-render-sha'

const api = new ChatGPTUnofficialProxyAPI({
    accessToken: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiIyNDQyMDAzQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWJ2VFdxR0pLUGVYOEViWXBVeHJZQjRXcyJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDYwMzgyNjgxMzAwNDkzNjcxMjYiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5MjExOTI2LCJleHAiOjE2ODA0MjE1MjYsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb2ZmbGluZV9hY2Nlc3MifQ.r3rel1vgAZUUdoQayLt3POngVMvF_Qj-lah67_uJqTUb3VMkjjLl-urncGUjPvgr_Bop4ZDt6z_Gat5xjNSibp_AGAvnIbINheKoMWM14MbKbpDboyNUlmLSmbt5_R36EqlkTu8MRPX9NTTpGZ8An1CkViTxUHfFsxwnHpEJRSMqDGTAyJ13vjKA1FGPnnUrusWQZEaDLSqHAWRWLRXB836QMR6vi9cXjv0D_kB08llkortu1KlJAbrJIy93v9UuMNYb3uolpo4zZ-HTlwHDSA-vP1BA0ogPsz1qdcUvDAf7ga8rz2oVj_sAb1-Lv7A3g4fOfMqYN0aaipK85-gY2g`,
    apiReverseProxyUrl: 'https://bypass.duti.tech/api/conversation',
    model: v2
})
// const api = new ChatGPTAPI({
//     apiKey: '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',
//     completionParams: {
//         model: v2,
//         temperature:0.2
//         // top_p: 0.1
//     }
// })
// api.model = v2


router.post('/getAnswer', async (req, res) => {
    const ret = await api.sendMessage(req.body.content, {
        systemMessage: `You are ChatGPT, a large language model trained by OpenAI. You answer as concisely as possible for each responseIf you are generat
            ing a list, do not have too many items.Current date: ${new Date().toISOString()}`
    })
    console.log(ret)
    res.send(ret)
})

module.exports = router