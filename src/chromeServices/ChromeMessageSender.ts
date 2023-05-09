import { DOMMessage, DOMMessageResponse } from "../types";

export function UpdateInput(inputId: string, newValue: any) {
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        chrome.tabs.sendMessage(
            // Current tab ID
            tabs[0].id || 0,

            // Message type
            {
                action: 'updateInput',
                params: {
                    inputId: inputId,
                    newValue: newValue
                }
            } as DOMMessage,

            // Callback executed when the content script sends a response
            (response: DOMMessageResponse) => {
                console.log("response", response)
            });
    });
}