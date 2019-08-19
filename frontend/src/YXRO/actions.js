import dataProvider from '../internal/dataProvider';

export const SET_CALCULATION = 'SET_CALCULATION';
export function setCalculation(payload) {
    return {
        type: SET_CALCULATION,
        payload
    };
}

export const SET_SAMPLE = 'SET_SAMPLE';
export function setSample(payload) {
    return {
        type: SET_SAMPLE,
        payload
    };
}

export const SET_SAMPLE_LAYERS = 'SET_SAMPLE_LAYERS';
export function setSampleLayers(payload) {
    return {
        type: SET_SAMPLE_LAYERS,
        payload
    };
}

export const CONVERT_PAR_TO_JSON = 'CONVERT_PAR_TO_JSON';
export function convertParToJsonSaga(payload) {
    return {
        type: CONVERT_PAR_TO_JSON,
        payload
    };
}
export async function convertParToJson(data) {
    return await dataProvider('yxro/par2json', {
            payload: data.payload
        })
        .then(response => {
            return JSON.parse(response.payload);
        });
}

export const CONVERT_JSON_TO_PAR = 'CONVERT_JSON_TO_PAR';
export function convertJsonToParSaga(payload) {
    return {
        type: CONVERT_JSON_TO_PAR,
        payload
    };
}
export async function convertJsonToPar(data) {
    return await dataProvider('yxro/json2par', {
            payload: data.payload
        }).then(response => response.payload);
}
