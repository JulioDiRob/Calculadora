window.onload = function(){ //Acciones tras cargar la página
    pantalla=document.getElementById("textoPantalla"); //elemento pantalla de salida
}
x="0"; //número en pantalla
xi=1; //iniciar número en pantalla: 1=si; 0=no;
coma=0; //estado coma decimal 0=no, 1=si;
ni=0; //número oculto o en espera.
op="no"; //operación en curso; "no" =  sin operación.
fun=0;

//mostrar número en pantalla según se va escribiendo:
function numero(xx) { //recoge el número pulsado en el argumento.
    if (x=="0" || xi==1  ) {	// inicializar un número, 
        pantalla.innerHTML=xx; //mostrar en pantalla
        x=xx; //guardar número
        if (xx==".") { //si escribimos una coma al principio del número
            pantalla.innerHTML="0."; //escribimos 0.
            x=xx; //guardar número
            coma=1; //cambiar estado de la coma
        }
        if (xx=="π"){
            pantalla.innerHTML="π";
            x=Math.PI;
        }
        if (xx=="e"){
            pantalla.innerHTML="e";
            x=Math.E
        }
    }
    else { //continuar escribiendo un número
        if (xx=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
            pantalla.innerHTML+=xx;
            x+=xx;
            coma=1; //cambiar el estado de la coma  
        }
        else if(xx=="π" && coma==0){
            pantalla.innerHTML+="π";
            x=x*Math.PI;
        }
        else if(xx=="e" && coma==0){
            pantalla.innerHTML+="e";
            x=x*Math.E;
        }
        //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
        else if (xx=="e^" && coma==1 || xx=="." && coma==1 || xx=="π" && coma==1 || xx=="e" && coma==1) {} 
        //Resto de casos: escribir un número del 0 al 9: 	 
        else {
            pantalla.innerHTML+=xx;
            x+=xx
        }
    }
    xi=0 //el número está iniciado y podemos ampliarlo.
}

function operar(s) {
    igualar() //si hay operaciones pendientes se realizan primero
    ni=x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
    op=s; //guardamos tipo de operación.
    xi=1; //inicializar pantalla.
}	

function igualar() {
    var cad=""+x;
    var prueba=cad.substring(0,2);
    if (op=="no") { //no hay ninguna operación pendiente.
        pantalla.innerHTML=x;	//mostramos el mismo número
        checapotencia(prueba,cad); 
    }
    else { //con operación pendiente resolvemos
        checapotencia(prueba,cad);
        sl=ni+op+x; // escribimos la operación en una cadena
        if(op=="^"){
            epot(ni,x);
        }
        else{
            sol=eval(sl) //convertimos la cadena a código y resolvemos
            pantalla.innerHTML=sol //mostramos la solución
            x=sol; //guardamos la solució
        }
        op="no"; //ya no hay operaciones pendientes
        xi=1; //se puede reiniciar la pantalla.  
    }
}

function raizc() {
    x=Math.sqrt(x) //resolver raíz cuadrada.
    pantalla.innerHTML=x; //mostrar en pantalla resultado
    op="no"; //quitar operaciones pendientes.
    xi=1; //se puede reiniciar la pantalla 
}

