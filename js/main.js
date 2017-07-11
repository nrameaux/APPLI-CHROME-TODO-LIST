


//COMMENCEMENT DU JS POUR LES INTÉRACTIONS VISUELLES



//INTÉRACTIONS DE BASE
$('.btn_access_Dim').css('color','white')
$('.section_globale').css('left','500px').css('width','30%');

//INTÉRACTIONS QUAND JE CLIC SUR LE BOUTON AGGRANDIR
$('.btn_access_Aggr').click(function(){
    $('.section_formulaire').css('left','0').css('opacity','1');
    $('.section_globale').css('left','500px').css('width','64.91%');
    $('.btn_access_Aggr').css('color','white').css('left','515px').css('transform','rotate(45deg)');
    $('.btn_access_Dim').css('color','black').css('left','565px');
    $('#btn_Submit_Modif').css('display','none');
    $('#btn_Submit_Suppr').css('display','none');
    $('#btn_Submit_Send').css('display','block');
    $("textarea").html('');
    $("input#dateArea").attr("value",'');
    $("input#catArea").attr("value",'');
});

//INTÉRACTIONS QUAND JE CLIC SUR LE BOUTON DIMINUER
$('.btn_access_Dim').click(function(){
    $('.section_formulaire').css('left','-500px').css('opacity','0');
    $('.section_globale').css('left','0').css('width','30%');
    $('.btn_access_Aggr').css('color','black').css('left','10px').css('transform','rotate(0deg)').css('display','block');
    $('.btn_access_Dim').css('color','white').css('left','60px');
});

//INTÉRACTIONS QUAND JE CLIC SUR UN <LI>
$('ul').on('mousedown', function(event) {
        event.preventDefault();
    }).on('click', 'li', function() {
        $('.btn_access_Aggr').css('display','none')
        $('.section_formulaire').css('left','0').css('opacity','1');
        $('.section_globale').css('left','500px').css('width','64.91%');
        $('.btn_access_Aggr').css('color','white').css('left','515px').css('transform','rotate(45deg)');
        $('.btn_access_Dim').css('color','black').css('left','505px');
        $('#btn_Submit_Send').css('display','none');
        $('#btn_Submit_Modif').css('display','block');
        $('#btn_Submit_Suppr').css('display','block');
});




// console.log($('#dateArea').val());

   moment.locale('fr');  


// ON RECUPERE LA VALEUR TEXTAREA ET ON L'INJECTE DANS UN TABLEAU DANS LE LOCALSTORAGE
$('.bloc_bottom').on('submit',function(event){
    event.preventDefault();

    // CONDITION : SI MON TEXTAREA EST VIDE MON SUBMIT NE FONCTIONNERA PAS   
    if($('textarea').val() && $('input#catArea').val() == '' ){
        return false
    }
    else{
        //JE RÉCUPÈRE LA VALEUR DE MON TEXTAREA ET L'A STOCK DANS UNE VAR
        var textArea = document.getElementById('texteArea_Recup').value;
    }

    //JE MET DANS UNE VARIABLE LE CONTENU DE MON LOCALSTORAGE ET JE LUI DONNE UN NOMS
    var recupValeur = JSON.parse(localStorage.getItem("ecriture"));

    //JE CRÉE UNE CONDITION POUR CRÉER UN TABLEAU SI CELUI-CI EST NON EXISTANT
    if (recupValeur == undefined) {
        recupValeur = [];
    }

    //JE RÉCUPÈRE DANS UNE VARIABLE LA VALUE DE L'INPUT DATE
    var dateArea = document.getElementById('dateArea').value;  

    //JE RÉCUPÈRE LA VALEUR DE MON INPUT CATÉGORIE
    var catArea = document.getElementById('catArea').value;
    // console.log(catArea)

    //JE PUSH DANS MON TABLEAU CLÉ ET VALUE POUR LA TACHE, DATE et CATÉGORIE
    recupValeur.push({ 
        tache: textArea,
        date: dateArea,
        categorie: catArea,
        effectue: false
    });

    //JE MODIFIE LE CONTENU DE MON TABLEAU AVEC STRINGIFY QUI REMET EN CHAINE DE CARACTERE
    var toutMonTab = JSON.stringify(recupValeur);

    //J'ENVOI DANS MON LOCALSTORAGE UNE CLÉ ET UNE VALEUR
    localStorage.setItem("ecriture", toutMonTab);

    //J'ENVOI LE CONTENU DE MES VARIABLES DANS DES <LI> - CRÉATION D'UNE BOUCLE POUR CHECK L'INDEX
    for (let i = 0; i < recupValeur.length; i++){
        $(".sendCatArea").append('<h4>'+' '+'-'+' '+' '+recupValeur[i].categorie+'</h4>'); 
    }

    //J'ENVOI LE CONTENU DE MON CATAREA DANS DES <H4>
    $("ul").append('<li>'+' '+'-'+' '+catArea+moment(dateArea).format("LLL")+'</li>');

    //JE RÉINITIALISE LA VALEUR DE MON TEXTAREA À 0
    $('textarea').val('');

    // RELOAD DE LA PAGE
    location.reload(true);
});


