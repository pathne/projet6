
data.user = {
    setCredential: function(credential){
        window.sessionStorage.setItem("credential", JSON.stringify(credential));
    },

    getCredential: function(credential){
        return window.sessionStorage.getItem("credential") || null;
    }
};
