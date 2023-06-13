
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
        if (await api.works.deleteWork(data.user.getCredential(), workId)){
            var index = this.works.findIndex(work => work.id === workId);
            this.works.splice(index, 1);
        }
    }
}
