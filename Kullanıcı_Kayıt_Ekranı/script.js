const form = document.getElementById('form');
const username = document.getElementById('kullaniciAdi');
const email = document.getElementById('email');
const password = document.getElementById('sifre');
const password2 = document.getElementById('sifre2');

//Text'lerde ki hata mesajı verme fonksiyonu
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className ='form-control error';
    const small =formControl.querySelector('small');
    small.innerText = message;
}

//Text'lerde başarılı olduğunu gösterme fonksiyonu
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className ='form-control success';
}

//Email regexini kontrol etme
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(input.value)){
        showSuccess(input);
    }else{
        showError(input,'Email geçerli değil!');
    }
}

//Boş geçilen alanlarda gerekli yazısını çıkartma
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} gerekli`)
        } else{
            showSuccess(input)
        }
    });
}

//inputların uzunluk sınırlamasınının verildiği fonksiyon
function checkLength(input,min,max){
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} en az ${min} karakter olmalıdır.`)
    } else if(input.value.length>max){
        showError(input,`${getFieldName(input)} en fazla ${max} karakter olmalıdır.`)
    } else{
        showSuccess(input);
    }
}

//Şifre eşlesmesinin kontrolü

function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2,'Sifre eşleşmiyor!');
    }
}

//Hata verdiğinde ilk harfin büyük gösterilmesi fonksiyonu
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() +input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    
    checkRequired([kullaniciAdi,email,sifre,sifre2]);
    checkLength(kullaniciAdi,3,15);
    checkLength(sifre2, 6,25);
    checkEmail(email);
    checkPasswordsMatch(sifre,sifre2)
})

