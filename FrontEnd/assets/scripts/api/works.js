
api.works = {
    getWorks: async function(){
        try {
            const response = await fetch('http://localhost:5678/api/works')
            if (response.ok){
                return await response.json()
            }
        }
        catch (err){
        }
        notifier.notify({what:'fetchError'})
        return null
    },

    deleteWork: async function(id){
        const credential = authentication.getCredential();
        try {
            const response = await fetch('http://localhost:5678/api/works/'+id, {
                method: "DELETE",
                cache: "no-cache",
                headers: {
                    "Authorization":'Bearer ' + credential.token
                },
            })
            if (response.ok){
                return true
            }
            else if (response.status === 401){
                notifier.notify({what:'authenticationExpired'})
            }
            else {
                notifier.notify({what:'editFetchError'})
            }
        }
        catch (err){
            notifier.notify({what:'editFetchError'})
        }
        return false
    },

    addWork: async function(file, title, category){
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);

        const credential = authentication.getCredential();
        try {
            console.log(credential);
            console.log('BLO');
            const response = await fetch('http://localhost:5678/api/works', {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Authorization":'Bearer ' + credential.token
                },
                body: formData
            });
            if (response.ok){
                return await response.json()
            }
            else if (response.status === 401){
                notifier.notify({what:'authenticationExpired'})
            }
            else {
                notifier.notify({what:'editFetchError'})
            }
        }
        catch (err){
            notifier.notify({what:'editFetchError'})
        }
        return null
    }
}
