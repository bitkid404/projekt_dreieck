'Zum Nachschlagen wurden verschiedene Seiten aufgerufen, wie z.B. w3schools.com, selfhtml.org, mozilla.org, studienkreis.de'

class Triangle {
    constructor(side_a, side_b, side_c, pt1x, pt1y, name_pt1, pt2x, pt2y, name_pt2, pt3x, pt3y, name_pt3){
        this.pt1x = pt1x
        this.pt1y = pt1y
        this.name_pt1 = name_pt1
        this.pt2x = pt2x
        this.pt2y = pt2y
        this.name_pt2 = name_pt2
        this.pt3x = pt3x
        this.pt3y = pt3y
        this.name_pt3 = name_pt3
        this.side_a = side_a
        this.side_b = side_b
        this.side_c = side_c
        // this.umfang = umfang
        // this.flaeche = flaeche
    }
    point3x_calculate (){
        let cx = (this.side_a**2 + this.side_c**2 - this.side_b**2)/(2*this.side_c)
        return this.pt3x = cx
    }
    point3y_calculate (){
        let square_calc = ((this.side_a**2 + this.side_b**2 - this.side_c**2)/(2*this.side_a))**2
        let cy = Math.sqrt(this.side_b**2-square_calc)
        return this.pt3y = cy
    }
}

//Funktion zum Zeichnen der Punkte und Beschriftung
Triangle.prototype.draw = function(ctx){
    ctx.beginPath()
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.font="12px Arial"
    ctx.fillText(this.name_pt1, this.pt1x + 10, this.pt1y + 10)
    //ctx.strokeText(this.name_pt1, this.pt1x + 10, this.pt1y + 10)
    ctx.fillText(this.name_pt2, this.pt2x + 10, this.pt2y + 10)
    //ctx.strokeText(this.name_pt2, this.pt2x + 10, this.pt2y + 10)
    ctx.fillText(this.name_pt3, this.pt3x + 10, this.pt3y + 10)
    //ctx.strokeText(this.name_pt3, this.pt3x + 10, this.pt3y + 10)
    ctx.lineWidth=1
    ctx.fillStyle="#000000"
    ctx.arc(this.pt1x, this.pt1y, 6, 0, 2*Math.PI)
    ctx.arc(this.pt2x, this.pt2y, 6, 0, 2*Math.PI)
    ctx.arc(this.pt3x, this.pt3y, 6, 0, 2*Math.PI)
    ctx.fill()

}

let object_array = []

function calculate(){
    //Typecasting und Eingabeprüfung
    let a_side = document.getElementById("input1").value
    let b_side = document.getElementById("input2").value
    let c_side = document.getElementById("input3").value
    let a = Number.parseFloat(a_side)
    let b = Number.parseFloat(b_side)
    let c = Number.parseFloat(c_side)
    if (!a || !b || !c){
        //Ausgabe Hinweis
        document.getElementById("info").innerHTML = `Bitte alle Seitenlängen eingeben!`
    }
    else {
        //Berechnung und Ausgabe des Ergebnisses
        let u = a + b + c
        debugger
        document.getElementById("info").innerHTML = `Der Umfang des Dreiecks beträgt: ${u}`
        let text = `Der Umfang des Dreiecks beträgt: ${u}`
        let formel = "Formel (Umfang): U = a + b + c"
        let cal = `Rechenweg: ${u} = ${a} + ${b} + ${c}`
        ctx2.beginPath()
        ctx2.clearRect(0,0, canvas2.width, canvas2.height)
        ctx2.font="15px Arial"
        ctx2.fillText(text, 10, 25)
        ctx2.strokeText(text, 10, 25)
        ctx2.fillText(formel, 10, 50)
        ctx2.strokeText(formel, 10, 50)
        ctx2.fillText(cal, 10, 75)
        ctx2.strokeText(cal, 10, 75)
        let User_Triangle = new Triangle(a, b, c, 20, 480, "P1", 20 + c, 480, "P2", 0, 0, "P3")
        //Hinzufügen eines neuen Objekts in ein Array sowie die Berechnung der Koordinaten x/y des dritten Punktes
        console.log(User_Triangle.point3x_calculate(), User_Triangle.point3y_calculate())
        object_array.push(User_Triangle)
        console.log(object_array)
        //console.log(User_Triangle.point3x_calculate(), User_Triangle.point3y_calculate())
        User_Triangle.draw(ctx)
    }   
};

let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")

let canvas2 = document.getElementById("canvas2")
let ctx2 = canvas2.getContext("2d")

//TestPush

