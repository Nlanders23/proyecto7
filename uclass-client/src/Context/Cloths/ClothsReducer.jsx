const reducer = (globalState, action) => {
    switch (action.type) {
        case "OBTENER_PRENDAS":
            return {
                ...globalState,
                cloths: action.payload
            }
        default:
            return globalState
    }
}

export default reducer;