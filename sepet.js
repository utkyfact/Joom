const basket = document.querySelector(".basket")
const btnCat = document.getElementById("btn-category")
const catOpen = document.querySelector(".category-open")
const arkaPlan = document.querySelector(".arka-plan")
const badge = document.querySelector(".badge")

const userLog = document.getElementById("username-log")
const passLog = document.getElementById("pass-log")
const mailLog = document.getElementById("mail-log")
const btnLog = document.getElementById("btn-log")

const userReg = document.getElementById("username-reg")
const passReg = document.getElementById("pass-reg")
const mailReg = document.getElementById("mail-reg")
const btnReg = document.getElementById("btn-reg")

const wrapModal = document.querySelector(".wrapper-modal")

const formLog = document.querySelector(".form-login")
const formReg = document.querySelector(".form-register")
const title = document.getElementById("staticBackdropLabel")
const btnChange = document.querySelector(".btn-change")

// LOCAL STORAGE ÇEKİLEN SEPET VERİLERİNİ SEPET SAYFASINA YAZDIRMA FONKSİYONU
function ekranaYazdir(){
    let items = JSON.parse(localStorage.getItem("sepet"))
    for(let i of items){
        const div = document.createElement("div")
        div.classList.add("d-flex","p-3","bg-white","rounded-3","mt-2")
        div.setAttribute("id",`${i.id}`)
        div.innerHTML = 
        `
        <div class="d-flex gap-2">
            <div class="position-relative">
                <input class="position-absolute top-0" type="checkbox">
                <div class="sepet-logo ms-3">
                    <img src="${i.resim}">
                </div>
            </div>

            <div>
            <p class="hide-p">${i.name}</p>
            <div class="text-secondary">Teslimat: 19-42 gün</div>
                <div class="d-flex align-items-center gap-2">
                    <button class="subtract-btn border border-0 rounded-3 px-2">-</button>
                    <span class="adet">${i.adet}</span>
                    <button class="add-btn border border-0 rounded-3">+</button>
                    <button id="${i.id}" class="remove-btn border border-0 rounded-3"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div>
                <span class="text-secondary text-decoration-line-through">₺${i.price * 2}</span>
                <span>₺<span class="fiyat">${i.price}</span></span>
            </div>
        </div>
    `
    basket.append(div)
    }
    badge.textContent = items.length

    // SEPET BOŞ OLDUĞUNDA GÖRÜNECEK OLAN KISIM
    localStorage.setItem("sepet",JSON.stringify(items))
    if(items.length == ""){
        arkaPlan.innerHTML = 
        `
        <div class="ana">
            <a href="./index.html">Ana sayfa</a>
            <div class="d-flex flex-column align-items-center justify-content-center">
                <div class="empty-basket text-center">
                    <img src="./img/sepet.png">
                </div>
                <div class="d-flex flex-column align-items-center gap-3 mb-3">
                    <h4>Sepetin boş</h3>
                    <button class="btn btn-danger p-2 px-3">Ürünleri gör</button>
                </div>
            </div>
        </div>
        `
    }
    
    const butonlarSil = basket.querySelectorAll(".remove-btn")
    const butonlarArttir = basket.querySelectorAll(".add-btn")
    const butonlarAzalt = basket.querySelectorAll(".subtract-btn")
    
    butonlarArttir.forEach(btn => {
        btn.addEventListener("click",function(){
            arttir(this)
        })
    })

    butonlarAzalt.forEach(btn => {
        btn.addEventListener("click",function(){
            azalt(this)
        })
    })

    butonlarSil.forEach(btn => {
        btn.addEventListener("click",function(){
            sil(this)
        })
    })
}
ekranaYazdir()

