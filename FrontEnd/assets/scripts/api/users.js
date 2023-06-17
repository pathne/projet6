
api.users = {
    login: async function(email, password){
        try {
            const response = await fetch('http://localhost:5678/api/users/login', {
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
            if (response.ok){
                try {
                     return await response.json()
                }
                catch (err){
                    notifier.notify({what:'loginFailed', reason:'invalidServerResponse'})
                }
            }
            else {
                notifier.notify({what:'loginFailed', reason:'invalidUserOrPassword'})
            }
        }
        catch (err){
            notifier.notify({what:'loginFailed', reason:'failedToFetch'})
        }
        return null;
    }
}
