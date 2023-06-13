
var categoryFilter = {
    categoryId: -1,

    render: async function(){
        let container = document.getElementById('category-filter')
        container.innerHTML = ''

        try {
            const categories = await data.works.getWorksCategories()

            container.appendChild(this.renderCategory({id:-1, name:'Tous'}))

            categories.forEach(category => {
                container.appendChild(this.renderCategory(category))
            })
        }
        catch (err){
            // in case of data error, dont display anything
        }
    },

    renderCategory: function(category){
        let li = document.createElement('li')
        li.className = category.id === this.categoryId?'filter filter-on':'filter'
        li.innerText = category.name

        li.addEventListener('click', (e)=>{
            e.preventDefault()
            this.categoryId = category.id
            notifier.notify({what:'categoryFilterChanged', categoryId:this.categoryId})
        })

        return li
    },

    onEvent: function(e){
        if (e.what === 'init'){
            this.render();
        }
        else if (e.what === 'categoryFilterChanged'){
            this.render();
        }
    }
};

notifier.addListener(categoryFilter);