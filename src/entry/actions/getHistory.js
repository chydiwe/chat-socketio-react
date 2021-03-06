import "isomorphic-fetch"

export const setHistory = 'setHistroy', endHistory = 'endHistory';


export function getHistory(length) {
    return dispatch=>
         fetch(`api/history/${length}`).then(res => res.json().then(res =>
            res ? dispatch({
                type: setHistory,
                payload: res
            }) : dispatch({
                type: endHistory,
                payload: res
            })

        ))


}