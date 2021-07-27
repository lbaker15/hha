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
        .then(res => resolve( res.json()) )
    })
}

export const editProvider = (obj, cookie) => {
    return new Promise((resolve, rej) => {
        fetch('https://hannahs-heart-2.herokuapp.com/provider/edit-provider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': cookie
            },
            body: JSON.stringify(obj)
        })
        .then(res => resolve( res.json()) )
    })
}

export const usernameCheck = (object) => {
    return new Promise((resolve, rej) => {
        fetch('https://hannahs-heart-2.herokuapp.com/login/user-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(res => resolve( res.json()) )
    })
}

export const addProvider = (obj2, cookieId, address, val, state) => {
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
                let obj = {...state, userId, author: cookieId[2], businessAddress: address}
                obj.firstname = obj.firstname.toLowerCase()
                obj.lastname = obj.lastname.toLowerCase()
                obj.telephone = val;
                delete obj.languagesOpen;
                delete obj.servicesOpen;
                delete obj.gendersOpen;
                delete obj.address;
                fetch('https://hannahs-heart-2.herokuapp.com/provider/add-provider', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(res => resolve( res.json()) )
            } else {
                rej(data.message)
            }
        })    
    })
}