const initialState =  []
export const cartReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "addIntoCart":
            let data =  state.concat({...action.payload,id:state.length}) 
            return data;
        case "deleteFromCart":
            return state.filter(i=>i.id!=action.payload)
        default:
            return state;
    }
}