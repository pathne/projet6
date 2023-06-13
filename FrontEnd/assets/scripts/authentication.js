
let authentication = {
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
