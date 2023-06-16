
data.works = {
    works:null,

    getWorks:async function (){
        return this.works || (this.works = await api.works.getWorks())
    },

    getWorksCategories:async function (){
        const works = await this.getWorks()
        if (works === null){
            return null
        }
        let uniques = new Map()
        works.forEach(work => {
            uniques.set(work.category.id, work.category)
        });
        let categories = []
        for (let value of uniques.values()){
            categories.push(value)
        }
        categories.sort((a, b) => a.id - b.id)
        return categories
    },

    deleteWork:async function(workId){
        if (await api.works.deleteWork(workId)){
            let index = this.works.findIndex(work => work.id === workId)
            this.works.splice(index, 1)
            return true;
        }
        return false;
    },

    addWork:async function(file, title, categoryId){
        let result = await api.works.addWork(file, title, categoryId)
        if (!result){
            return false;
        }
        let categories = await data.categories.getCategories()
        let category = categories.find(category => category.id === parseInt(result.categoryId))
        let work = {
            id: result.id,
            title: result.title,
            imageUrl: result.imageUrl,
            categoryId: category.id,
            userId: result.userId,
            category: category
        }
        this.works.push(work)
        return true
    }
}
