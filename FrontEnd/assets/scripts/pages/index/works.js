
let works = {
    render: async function(){
        const container = document.getElementById('works')
        container.innerHTML = ''

        let works = await data.works.getWorks()
        if (works === null){
            // in case of error, dont display anything
            return;
        }

        const showCategoryId = categoryFilter.categoryId

        works = showCategoryId === -1?works:works.filter(item => item.categoryId === showCategoryId)

        works.forEach(work => {
            container.appendChild(this.renderWork(work))
        })
    },

    renderWork: function(work){
        const img = document.createElement('img')
        img.src = work.imageUrl
        img.alt = work.title

        const figcaption = document.createElement('figcaption')
        figcaption.innerHTML = work.title

        const figure = document.createElement('figure')
        figure.appendChild(img)
        figure.appendChild(figcaption)

        return figure
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

notifier.addListener(works);
