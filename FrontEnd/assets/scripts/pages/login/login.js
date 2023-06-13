
var login = {
    pending: false,
    error: null,

    init: function(){
        let form = document.getElementById('login-form')
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            if (!this.pending){
                notifier.notify({what:'doLogin'})
            }
        })
    },

    render: function(){
        document.getElementById('login-submit').disabled = this.pending
        let error = document.getElementById('login-error')
        error.style.display = this.error?'block':'none'
        error.innerText = this.error || ''
    },

    onEvent: function(e){
        if (e.what === 'init'){
            this.init()
        }
        else if (e.what === 'doLogin'){
            this.doLogin()
        }
    },

    doLogin: async function(){
        var email = document.getElementById('login-email').value.trim()
        var password = document.getElementById('login-password').value.trim()

        if (email === '' || password === ''){
            this.error = strings.emailAndPasswordAreRequired
            this.render()
            return
        }

        this.pending = true;
        this.error = null;
        this.render();

        // wait till api response
        try {
            var response = await api.users.login(/*email, password*/"sophie.bluel@test.tld", "S0phie");
            if (response.ok){
                try {
                    var credential = await response.json()
                    data.user.setCredential(credential);
                    window.location.href = 'index.html';
                }
                catch (err){
                    console.log(err);
                    this.error = strings.invalidServerResponse;
                }
            }
            else {
                this.error = strings.invalidUserOrPassword;
            }
        }
        catch (err){
            console.log(err)
            this.error = strings.failedToFetch;
        }
        this.pending = false;
        this.render();
    }
}

notifier.addListener(login)
