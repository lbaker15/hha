export const submitChange = (cookie, obj) => {
    return new Promise((resolve, rej) => {
        fetch('https://hannahs-heart-2.herokuapp.com/employee/edit-employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': cookie
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            resolve(res.json())
        })
    })
}

export const addEmployee = (cookieId, state, obj2) => {
    return new Promise((resolve, rej) => {
        fetch('https://hannahs-heart-2.herokuapp.com/login/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj2)
        })
        .then(res => res.json())
        .then(data => {
            if (data.Success) {
                let userId = data.Success;
                let obje = {...state, userId, author: cookieId[2]}
                fetch('https://hannahs-heart-2.herokuapp.com/employee/add-employee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obje)
                })
                .then(res => resolve(res.json()))
            } else {
                rej(data.message)
            }
        })
    })
}