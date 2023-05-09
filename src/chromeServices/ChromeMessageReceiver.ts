
import { DOMMessage, DOMMessageResponse } from '../types';

const messagesFromReactAppListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: DOMMessageResponse) => void) => {
    console.log('[content.js]. Message received', msg);

    switch(msg.action) {
        case 'updateInput':
            const params = msg.params as {
                inputId: string,
                newValue: any
            }
            sendResponse(SetInputValue(params.inputId, params.newValue));
            return;
        default:
    }

    sendResponse()
}

const SetInputValue = (inputId: string, newValue: any) => {
    const inputElement = document.querySelector(`input#${inputId}`);

    if(inputElement instanceof HTMLInputElement && inputElement.value !== newValue) {
        const message = `${inputElement.value || '""'} >> ${newValue}`;
        inputElement.value = newValue;

        return {
            message: message
        } as DOMMessageResponse;
    }

    return {
        message: 'no any change'
    } as DOMMessageResponse;
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);