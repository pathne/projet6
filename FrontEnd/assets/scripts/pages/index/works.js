
let works = {
    render: async function(){
        let container = document.getElementById('works')
        container.innerHTML = ''

        try{
            let works = await data.works.getWorks()
            let showCategoryId = categoryFilter.categoryId;

            works = showCategoryId === -1?works:works.filter(item => item.categoryId === showCategoryId)

            works.forEach(work => {
                container.appendChild(this.renderWork(work))
            })
        }
        catch (err){
            console.log(err);
            // in case of data error, dont display anything
        }
    },

    renderWork: function(work){
        let img = document.createElement('img')
        img.src = work.imageUrl
        img.alt = work.title

        let figcaption = document.createElement('figcaption')
        figcaption.innerHTML = work.title

        let figure = document.createElement('figure')
        figure.appendChild(img)
        figure.appendChild(figcaption)

        return figure
    },

    onEvent: function(e){
        if (e.what === 'init'){
            this.render();
        }
        else if (e.what === 'categoryFilterChanged'){
            this.render();
        }
    }
}

notifier.addListener(works);
