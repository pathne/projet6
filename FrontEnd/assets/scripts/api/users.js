
api.users = {
    login: async function(email, password){
        return await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    }
}
