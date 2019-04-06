import {sessionService} from 'redux-react-session';
import "isomorphic-fetch"

export const setUserName = 'setUserName', USER_ADD_SUCCES = 'USER_ADD_SUCCES';

function checkSTRName(name) {
    return /^[a-zA-Z0-9]+$/.test(name)
}


export function saveNameInCookie(user) {
    sessionService.saveSession(user);
    sessionService.saveUser(user)

}


export function logOut() {

    sessionService.deleteSession();
    sessionService.deleteUser();

}

export function checkName(name, store) {
    return dispatch => {
        fetch(`http://localhost:8001/api/user/check/${name}`).then(res => res.json().then(res => {
            console.log(res);
            if (res.status)
                dispatch(setName(name, store));
            else
                store.history.push(`/chat`)

        }))
    }
}

export function setName(name, store) {
    name.trim();
    let checkRes = checkSTRName(name);
    return dispatch => {
        if (checkRes && name.length < 20 && name.length >= 5)
            fetch(`http://localhost:8001/api/user/${name}`).then(res => res.json().then(res => {
                if (res.status) {
                    dispatch({type: 'USER_ADD_SUCCES', payload: true})
                    saveNameInCookie(name);
                    store.history.push(`/chat`)
                }
                else alert('Имя сущетсвует')
            }));
        else {
            if (!checkRes)
                alert('Имя содержит запреженые символы используйте a-z A-Z 0-9');
            if (name.length >= 20)
                alert('Имя слишком длинное максимальная длина имени 20');
            if (name.length < 5)
                alert('Имя слишком короткое миниальное количество символов 5');
            dispatch({type: 'USER_ADD_FAILED', payload: false})
        }


    }


}