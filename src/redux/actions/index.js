import firebase from 'firebase';

export const selectCafe = (cafeName) => {
    //console.log(cafeName);
    return {
        type: 'select',
        payload: cafeName
    };
};

export const clearCafe = () => {
    //console.log(cafeName);
    return {
        type: 'select',
        payload: ""
    };
};


export const cafeFetch = () => {
    //console.log("fetch start");
    return (dispatch) => {
        firebase.database().ref(`/cafes`)
            .on('value', snapshot => {
                dispatch({ type: 'get_cafe_data', payload: snapshot.val() });
            }, error => {
                console.error(error);
            });
    };
};

export const listsort = (sortKey, nested) => {
    if (nested) {
        return {
            type: 'cafe_sort_inner',
            payload: sortKey
        }
    }
    else {
        return {
            type: 'cafe_sort',
            payload: sortKey
        }
    }
}

export const selectModalAttr = (attr, selection) => {
    return {
        type: 'selectModalAttr',
        payload: { attr: attr, selection: selection }
    }
}