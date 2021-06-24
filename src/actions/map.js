
function addMap(map) {
    return {
        type: 'MAP_SAVED',
        map
    }
}

export function addMapRedux (map) {
    return (dispatch) => {
        dispatch(addMap(map))
    }
}