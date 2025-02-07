//dritter Anlauf, weil nochmal anderen Ansatz gewählt
//dieses github treibt mich nochmal zur weissglut...
//das ist ein Tool zur Berechnung von Dreiecken
//es wurden der ganze Code selbst geschrieben.
//Zum Nachschlagen wurden verschiedene Seiten aufgerufen, wie z.B. w3schools.com, selfhtml.org, mozilla.org, studienkreis.de, mathful.com, arndt-bruenner.de
class Point {
    constructor(x_co, y_co, point_name){
        this.x_co = x_co
        this.y_co = y_co
        this.point_name = point_name
    }
}
//Berechnung der Abstände zwischen den Punkten
Point.prototype.distance = function(ctx){
    let delta_x = this.x_co - ctx.x_co
    let delta_y = this.y_co - ctx.y_co
    return Math.sqrt(delta_x**2 + delta_y**2)
}
//Punkte zeichnen und beschriften
Point.prototype.draw_point = function(ctx){
    ctx.beginPath()
    ctx.font = "14px Arial"
    ctx.fillStyle="rgb(61, 94, 241)"
    ctx.fillText(this.point_name, this.x_co + 10, this.y_co + 10)
    ctx.arc(this.x_co,this.y_co,6,0,2*Math.PI)
    ctx.fill()
    ctx.stroke()
}
//Verbindungslinien zwischen den Punkten ziehen
Point.prototype.draw_line = function(point, ctx){
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = "#E0000D"
    ctx.moveTo(this.x_co, this.y_co)
    ctx.lineTo(point.x_co, point.y_co)
    ctx.stroke()
}
//Globale Variablen, weil es mir so vom Dozenten als Design-Patterns gezeigt wurde ;)
let point_A = null
let point_B = null
let point_C = null
var distance_tracker_c = 0
var alpha_fix = 0
//Event zum Setzen der Punkte des Dreiecks
function pointclick(xy){
    //Prüfung und löschen/neuzeichnen des Canvasgitters falls schon alle Punkte gesetzt wurden
    if (point_A && point_B && point_C){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        for(let i = 0; i < canvas1.width; i+=100){
            ctx.strokeStyle = "black"
            ctx.moveTo(i,0)
            ctx.lineTo(i,1200)
            //Text
            ctx.font = "10px arial"
            ctx.fillText(i, i, 700 - 3)
            //Linien waagerecht
            ctx.moveTo(0,i)
            ctx.lineTo(1200,i)
        
            ctx.fillText((700-i), 0, i - 3)
            ctx.stroke()
            //ctx.strokeText((600-i)/10, 0, i)
        }
    }
    x = xy.offsetX;
    y = xy.offsetY;
    //Instanzieren und Zeichnen der Objekte der Klasse sowie die Linienverbindungen zeichnen
    if (!point_A){
        point_A = new Point(x, y, "A")
        point_A.draw_point(ctx)
    }
    else if (!point_B){
        point_B = new Point(x,y, "B")
        point_B.draw_point(ctx)
        point_A.draw_line(point_B, ctx)
    }
    else if(!point_C){
        point_C = new Point(x, y, "C")
        point_C.draw_point(ctx)
        point_B.draw_line(point_C, ctx)
        point_C.draw_line(point_A, ctx)
        //Rundung der Seitenlängen auf zwei Nachkommastellen und Typecasting
        let side_c = (point_A.distance(point_B)).toFixed(2)
        let side_a = (point_B.distance(point_C)).toFixed(2)
        let side_b = (point_A.distance(point_C)).toFixed(2)
        let a = Number.parseFloat(side_a)
        let b = Number.parseFloat(side_b)
        let c = Number.parseFloat(side_c)
        let U = a + b + c
        let u = U.toFixed(2)
        //Formeln für Umfang
        let text = `Der Umfang des Dreiecks beträgt: ${u}`
        let formula_U = "Formel (Umfang): U = a + b + c"
        let cal = `Rechenweg: ${u} = ${side_a} + ${side_b} + ${side_c}`
        debugger
        //Beschriftung der Seitenlienien berechnen und im Canvas1 hinzufügen
        ctx.beginPath()
        ctx.fillText("a", point_B.x_co - ((point_B.x_co - point_C.x_co)/2) + 8, point_B.y_co - ((point_B.y_co - point_C.y_co)/2) + 8)
        ctx.fillText("b", point_A.x_co - ((point_A.x_co - point_C.x_co)/2) + 8, point_A.y_co - ((point_A.y_co - point_C.y_co)/2) + 8)
        ctx.fillText("c", point_A.x_co - ((point_A.x_co - point_B.x_co)/2) + 8, point_A.y_co - ((point_A.y_co - point_B.y_co)/2) + 8)
        //Beschriftung in Canvas2 hinzufügen
        ctx2.beginPath()
        ctx2.clearRect(0,0, canvas2.width, canvas2.height)
        ctx2.font="15px Arial"
        ctx2.fillText("Länge der Seitenlienien: ", 10, 15)
        ctx2.fillText("a = "+ a, 10, 30)
        ctx2.fillText("b = "+b, 10, 45)
        ctx2.fillText("c = "+c, 10, 60)
        ctx2.fillText(text, 10, 75)
        ctx2.fillText(formula_U, 10, 90)
        ctx2.fillText(cal, 10, 105)
        //Formeln für Flächenberechnung
        let s = u/2
        let value = Math.sqrt(s*(s-a)*(s-b)*(s-c))
        let A = value.toFixed(2)
        let text2 = `Die Fläche beträgt: ${A}`
        let formula_A = `Formel (Fläche): s = U/2; A = √(s*(s-a)*(s-b)*(s-c))`
        let cal2 =`Rechenweg: ${s} = ${u} / ${2} ;`
        let cal3 = `${A} = √ (${s}*(${s} - ${a})*(${s} - ${b})*(${s} - ${b})) `
        let text3 = `Die Winkel werden berechnet:`
        //Berechnungsschritte alpha für die Ausgabe
        let formula_alpha = `α = acos((b²+c²-a²) / (2*b*c)) * (180/π)`
        let cal_4_1 = (b**2 + c**2 - a**2).toFixed(6)
        let cal_4_2 = (2*b*c).toFixed(6)
        let cal_4_3 = (180/Math.PI).toFixed(6)
        let cal_4_4 = (cal_4_1/cal_4_2).toFixed(6)
        let cal4 = `α = acos(${cal_4_1} / ${cal_4_2}) * ${cal_4_3}`
        let cal_4_5 = `α = acos(${cal_4_4}) * ${cal_4_3}`
        let cal_4_6 = (Math.acos(cal_4_4) * cal_4_3).toFixed(2)
        //Berechnungsschritte beta für die Ausgabe
        let formula_beta = `β = acos((a²+c²-b²) / (2*a*c)) * (180/π)`
        let cal_5_1 = (a**2 + c**2 - b**2).toFixed(6)
        let cal_5_2 = (2*a*c).toFixed(6)
        let cal_5_3 = (cal_5_1/cal_5_2).toFixed(6)
        let cal_5 = `β = acos(${cal_5_1} / ${cal_5_2}) * ${cal_4_3}`
        let cal_5_4 = `β = acos(${cal_5_3}) * ${cal_4_3}`
        let cal_5_5 = (Math.acos(cal_5_3) * cal_4_3).toFixed(2)
        //Berechnungsschritte gamma für die Ausgabe
        let formula_gamma = `γ = acos((a²+b²-c²) / (2*a*b)) * (180/π) oder γ = 180 - α - β`
        let formula_gamma_2 = `γ = 180 - α - β`
        let formula_gamma_3 = `γ = 180 - ${cal_4_6} - ${cal_5_5}`
        //let gamma = (180 - cal_4_6 - cal_5_5).toFixed(2)
        // let cal_6_1 = (a**2 + b**2 - c**2).toFixed(6)
        // let cal_6_2 = (2*a*b).toFixed(6)
        // let cal_6_3 = (cal_6_1/cal_6_2).toFixed(6)
        // let cal_6 = `γ = acos(${cal_6_1} / ${cal_6_2}) * ${cal_4_3}`
        // let cal_6_4 = `γ = acos(${cal_6_3}) * ${cal_4_3}`
        // let cal_6_5 = (Math.cos(cal_6_3) * cal_4_3).toFixed(2)
        //Beschriftung in Canvas2 hinzufügen
        ctx2.fillText(text2, 10, 130)
        ctx2.fillText(formula_A, 10, 145)
        ctx2.fillText(cal2, 10, 160)
        ctx2.fillText(cal3, 10, 175)
        ctx2.fillText(text3, 10, 200)
        ctx2.fillText(formula_alpha, 10, 215)
        ctx2.fillText(cal4, 10, 230)
        ctx2.fillText(cal_4_5, 10, 245)
        ctx2.fillText(`α = `+ cal_4_6 + `°`, 10, 260)
        ctx2.fillText(formula_beta,10, 280)
        ctx2.fillText(cal_5, 10, 295)
        ctx2.fillText(cal_5_4, 10, 310)
        ctx2.fillText(`β = `+ cal_5_5 + `°`, 10, 325)
        ctx2.fillText(formula_gamma, 10, 345)
        ctx2.fillText(formula_gamma_2, 10, 360)
        ctx2.fillText(formula_gamma_3, 10, 375)
        ctx2.fillText(`γ = `+ gamma_fix + `°`, 10, 390)
    }
    else{
        //Setzt die Variablen wieder auf null wenn schon drei Punkte vorhanden sind und geklickt wurde
        point_A = null
        point_B = null
        point_C = null
    }
}
function position_tracker(track){
    //Ermittelt die aktuellen Positionen und errechnet die mögliche Seitenlänge, sowie die passenden Winkel
    //Zeigt das Ergebnis im Infofeld an
    position_x = track.offsetX;
    position_y = track.offsetY;
    reverse = 700 - position_y
    document.getElementById("info").innerHTML = `Deine Position: x = ${position_x}  |  y = ${reverse}`
    //Prüft Punkt A
    if (point_A && !point_B){
        let delta_Bx_to_Ax = point_A.x_co - position_x
        let delta_By_to_Ay = point_A.y_co - position_y
        distance_tracker_c = Math.sqrt(delta_Bx_to_Ax**2 + delta_By_to_Ay**2).toFixed(2)
        document.getElementById("distancetracker").innerHTML = `Abstand: A Δ B = Seitenlänge c: ${distance_tracker_c}`
    }
    //Prüft Punkt A und B
    else if (point_A && point_B && !point_C){
        let delta_Bx_to_Cx = point_B.x_co - position_x
        let delta_By_to_Cy = point_B.y_co - position_y
        let distance_tracker_2 = Math.sqrt(delta_Bx_to_Cx**2 + delta_By_to_Cy**2).toFixed(2)

        let delta_Ax_to_Cx = point_A.x_co - position_x
        let delta_Ay_to_Cy = point_A.y_co - position_y
        let distance_tracker_3 = Math.sqrt(delta_Ax_to_Cx**2 + delta_Ay_to_Cy**2).toFixed(2)
        
        let a = Number.parseFloat(distance_tracker_2)
        let b = Number.parseFloat(distance_tracker_3)
        let c = Number.parseFloat(distance_tracker_c)
        let scope = a + b + c
        let scope_fix = scope.toFixed(2)

        //Winkelberechnung
        //Formeln für: 
        //alpha = arcos(b²+c²-a²/2ab)
        //beta  = arcos(a²+c²-b²/2ac)
        //gamma = arcos(a²+b²-c²/2ab)
        
        alpha = Math.acos((b**2 + c**2 - a**2)/(2*b*c))*180/Math.PI
        beta = Math.acos((a**2 + c**2 - b**2)/(2*a*c))*180/Math.PI
        gamma = Math.acos((a**2 + b**2 - c**2)/(2*a*b))*180/Math.PI

        alpha_fix = alpha.toFixed(2)
        beta_fix = beta.toFixed(2)
        gamma_fix = gamma.toFixed(2)

        document.getElementById("tracker2").innerHTML = `Abstand: B Δ C = Seitenlänge a: ${distance_tracker_2}`
        document.getElementById("tracker3").innerHTML = `Abstand: A Δ C = Seitenlänge b: ${distance_tracker_3}`
        document.getElementById("scope").innerHTML = `Umfang: ${scope_fix}`
        document.getElementById("alpha").innerHTML = `Winkel alpha (α): ${alpha_fix} °`
        document.getElementById("beta").innerHTML = `Winkel beta (β): ${beta_fix} °`
        document.getElementById("gamma").innerHTML = `Winkel gamma (γ): ${gamma_fix} °`
    }
}
let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")
//zweires Canvas
let canvas2 = document.getElementById("canvas2")
let ctx2 = canvas2.getContext("2d")
//Eventlistener dem Canvas hinzufügen
canvas.addEventListener("click", pointclick)
canvas.addEventListener("mousemove", position_tracker)
//Linien und Text für das Koordinatensystem
for(let i = 0; i < canvas1.width; i+=100){
    ctx.moveTo(i,0)
    ctx.lineTo(i,1200)
    //Text
    ctx.font = "14px arial"
    ctx.fillStyle="rgb(61, 94, 241)"
    ctx.fillText(i, i, 700 - 3)
    //Linien waagerecht
    ctx.moveTo(0,i)
    ctx.lineTo(1200,i)
    //Text
    ctx.fillText((700-i), 0, i - 3)
    ctx.stroke()
}
