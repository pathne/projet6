
let notifier = {
    listeners: [],

    addListener: function(listener){
        this.listeners.push(listener)
    },

    notify: function(e){
        console.log(e);
        this.listeners.forEach(listener => listener.onEvent(e))
    }
}
