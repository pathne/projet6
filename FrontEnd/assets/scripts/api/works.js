
api.works = {
    getWorks: async function(){
        const response = await fetch('http://localhost:5678/api/works')
        return await response.json()
    }
};
