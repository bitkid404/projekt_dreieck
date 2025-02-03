class Triangle {
    constructor(side_a, side_b, side_c, pt1x, pt1y, name_pt1){
        this.pt1x = pt1x
        this.pt1y = pt1y
        this.name_pt1 = name_pt1
        // this.pt3 = pt3
        this.side_a = side_a
        this.side_b = side_b
        this.side_c = side_c
        // this.umfang = umfang
        // this.flaeche = flaeche
    }
}

Triangle.prototype.draw = function(ctx){
    ctx.beginPath()
    ctx.font="30px Arial"
    ctx.fillText(this.name, this.x + 15, this.y + 15)
    ctx.strokeText(this.name, this.x + 15, this.y + 15)
    ctx.lineWidth=1
    ctx.fillStyle="#000000"
    ctx.arc(this.x, this.y, 16, 0, 2*Math.PI)
    ctx.fill()

}

let object_array = []

function calculate(){
    debugger
    //Typecasting und Eingabeprüfung
    let a_side = document.getElementById("input1").value
    let b_side = document.getElementById("input2").value
    let c_side = document.getElementById("input3").value
    let a = Number.parseFloat(a_side)
    let b = Number.parseFloat(b_side)
    let c = Number.parseFloat(c_side)
    if (!a || !b || !c){
        //Ausgabe Hinweis
        document.getElementById("info").innerHTML = `Bitte alle Seitenlängen in Zentimeter eingeben!`
    }
    else {
        //Berechnung und Ausgabe des Ergebnisses
        let u = a + b + c
        document.getElementById("info").innerHTML = `Der Umfang des Dreiecks beträgt: ${u} cm`
        //Hinzufügen eines neuen Objekts in ein Array
        object_array.push(new Triangle(a, b, c, 20, 480, "P1"))
        console.log(object_array)
    }   
};

let canvas = document.getElementById("dreieckcanvas")
let ctx = canvas.getContext("2d")

