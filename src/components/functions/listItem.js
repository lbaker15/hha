export const handleDelete = (obj, cookie) => {
    return new Promise((resolve, rej) => {
        fetch('https://hannahs-heart-2.herokuapp.com/provider/delete', {
            method: 'POST',
            headers: {
               'authorization': cookie[0].split('=')[1],
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => resolve(res.json()) )
    })
}
export const deleteEmployee = (obj, cookie) => {
    return new Promise((resolve, rej) => {
        fetch('https://hannahs-heart-2.herokuapp.com/employee/delete-employee', {
            method: 'POST',
            headers: {
               'authorization': cookie[0].split('=')[1],
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => resolve(res.json()) )
    })
}

export const getEmployees = (cookie, cookieId) => {
    return new Promise((resolve, rej) => {
        fetch('https://hannahs-heart-2.herokuapp.com/employee/employee-list', {
            method: 'POST',
            headers: {
                'authorization': cookie[0].split('=')[1],
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: cookieId[2]})
        })
        .then(res => resolve(res.json()) )
    })
}