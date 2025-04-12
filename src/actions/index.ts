export interface References {
    topic: "";
    link: "";
}

export interface RagResponse {
    response: "";
    references: References[];
}

export interface ChatProps {
    question: string,
    answer: RagResponse
}

export enum ActionTypes {
    SET_USER_ID = "SET_USER_ID",
    GET_CHAT_HISTORY = "GET_CHAT_HISTORY",
    UPDATE_MESSAGE = "UPDATE_MESSAGE",
    UPDATE_CHAT = "UPDATE_CHAT",
    SET_PENDING_PROMPT = "SET_PENDING_PROMPT",
    REGENERATE_RESPONSE = "REGENERATE_RESPONSE",
    SET_CHAT_VIEW = "SET_CHAT_VIEW"
}

export type SetUserIdAction = {
    type: ActionTypes.SET_USER_ID,
    payload: {
        userId: string
    }
}

export type GetChatHistoryAction = {
    type: ActionTypes.GET_CHAT_HISTORY,
    payload: {
        chat: ChatProps[]
    }
}

export type UpdateMessageAction = {
    type: ActionTypes.UPDATE_MESSAGE,
    payload: {
        message: string
    }
}

export type UpdateChatAction = {
    type: ActionTypes.UPDATE_CHAT,
    payload: ChatProps
}

export type SetPendingPromptAction = {
    type: ActionTypes.SET_PENDING_PROMPT,
    payload: {
        pendingPrompt: string
    }
}

export type RegenerateResponseAction = {
    type: ActionTypes.REGENERATE_RESPONSE,
    payload: ChatProps
}

export type SetChatViewAction = {
    type: ActionTypes.SET_CHAT_VIEW,
    payload: {
        isNewChat: boolean
    }
}

export type Actions = SetUserIdAction | GetChatHistoryAction | UpdateMessageAction | UpdateChatAction | SetPendingPromptAction | RegenerateResponseAction | SetChatViewAction;