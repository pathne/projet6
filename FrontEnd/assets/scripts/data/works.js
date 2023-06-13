
data.works = {
    works:null,

    getWorks:async function (){
        return this.works || (this.works = api.works.getWorks())
    },

    getWorksCategories:async function (){
        const works = await this.getWorks()
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
    }
}
