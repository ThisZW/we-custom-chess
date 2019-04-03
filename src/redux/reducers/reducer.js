let reducer = (state=defaultStatus,action)=>{
    let{type,payload}=action;
    switch(type){
        case 'INCREMENT':
            count: state.count +1
            return [...state]
        case 'DECREMENT':
            count: state.count-1
            return [...state]
        case 'ODD_INCREMENT':
            if (state.count %2 ==0){
                count:state.count +1
                return [...state]
            }
        default:
            return state;
    }
}

export default reducer;