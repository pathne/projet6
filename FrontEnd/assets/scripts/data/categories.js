
data.categories = {
    categories: null,

    getCategories:async function (){
        return this.categories || (this.categories = await api.categories.getCategories())
    },
}
