import { Actions, ActionTypes } from "@/actions";

import type { ChatProps } from "@/actions";

export interface State {
    userId: string,
    message: string,
    chat: ChatProps[]
};


export interface AppContextType {
    state: State,
    dispatch: React.Dispatch<Actions>
};

export const reducer = (state: State, action: Actions) => {

    switch (action.type) {
        case ActionTypes.SET_USER_ID: {
            return {
                ...state,
                userId: action.payload.userId
            }
        }

        case ActionTypes.GET_CHAT_HISTORY: {
            return {
                ...state,
                chat: action.payload.chat
            }
        }

        case ActionTypes.UPDATE_MESSAGE: {

            return {
                ...state,
                message: action.payload.message
            }
        }

        case ActionTypes.UPDATE_CHAT: {

            const modifiedChat = [
                ...state.chat,
                {
                    question: action.payload.question,
                    answer: action.payload.answer
                }
            ]

            return {
                ...state,
                chat: modifiedChat
            }
        }

        case ActionTypes.REGENERATE_RESPONSE: {

            const regeneratedResponse = {
                question: action.payload.question,
                answer: action.payload.answer
            }

            const modifiedChat = state.chat.map((prompt, index, arr) => {

                if (index === arr.length - 1) {
                    return regeneratedResponse;
                } else {
                    return prompt;
                }

            })

            return {
                ...state,
                chat: modifiedChat
            }
        }

        default: {
            return state;
        }
    }
}

export const initialState: State = {
    userId: "",
    message: "",
    chat: []
}