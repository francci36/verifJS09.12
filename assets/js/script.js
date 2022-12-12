function verifPassword(){
    let verifPassword1 = document.getElementById('password1');
    let verifPassword2 = document.getElementById('password2');
    if(verifPassword1.value == verifPassword2.value){
        if(verifPassword1.value.length >= 8){
            return true;
        }else{
            document.getElementById('message').innerHTML = 'Longueur du mot de passe incorrect';
            return false;
        }
    }else{
        document.getElementById('message').innerHTML = "les deux mots de passe ne correspondent pas";
        return false;
    }
}
function listAge(min,max){
    if(max > min){
        let liste = document.getElementById('age');
        for(let i = min;i<= max;i++){
            liste.innerHTML+='<option value="'+i+'">'+i+' ans</option>';
        }
    }else{
        console.log("attention problèmes avec valeurs pour l'age");
    }
}
function verifLength(element,longueur){
    let valeur = element.value;
    let booleen = true
    if(valeur.length >= longueur){
        booleen = true
    }else{
        //alert('ce champ doit contenir '+longueur+'caractères');
        booleen = false;
    } 
        // On verifie la longueur du mot de passe et on adapte la couleur du background
 switch(valeur.length){
    case 6:
        element.style.background = 'red';
        break;
    case 8:
        element.style.background = 'orange';
    break;
    case 12:
        element.style.background = 'green';
    break;
}
return booleen;
}
// Fonction qui qui génère un mot de passe
function genereMdp(){
    //chaine de caractere pour le MDP
    let caracteres = 'azertyuopqsdfghjklmwjjfertgzijibtinblbiorbjhzoribabhoirbioaZERTYJKUFVBSIBBQLIBNK5(-è_çà)=';
    //valeur aleatoire  entre 0 et 8 pour le mdp
    let long = Math.floor(Math.random()*16);
    // longuer minimum : 8 caracteres, max: 16
    long = 8+long;
    // on instancier notre variable mot de passe
    let motdepasse = '';
    for(let i=0;i<=long;i++){
        motdepasse+= caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    }
    document.getElementById('password1').value = motdepasse;
    document.getElementById('password2').value = motdepasse;

}
function voirMdp(){
    document.getElementById('password1').setAttribute('type','text');
    document.getElementById('password2').setAttribute('type','text');
}
function cacherMdp(){
    document.getElementById('password1').setAttribute('type','password');
    document.getElementById('password2').setAttribute('type','password');
}
function affiche5mdp(){
    voirMdp();
    let cache = setTimeout('cacherMdp()',5000);
  
}
function gerald(){
    let password1 = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    if(password1.getAttribute('type') == 'text' && password2.getAttribute('type') == 'text'){            
        cacherMdp();
        document.getElementById('btn-affiche').innerHTML = 'afficher mot de passe';
    }else{
        voirMdp();
        document.getElementById('btn-affiche').innerHTML = 'cacher mot de passe';
    }
}
function verifAge(){
    let age = document.getElementById('age');
    if(age.value >= 18){
        //on change la condition
        if(age.value <=21){
            document.forms["javascript"].setAttribute('action' , "jeune.php")

        }else if(age.value >40){
            document.forms["javascript"].setAttribute('action' , "vieux.php")
        }else{
            document.forms["javascript"].setAttribute('action' , "action.php")
        }
        document.getElementById('message').innerText = "Vous avez l'age nécessaire";
        document.getElementById('submit').removeAttribute('disabled');
        document.getElementById('submit').innerText = 'inscription';
        return true;
    }else{
        document.getElementById('submit').setAttribute('disabled','disabled');
        document.getElementById('submit').innerText = 'impossible de valider le formulaire';
        return false;
    }
}
function verifEmail(element){
    let regex = /^[a-z0-9.-]{4,}@+[a-z0-9.-]{4,}.+[a-z]{2,}$/i;
    if(regex.test(element.value)){
        // la regex est ok
        element.style.background = 'green';
    }else{
        // la regex ne passe pas
        element.style.background = 'red';
    }
}
function verifTelephone(element){
    let regex = /^[0-9]{10}$/i;
    if(regex.test(element.value)){
        // la regex est ok
        element.style.background = 'blue';
    }else{
        // la regex ne passe pas
        element.style.background = 'black';
    }
}
function listfPays(){
    let listPays=["Belgique","Canada","Italie","France","Suisse","Autre"," Afrique","Etats","Luxembourg"]
    let selectPays = document.getElementById('pays')
        for( i = 0;i<=  listPays.length;i++){
            selectPays.innerHTML+='<option value="'+listPays[i]+'">'+listPays[i]+'</option>';
        }

}
function verifForm(){
    let nom =document.getElementById('nom');
    let prenom =document.getElementById('prenom');
    let email =document.getElementById('email');
    if(nom.value != "" && prenom.value != "" && email.value != ""){
        // si la personne a plus de 18 ans
        if(verifAge()){
            // on verifie si les mots de passes font plus de 8 caracteres et s'ils sont identiques
            if(verifPassword()){
                return true;
            }else{
                // si les mot de passes ne sont pas identiques
                return false;
            }
        }else{
            //si la personne est mineur
            return false;
        }
    }else{
        // si un des champs n'est pas saisie
        if(nom.value == ""){
            document.getElementById('message').innerText = "veuillez renseigner votre nom"
        }
        else if(prenom.value == ""){
            document.getElementById('message').innerText = "veuillez renseigner votre prenom"
        }
        else if(email.value == ""){
            document.getElementById('message').innerText = "veuillez renseigner votre email"
        }
        return false;
    }
    
}
listAge(12,70);
verifAge();
listfPays();
(function(){
    let httpRequest;
    document.getElementById('ajax').addEventListener('click',makeRequest);

    function makeRequest(){
        // on instancie XMLHtpRequest
        httpRequest = new XMLHttpRequest();

        if(!httpRequest){
            console.log("Erreur lors de la création de l'instance");
            return false;
        }
        httpRequest.onreadystatechange = traiterRequete;
        httpRequest.open('GET','ajax.html');
        httpRequest.send();
    }
    function traiterRequete(){
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                document.getElementById('retour_ajax').innerHTML = httpRequest.responseText;
            }else{
                console.log('Erreur avec la requête');
            }
        }
    }
})();