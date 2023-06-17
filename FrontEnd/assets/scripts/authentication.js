
let authentication = {
    login: async function(email, password){
        const credential =  await api.users.login(email, password)
        if (credential){
            this.setCredential(credential)
            return true
        }
        return false
    },

    isLogged: function(){
        return this.getCredential() !== null
    },

    setCredential: function(credential){
        window.sessionStorage.setItem("credential", JSON.stringify(credential))
    },

    getCredential: function(){
        try{
            return JSON.parse(window.sessionStorage.getItem("credential")) || null
        }
        catch (err){
            this.deleteCredential()
            return null;
        }
    },

    deleteCredential: function(){
        window.sessionStorage.setItem("credential", null)
    },

    onEvent: function(e){
        if (e.what === 'authenticationExpired'){
            this.deleteCredential();
        }
    }
}

notifier.addListener(authentication)
