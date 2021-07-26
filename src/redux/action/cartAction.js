export const cartAction = (data) =>{
    return{
        type:'addIntoCart',
        payload:data
    }
}

export const deleteFromCart = (id) =>{
    return{
        type:'deleteFromCart',
        payload:id
    }
}