function seno(){
    x=Math.sin(x);
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function coseno(){
    x=Math.cos(x);
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function tangente(){
    x=Math.tan(x)
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function ln () {
    x=Math.log(x);
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function log (){
    x=Math.log10(x);
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function cuadrado (){
    x=Math.pow(x,2);
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function cubo(){
    x=Math.pow(x,3);
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function factorial(){
    var i;
    for (i=x-1; i>0; i--){
        x=x*i;
    }
    pantalla.innerHTML=x;
    op="no";
    xi=1;
}

function porcent() { 
    x=x/100 //dividir por 100 el número
    pantalla.innerHTML=x; //mostrar en pantalla
    igualar() //resolver y mostrar operaciones pendientes
    xi=1 //reiniciar la pantalla
}

function opuest() { 
    nx=Number(x); //convertir en número
    nx=-nx; //cambiar de signo
    x=String(nx); //volver a convertir a cadena
    pantalla.innerHTML=x; //mostrar en pantalla.
}

function inve() {
    nx=Number(x);
    nx=(1/nx);
    x=String(nx);		 
    pantalla.innerHTML=x;
    xi=1; //reiniciar pantalla al pulsar otro número.
}

function retro(){ //Borrar sólo el último número escrito.
    cifras=x.length; //hayar número de caracteres en pantalla
    br=x.substr(cifras-1,cifras) //describir último caracter
    x=x.substr(0,cifras-1) //quitar el ultimo caracter
    if (x=="") {x="0";} //si ya no quedan caracteres, pondremos el 0
    if (br==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
    pantalla.innerHTML=x; //mostrar resultado en pantalla	 
}

function borradoParcial() {
    pantalla.innerHTML=0; //Borrado de pantalla;
    x=0; //Borrado indicador número pantalla.
    coma=0;	//reiniciamos también la coma				
}

function borradoTotal() {
    pantalla.innerHTML=0; //poner pantalla a 0
    x="0"; //reiniciar número en pantalla
    coma=0; //reiniciar estado coma decimal 
    ni=0 //indicador de número oculto a 0;
    op="no" //borrar operación en curso.
}

function epot(arg, p){
    if(arg=="e^"){
        x=Math.pow(Math.E,p);
    }
    else{
        x=Math.pow(arg,p);
    }
    pantalla.innerHTML=x;
}

function checapotencia(prueba, c){
    if (prueba=="e^"){
        var cadsig=c.substring(2,c.length);
        epot(prueba,cadsig);
    }
    else {
        var checaepot="";
        for (i=0; i<c.length; i++){
            if(checaepot.length==2){
                checaepot=checaepot.charAt(1)+c.charAt(i);
            }
            else{
                checaepot+=c.charAt(i);
            }
            if(checaepot=="e^"){
                var exp=c.substring(i+1,c.length)
                epot(checaepot,exp);
                var nums=c.substring(0,i-1);
                sol=eval(x*nums);
                x=sol;
                pantalla.innerHTML=sol;
                i=c.length;
            }
        }
    }
}

function binario (){
    var cadbin="";
    var res=Math.trunc(x);
    while(res>1){
        if((res%2)==0){
            cadbin+=0;
        }
        else{
            cadbin+=1;
        }
        res=Math.trunc(res=res/2);
    }
    cadbin+=1;
    cadbin=invertir(cadbin);
    if(coma==1){
        cadbin+=".";
        var rec=x;
        var ch="";
        for(i=0; i<rec.length;i++){
            ch=rec.charAt(i);
            if(ch=="."){
                var sub=rec.substring(i,rec.length);
                var dec=sub;
                var j=0;
                while (dec!=1 && j<5){
                    cadbin+=Math.trunc(dec*2);
                    dec=dec*2;
                    if(dec>1){
                        dec=dec-1;
                    }
                    j++;
                }
            i=rec.length;
            }
        }
    }
    pantalla.innerHTML=cadbin;
}

function invertir (cad){
    var x=cad.length;
    var cadnueva="";
    while (x>-1){
        cadnueva+=cad.charAt(x-1);
        x--;
    }
    return cadnueva;
}

function octal(){
    var cadoct="";
    var res=Math.trunc(x);
    while(res>7){
        cadoct+=res%8;
        res=Math.trunc(res/8);
    }
    cadoct+=res
    cadoct=invertir(cadoct);
    if(coma==1){
        cadoct+=".";
        var rec=x;
        var ch="";
        for(i=0; i<rec.length;i++){
            ch=rec.charAt(i);
            if(ch=="."){
                var sub=rec.substring(i,rec.length);
                var dec=sub;
                var j=0;
                while (dec!=7 && j<5){
                    cadoct+=Math.trunc(dec*8);
                    dec=dec*8;
                    if(dec>7){
                        dec=dec-7;
                    }
                    j++;
                    if((dec%1)==0){
                        j=5;
                    }
                    else{
                        dec=(dec-Math.trunc(dec));
                    }
                }
            i=rec.length;
            }
        }
    }
    pantalla.innerHTML=cadoct;
}

function hexa(){
    var cadhex="";
    var res=Math.trunc(x);
    while(res>15){
        if(res%16==15){
            cadhex+="F";
        }
        else if(res%16==14){
            cadhex+="E";
        }
        else if(res%16==13){
            cadhex+="D";
        }
        else if(res%16==12){
            cadhex+="C";
        }
        else if(res%16==11){
            cadhex+="B";
        }
        else if(res%16==10){
            cadhex+="A";
        }
        else{
            cadhex+=res%16;
        }
        res=Math.trunc(res/16);
    }
    if(res==15){
        cadhex+="F";
    }
    else if(res==14){
        cadhex+="E";
    }
    else if(res==13){
        cadhex+="D";
    }
    else if(res==12){
        cadhex+="C";
    }
    else if(res==11){
        cadhex+="B";
    }
    else if(res==10){
        cadhex+="A";
    }
    else{
        cadhex+=res;
    }
    cadhex=invertir(cadhex);
    if(coma==1){
        cadhex+=".";
        var rec=x;
        var ch="";
        for(i=0; i<rec.length;i++){
            ch=rec.charAt(i);
            if(ch=="."){
                var sub=rec.substring(i,rec.length);
                var dec=sub;
                var j=0;
                while (dec!=16 && j<5){
                    if((Math.trunc(dec*16))==15){
                        cadhex+="F";
                    }
                    else if((Math.trunc(dec*16))==14){
                        cadhex+="E";
                    }
                    else if((Math.trunc(dec*16))==13){
                        cadhex+="D";
                    }
                    else if((Math.trunc(dec*16))==12){
                        cadhex+="C";
                    }
                    else if((Math.trunc(dec*16))==11){
                        cadhex+="B";
                    }
                    else if((Math.trunc(dec*16))==10){
                        cadhex+="A";
                    }
                    else{
                        cadhex+=Math.trunc(dec*16);
                    }
                    dec=dec*16;
                    if(dec>15){
                        dec=dec-15;
                    }
                    j++;
                    if((dec%1)==0){
                        j=5;
                    }
                    else{
                        dec=(dec-Math.trunc(dec));
                    }
                }
            i=rec.length;
            }
        }
    }
    pantalla.innerHTML=cadhex;
}