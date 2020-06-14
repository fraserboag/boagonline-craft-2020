// Splash text animation

var splashText = document.querySelector('.hideonload-splash h1');
var splashTextWords = splashText.innerText.split(' ');

splashText.innerText = '';

splashTextWords.forEach(function (word) {
    splashText.innerHTML += '<span class="word">'+word+'</span> ';
});

setTimeout(function () {
    var wordElements = splashText.querySelectorAll('.word');
    wordElements.forEach(function (word, i) {
        
        setTimeout(function () {
            word.classList.add('fade');
        }, 30 * i);
    });
}, 100);


// Handle submission of newsletter signup form

    var newsletterForm = document.querySelector('form.newsletter-signup')
    var emailField = document.querySelector('#email_address')
    var csrfField = document.querySelector('form.newsletter-signup input[type=hidden]')

    emailField.addEventListener('focus',function(e){
        e.target.parentElement.classList.add('focused')
    })

    emailField.addEventListener('blur',function(e){
        e.target.value == '' && e.target.parentElement.classList.remove('focused')
    })

    newsletterForm.addEventListener('submit',function(e){
        e.preventDefault()

        var formData = new FormData()
        formData.append('email', emailField.value)
        formData.append('CRAFT_CSRF_TOKEN', csrfField.value)
        
        fetch('/actions/mailchimp-integration/signup/send', {
            method: 'post',
            body: formData
        })

        emailField.value = ''
        emailField.blur()
        newsletterForm.querySelector('label').textContent = "You're on the list. Speak to you soon!"
        newsletterForm.querySelector('.field').classList.remove('focused')
        newsletterForm.classList.add('submitted')
    })


// Copy contact email address to clipboard when clicked

    document.querySelector('.copyemail').addEventListener('click',function(e){
        e.preventDefault()
        var copyText = document.querySelector('.copyemailinput')
        copyText.select()
        copyText.setSelectionRange(0, 100)
        document.execCommand('copy')
        document.querySelector('.copynotification').classList.add('visible')
        setTimeout(function(){
            document.querySelector('.copynotification').classList.remove('visible')
        },1500)
    })


// Tweet intent system at bottom of notes

    if(document.querySelector('.tweet textarea')){
        document.querySelector('.tweet textarea').addEventListener('keypress',function(){
            var tweetContent = document.querySelector('.tweet textarea').value
            document.querySelector('.tweet .button').setAttribute('href','https://twitter.com/intent/tweet?text='+tweetContent)
        })
    }


// Wobble elements

    var wobbleElements = document.querySelectorAll('.wobble, .wobblewithin li:not(.current-menu-item) a, .wobblewithin p a');

    wobbleElements.forEach(function (el) {
        
        var letters = el.innerText.split('');
        el.innerText = '';

        letters.forEach(function(letter){
            if(letter == " "){
                letter = "&nbsp;";
            }
            el.innerHTML += '<span class="letter">'+letter+'</span>';
        });

        el.addEventListener('mouseover', function(){
            
            if(!el.classList.contains('animating') && !el.classList.contains('mouseover') && !el.classList.contains('active')){
            
                el.classList.add('animating','mouseover');
            
                setTimeout(function(){ el.classList.remove('animating'); }, 500);
                
                var letterElements = el.querySelectorAll('.letter');
                letterElements.forEach(function (letter, i) {

                    if (letters.length > 8) {
                        var timeout = (500 / letters.length) * i;
                    } else {
                        var timeout = 50 * i;
                    }
                    
                    setTimeout(function () {
                        letter.classList.add('fade');
                        setTimeout(function () { letter.classList.remove('fade') }, 500);
                    }, timeout);
                });
                
            }
            
        });
        
        el.addEventListener('mouseout', function(){				
            el.classList.remove('mouseover');
        });
    });


// Auto-detect code blocks and add Prism class automatically

var codeBlocks = document.querySelectorAll('.singlepost code, .singlepost pre');

codeBlocks.forEach(function (el) {

    console.log(el.tagName + ' ' + el.innerHTML.indexOf(':'))

    if (el.parentElement.tagName === 'P') { // inline, doesn't really matter
        el.classList.add('language-sass');
        
    } else if (
        el.innerHTML.indexOf('forEach') !== -1 ||
        el.innerHTML.indexOf('.then') !== -1
    ) { // js
        el.classList.add('language-javascript');

    } else if (el.innerHTML.indexOf(':') > 9) { // sass
        el.classList.add('language-sass');

    } else { // bash?
        el.classList.add('language-bash');

    }

});