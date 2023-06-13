
data.user = {
    setCredential: function(credential){
        window.sessionStorage.setItem("credential", JSON.stringify(credential));
    },

    getCredential: function(credential){
        try{
            return JSON.parse(window.sessionStorage.getItem("credential")) || null;
        }
        catch (err){
            window.sessionStorage.setItem("credential", null);
            return null;
        }
    }
};
