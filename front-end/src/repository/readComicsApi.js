
export const createUser = (user) => {
    return fetch('http://localhost:8080/sign_up', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            password: user.pwd,
            userName: user.username,
            fullName: user.fullname
        })

    });
};

export const doesUserExist = (user) => {
    return fetch('http://localhost:8080/user/exists?userName='+user.username+'&email='+user.email,  {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};
