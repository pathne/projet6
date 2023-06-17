
let categoryFilter = {
    categoryId: -1,

    render: async function(){
        // DONT display filter if user is authenticated
        if (authentication.isLogged()){
            return;
        }

        const container = document.getElementById('category-filter')
        container.innerHTML = ''

        const categories = await data.works.getWorksCategories()
        if (categories === null){
            // in case error, dont display anything
            return
        }

        container.appendChild(this.renderCategory({id:-1, name:'Tous'}))

        categories.forEach(category => {
            container.appendChild(this.renderCategory(category))
        })
    },

    renderCategory: function(category){
        const li = document.createElement('li')
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
            this.render()
        }
        else if (e.what === 'categoryFilterChanged'){
            this.render()
        }
        else if (e.what === 'worksChanged'){
            this.render()
        }
    }
}

notifier.addListener(categoryFilter)
