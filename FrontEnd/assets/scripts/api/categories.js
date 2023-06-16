
api.categories = {
    getCategories: async function(){
        try {
            const response = await fetch('http://localhost:5678/api/categories')
            if (response.ok){
                return await response.json()
            }
        }
        catch (err){
        }
        notifier.notify({what:'editFetchError'})
        return null
    }
}
