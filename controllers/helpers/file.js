const employeeFindDelete = (id) => {
    console.log('id', id)
    return new Promise((resolve, rej) => {
        Employee.find({_id: id}, (err, result) => {
            console.log('employee find', err, result)
            if (result.length > 0) {
                let {userId} = result[0];
                Users.deleteOne({_id: userId}, (err, result2) => {
                    if (!err) {
                        resolve()
                    }
                })
            }
        })
    })
}

const employeeDelete = (id) => {
    console.log('id', id)
    return new Promise((resolve, rej) => {
        Employee.deleteOne({_id: id}, (err, result) => {
            console.log('employee delete', err, result)
            if (!err) {
                resolve()
            }
        })
    })
}



exports.employeeFindDelete = employeeFindDelete;
exports.employeeDelete = employeeDelete;