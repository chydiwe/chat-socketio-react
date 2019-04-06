import "isomorphic-fetch"

export const setHistroy = 'setHistroy', endHistory = 'endHistory';


export function getHistory(length) {
    return dispatch=>
         fetch(`http://localhost:8001/api/history/${length}`).then(res => res.json().then(res =>
            res ? dispatch({
                type: setHistroy,
                payload: res
            }) : dispatch({
                type: endHistory,
                payload: res
            })

        ))


}