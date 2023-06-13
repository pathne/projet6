
api.works = {
    getWorks: async function(){
        try{
            const response = await fetch('http://localhost:5678/api/works')
            return await response.json()
        }
        catch (error){
            notifier.notify({what:'fetchError', error:error});
            throw error;
        }
    }
};
