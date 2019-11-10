function Present(){
    var x = document.getElementById('civilite');
    x = x.children[2];
    x = x.children[0];
    return x.checked;
};

function Valider(){
    VerificationNoms();
    if(VerificationNoms()==true){
        if (Present()==false) {
            document.getElementById("formulaire").setAttribute("style","display:none");
            document.getElementById("absence").innerHTML = "<span>Etes-vous sûr d'être absent ? <button onclick=Oui()>Oui</button><button onclick=Non()>Non</button></span>";
        }else{
            document.getElementById("formulaire").setAttribute("style","display:none");
            document.getElementById("absence").innerHTML = "<span>Etes-vous sûr d'être présent ? <button onclick=Boutton()>Oui</button><button onclick=Non()>Non</button></span>";
        }
    }
    return;
}


function Oui(){
    console.log(Nom(nom), Prenom(prenom), " sera absent à la soirée.");
    document.getElementById("absence").innerHTML = "<span id='absence_valider'>Vous avez valider votre absence à la soirée.</span>";
    return;
}

function Non(){
    document.getElementById("absence").innerHTML = "";
    document.getElementById("formulaire").setAttribute("style","display:block");
    return;
}

function Boutton(){
    Non();
    document.getElementById("bouton").setAttribute("style","display:block");   
    document.getElementById("valider").setAttribute("style","display:none");
    document.getElementById("civilite").setAttribute("style","display:none");
    document.getElementById("noms_prenom").setAttribute("style","display:block");
    document.getElementById("noms_prenom").innerHTML = "<p>Nom : " + Nom(nom) + "</p><p>Prénom : " + Prenom(prenom) + "</p>";
    document.getElementById("restriction").setAttribute("style","display:none")
    
    return;
}

function Record(){
    document.getElementById("formulaire").setAttribute("style","display:none");
    document.getElementById("absence").innerHTML = "<span>Etes-vous sûr de vous enregistrer ? <button onclick=Oui2()>Oui</button><button onclick=Non()>Non</button></span>";
    return;
}

function Oui2(){
    console.log(Nom(nom), Prenom(prenom), " sera présent à la soirée");
    alert("Vous avez validé votre participation");
    return;
}

function Playlist(){
    document.getElementById("Tableau_playlist").setAttribute("style","display:block");
    document.getElementById("bouton").setAttribute("style","display:none")
    return;
}

function AjouterLigne(param){
    var parent = document.getElementById('div_playlist');
    var element = document.getElementsByClassName('ligne_playlist')[0].innerHTML;
    var creatediv = document.createElement('div');
    creatediv.setAttribute("class","ligne_playlist")
    parent.appendChild(creatediv);
    var x = document.getElementById('div_playlist').lastChild;
    x.innerHTML = element;
    document.getElementById("div_playlist").lastChild.children[3].setAttribute("style","display:none");
    document.getElementById("div_playlist").lastChild.children[5].setAttribute("style","display:inline");
    if (parent.children.length > 1){
        parent.children[0].children[5].setAttribute("style","display: inline");
    }else{
        parent.children[0].children[5].setAttribute("style","display: none");
    }
    return;
}

function SupprimerLigne(param){
    var parent = param.parentElement.parentElement;
    parent.parentNode.removeChild(parent);
    var div = document.getElementById('div_playlist');
    
    if (div.children.length > 1){
        div.children[0].children[5].setAttribute("style","display: inline");
    }else{
        div.children[0].children[5].setAttribute("style","display: none");
    }
    return;
}

function DateTime(param){
    var param = param;
    if ( param.value == "apres_diner" ){
        param.parentElement.children[3].setAttribute("style","display:inline")
    }else{
         param.parentElement.children[3].setAttribute("style","display:none")
    }
    
    return param;
    
}

function Enregistrer(){
    
    console.log(Nom(nom),Prenom(prenom),' sera présent à la soirée.');
    console.log("la playlist est : ");
    var divplay = document.getElementById("div_playlist");
    var tableau = document.getElementById("Tableau_playlist");
    var createtable = document.createElement("Table");
    tableau.appendChild(createtable);
    tableau = tableau.lastChild;
    var longueur = divplay.children.length;
    var ligne;
    var y = 3;
    
    for (i=0; i<longueur;i++){
        ligne = divplay.children[i];
        if (VerificationTime(ligne.children[y])==false){
        return;
        }
    }

    
    for(i=0; i<longueur;i++){
        ligne = divplay.children[i];
        tableau.insertRow(i);
        for (j=0; j<ligne.children.length - 2; j++){
            if ( j == 2 && ligne.children[1].value == ""){
                tableau.rows[i].insertCell(j);
            }else if (j == 3 && ligne.children[1].value == ""){
                tableau.rows[i].insertCell(j);
            }else if(ligne.children[j].value != ""){
                console.log(ligne.children[j].value);
                tableau.rows[i].insertCell(j).innerHTML = ligne.children[j].value;
            }else{
                tableau.rows[i].insertCell(j);
            }
        }
    }
    tableau.insertRow(0).insertCell(0).innerHTML = "<h3>Artiste</h3>";
    tableau.rows[0].insertCell(1).innerHTML = "<h3>Titre</h3>";
    tableau.rows[0].insertCell(2).innerHTML = "<h3>Moment</h3>";
    tableau.rows[0].insertCell(3).innerHTML = "<h3>Heure</h3>";
    divplay.setAttribute("style","display:none");
    document.getElementById("restriction_ligne").setAttribute("style","display:none")
    document.getElementById("enregistrerfin").setAttribute("style","display:none")
    return;
}

function Nom(param){
    var nom = param.value;
    return nom;
}

function Prenom(param){
    var prenom = param.value;
    return prenom;
}

function VerificationNoms(){
    var nom = document.getElementById("nom").value;
    var re = new RegExp(/^[a-z_]+$/i);
    var prenom = document.getElementById("prenom").value;
    var nombool = re.test(nom);
    var prenombool = re.test(prenom);
    if (nombool == false){
        console.log("Erreur ! Nom invalide.");
        document.getElementById("nom").setAttribute("style","border: red solid 2px");
    }else{
        document.getElementById("nom").setAttribute("style","border:")
    }
    if (prenombool == false){
        console.log("Erreur ! Prénom invalide.");
        document.getElementById("prenom").setAttribute("style","border: red solid 2px");
    }else{
        document.getElementById("prenom").setAttribute("style","border:")
    }
    return nombool, prenombool;
    }

function VerificationTime(param){
    var booltime = true;
    var tab = param.value.toString()
    tab = tab.split(":",1);
    if(tab[0] == "" && param.parentElement.children[2].value == "apres_diner" ){
        booltime = false;
        param.setAttribute("style","border: red solid 2px");
        console.log("Erreur ! Le temps doit être compris entre 22h et 5h");
    }else if ( tab[0] < 5 || tab[0] > 21 ) {
        param.setAttribute("style","border:");
    }else{
        booltime = false;
        param.setAttribute("style","border: red solid 2px");
        console.log("Erreur ! Le temps doit être compris entre 22h et 5h")
    }
    return booltime;
}

function Hauteur(){
    var h = window.innerHeight;
    var str = "height : " + h +"px" ;
    document.body.setAttribute("style",str  )
    return;
}