// SEPET ÜRÜNLERİNİ ARTTIRMA
function arttir(btn){
    let items = JSON.parse(localStorage.getItem("sepet"))
    let fiyat = btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent
    let adet = btn.parentElement.children[1].textContent
    let birimFiyat = fiyat / adet
    let secilenUrun = items.find(item => item.price == fiyat)
    adet++
    
    secilenUrun.price = adet * birimFiyat
    secilenUrun.adet = adet
    fiyat = secilenUrun.price
    adet = secilenUrun.adet
    let promosyonsuz = fiyat * 2
    btn.parentElement.parentElement.parentElement.children[2].children[0].textContent = promosyonsuz
    btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent = fiyat
    btn.parentElement.children[1].textContent = adet
    localStorage.setItem("sepet",JSON.stringify(items))
}

// SEPET ÜRÜNLERİNİ AZALTMA
function azalt(btn){

    let items = JSON.parse(localStorage.getItem("sepet"))
    let fiyat = btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent
    let adet = btn.parentElement.children[1].textContent
    
    
    let birimFiyat = fiyat / adet
    let secilenUrun = items.find(item => item.price == fiyat)
    
    adet--
    if(adet == 1){
        btn.disabled = true
    }
    secilenUrun.price = adet * birimFiyat
    secilenUrun.adet = adet
    
    fiyat = secilenUrun.price
    adet = secilenUrun.adet
    
    let promosyonsuz = fiyat * 2
    btn.parentElement.parentElement.parentElement.children[2].children[0].textContent = promosyonsuz
    btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent = fiyat
    btn.parentElement.children[1].textContent = adet
    
    localStorage.setItem("sepet",JSON.stringify(items))
}

// SEPET ÜRÜNLERİNİ SİLME
function sil(btn){
    let remove = btn.parentElement.parentElement.parentElement.parentElement
    let items = JSON.parse(localStorage.getItem("sepet"))
    let updateİtems = items.filter((item)=> (item.id != remove.id))
    
    localStorage.setItem("sepet",JSON.stringify(updateİtems))
    remove.remove()
    badge.textContent -= 1
}

// AÇILIR KAPANIR KATALOG
btnCat.addEventListener("click",()=>{
    catOpen.classList.toggle("d-none")
})

// GİRİŞ KAYIT ARASI İNNER HTML DEĞİŞTİRMEK İÇİN BİR FONKSİYON
btnChange.addEventListener("click",()=>{
    formLog.classList.toggle("d-none")
    formReg.classList.toggle("d-none") 
    wrapModal.innerHTML = ""
})

// REGİSTER FONKSİYON
btnReg.addEventListener("click",register)
function register(){
    wrapModal.innerHTML = ""
    let kayitol = JSON.parse(localStorage.getItem("kayit"))
    if(userReg.value.trim() != "" && passReg.value.trim() != "" && mailReg.value.trim() != ""){
        let kullanici = {
            user:userReg.value,
            pass:passReg.value,
            mail:mailReg.value
        }
        kayitol.push(kullanici)
        localStorage.setItem("kayit",JSON.stringify(kayitol))
        const p = document.createElement("p")
        p.textContent = "Başarı ile kayıt oldunuz."
        p.classList.add("text-success","p-2")
        wrapModal.append(p)
    }  
    userReg.value = ""
    passReg.value = ""
    mailReg.value = ""
}

// LOGİN FONKSİYON
btnLog.addEventListener("click",login)
function login(){
    wrapModal.innerHTML = ""
    let kayitol = JSON.parse(localStorage.getItem("kayit"))
    let eslesme = kayitol.filter(uye => uye.user == userLog.value && uye.pass == passLog.value && uye.mail == mailLog.value)
    if(eslesme.length != 0){
        const p = document.createElement("p")
        p.textContent = "Başarı ile giriş yaptın."
        p.classList.add("text-success","p-2")
        wrapModal.append(p)
    }else{
        const p = document.createElement("p")
        p.textContent = "Kayıt olmadan giriş yapılamaz."
        p.classList.add("text-danger","p-2")
        wrapModal.append(p)
    }
}