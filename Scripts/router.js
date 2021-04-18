let router = Sammy('#main', function() {
    
    this.use('Handlebars', 'hbs');

    this.get('/register', function(context) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            context.login = true;
        }

        if (context.login) {
            context.redirect('/home');
            return
        }

        context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs'
        })
        .then(function() {
            this.partial('./templates/register.hbs')
        })
    })
    
    this.get('/login', function(context) {
        
        context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs'
        })
        .then(function() {
            this.partial('./templates/login.hbs')
        })
    })

    this.get('/home', function(context) {
        articles(context)
        
    })

    this.get('/edit/:id', function(context) {
        context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs'
        })
        .then(function() {
            context.partial('./templates/edit.hbs')
        })
    })

    this.post('/register', function(context) {
        registerUser(context)
    })

    this.post('/login', function(context) {
        loginUser(context)
    })
})

router.run('/register')