// AU CHARGEMENT DE LA PAGE ON CHECK ET AJOUTE LES TACHES AU DOM
$(window).on('load',function(){
    
    //JE RÉCUPÈRE TOUT LE CONTENU DE MON LOCALSTORAGE
    recupValeur = JSON.parse(localStorage.getItem("ecriture"));

    //JE CRÉE UNE BOUCLE QUI RÉCUPÈRE TOUS LES OBJETS DE MON LOCALSTORAGE
    for (let i = 0; i < recupValeur.length; i++){
        //ENVOI TOUTES LES TACHES DANS LE DOM
        var className="";
        var checked="";
        //CONDITION 
        if(recupValeur[i].effectue){
            className="visuelLiCheck";
            checked="checked";
        }
        //AJOUT DE LA VALUE DU TEXTAREA ET DE L'INPUT DATETIME-LOCAL DANS LE DOM AVEC DES LI 
        $("ul").append('<li class='+className+'>'+recupValeur[i].tache+' '+'-'+' '+moment(recupValeur[i].date).format('LLL')+'<input '+checked+' class="checkbox" type="checkbox"/></li>');
        //AJOUT DE LA VALUE DE L'INPUT CATÉGORIE DANS LE DOM AVEC DES H4 
        $(".sendCatArea").append('<h4>'+' '+'-'+' '+' '+recupValeur[i].categorie+'</h4>');
    }    
    

        //ÉVÉNEMENT AU CLIC SUR L'INPUT CHECKBOX
        $('input[type="checkbox"]').click(function(){
            var idTrait = $(this).parent().index(); 

        if ($(this).is(':checked')) {
            $(this).parent('li').addClass('visuelLiCheck');
            recupValeur[idTrait].effectue = true;
            localStorage.setItem("ecriture", JSON.stringify(recupValeur));
        }
        else{
            $(this).parent('li').removeClass('visuelLiCheck');
            recupValeur[idTrait].effectue = false;
            localStorage.setItem("ecriture", JSON.stringify(recupValeur));
        }

        }); 
});


//QUAND JE CLIC SUR MON LI J'AFFICHE SON CONTENU DANS MON TEXTAREA
$('ul').on('click', 'li', function() {

    //JE RÉCUPÈRE MON LOCALSTORAGE
    var recupValeur = JSON.parse(localStorage.getItem("ecriture"));

    //JE RECUP L'INDEX' DE L'OBJET LI A MODIFIER   
    var idObject = $(this).index();  

    //JE RECUP L'OBJET À L'INDEX RECHERCHER
    var dateObject = recupValeur[idObject].date;

    //SI JE CLIC SUR UN <LI> ET QUE LE TEXTAREA CONTIENT DÉJÀ UN <LI> JE CLEAN LE TEXTAREA POUR METTRE LE NOUVEAU <LI> CLIQUÉ
    if($('textarea').val() == ''){
       $("textarea").html(recupValeur[idObject].tache);
       $("input#dateArea").attr("value",moment(dateObject).format("YYYY-MM-DDTHH:mm"));
       $("input#catArea").attr("value",recupValeur[idObject].categorie);
    } 
    //SINON LE TEXTAREA SE CLEAN AVANT
    else{
       $("textarea").html('');
       $("textarea").html(recupValeur[idObject].tache);
       $("input#dateArea").attr("value",moment(dateObject).format("YYYY-MM-DDTHH:mm"));
       $("input#catArea").attr("value",recupValeur[idObject].categorie);
    }
    

    // ACTIVER LA MODIFICATION DU TEXTAREA AVEC LE BOUTON MODIFIER
    $('#btn_Submit_Modif').on('click',function(event){
        event.preventDefault();

        //CONDITION : SI MON TEXTAREA EST VIDE MON SUBMIT NE FONCTIONNERA PAS   
        if($('textarea').val() == ''){
            return false
        }
        //RÉCUPÉRATION DE LA NOUVELLE VALUE DU TEXTAREA
        var textArea = document.getElementById('texteArea_Recup').value;

        //RÉCUPÉRATION DE LA NOUVELLE VALUE DE L'INPUT CATÉGORIE    
        var catArea = document.getElementById('catArea').value;

        //RÉCUPÉRATION DE MON LOCALSTORAGE
        var recupValeur = JSON.parse(localStorage.getItem("ecriture"));

        //JE RÉCUPÈRE DANS UNE VARIABLE LA VALUE DE L'INPUT DATE
        var dateArea = document.getElementById('dateArea').value; 

        //JE MET DANS MA VALUE, DE LA CLÉ À L'INDEX CORRESPONDANT, LA VALEUR DU TEXTAREA
        recupValeur[idObject].tache = textArea;

        //JE MET DANS MA VALUE, DE LA CLÉ À L'INDEX CORRESPONDANT, DE L'INPUT CATÉGORIE
        recupValeur[idObject].categorie = catArea;

        //JE MET DANS MA VALUE, DE LA CLÉ À L'INDEX CORRESPONDANT, DE L'INPUT DATETIME
        recupValeur[idObject].date = dateArea;

        //J'ENVOI DANS MON LOCALSTORAGE MON TAB STRINGIFY
        localStorage.setItem("ecriture", JSON.stringify(recupValeur));
  
        //JE RÉINITIALISE LA VALEUR DE MON TEXTAREA À 0
        $('textarea').val('');

        //RELOAD DE LA PAGE
        location.reload(true);
    });


        // SUPPRESSION DE L'ÉVÉNEMENT AVEC LE BOUTON SUPPRIMER
        $('#btn_Submit_Suppr').on('click',function(event){
            event.preventDefault();

            //CONDITION : SI MON TEXTAREA EST VIDE MON SUBMIT NE FONCTIONNERA PAS   
            if($('textarea').val() == ''){
                return false
            }
            //RÉCUPÉRATION DE MON LOCALSTORAGE        
            var recupValeur = JSON.parse(localStorage.getItem("ecriture"));

            //SUPPRESSION DE LA CLÉ VALUE
            recupValeur.splice(idObject,1);

            //J'ENVOI DANS MON LOCALSTORAGE MON TAB STRINGIFY
            localStorage.setItem("ecriture", JSON.stringify(recupValeur));

            //JE RÉINITIALISE LA VALEUR DE MON TEXTAREA À 0
            $('textarea').val('');

            //RELOAD DE LA PAGE
            location.reload(true);
        });
});

