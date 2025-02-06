//zweiter Anlauf, nachdem mir der erste Ansatz der Klassenkonstruktion nicht gefallen hatte
//aber auch dieses Script läuft nicht richtig. Die Punkte verhalten sich bei Änderungen nicht wie gewünscht
class Point {
    constructor (point_x, point_y, point_name, side_a, side_b, side_c){
        this.point_x = point_x
        this.point_y = point_y
        this.point_name = point_name
        this.side_a = side_a
        this.side_b = side_b
        this.side_c = side_c
    }
    point3x_calculate (){
        let cx = (this.side_a**2 + this.side_c**2 - this.side_b**2)/(2*this.side_c)
        return this.point_x = cx
    }
    point3y_calculate (){
        let square_calc = ((this.side_a**2 + this.side_b**2 - this.side_c**2)/(2*this.side_a))**2
        let cy = Math.sqrt(this.side_b**2-square_calc)
        return this.point_y = cy
    }
}

Point.prototype.draw = function(){
    ctx.beginPath()
    //ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.font="12px Arial"
    ctx.fillText(this.point_name, this.point_x + 10, this.point_y + 10)
    //ctx.strokeText(this.name_pt1, this.pt1x + 10, this.pt1y + 10)
    //ctx.fillText(this.name_pt2, this.pt2x + 10, this.pt2y + 10)
    //ctx.strokeText(this.name_pt2, this.pt2x + 10, this.pt2y + 10)
    //ctx.fillText(this.name_pt3, this.pt3x + 10, this.pt3y + 10)
    //ctx.strokeText(this.name_pt3, this.pt3x + 10, this.pt3y + 10)
    ctx.lineWidth=1
    ctx.fillStyle="#000000"
    ctx.arc(this.point_x, this.point_y, 6, 0, 2*Math.PI)
    // ctx.arc(this.pt2x, this.pt2y, 6, 0, 2*Math.PI)
    // ctx.arc(this.pt3x, this.pt3y, 6, 0, 2*Math.PI)
    ctx.fill()
}

let object_array = []

function calculate(){
    //Typecasting und Eingabeprüfung
    let a_side = document.getElementById("input1").value//eigentlich steite gegenüber von punkt a also strecke b->c
    let b_side = document.getElementById("input2").value//eigentlich a->c
    let c_side = document.getElementById("input3").value// eigentlich a->b
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
        let user_point_A = new Point(0, 0, "A", a, b, c)
        let user_point_B = new Point(0 + c, 0, "B", a, b, c)
        let user_point_C = new Point(0, 0, "C", a, b, c)
        //console.log(user_point_C.point3x_calculate())
        object_array.push(user_point_A, user_point_B, user_point_C)
        console.log(object_array)

        console.log(user_point_C.point3x_calculate(), user_point_C.point3y_calculate())
        console.log(object_array)
        //Canvas sauber machen, bevor neue Punkte einziehen
        ctx.clearRect(0,0, canvas.width, canvas.height)
        user_point_A.draw(ctx)
        user_point_B.draw(ctx)
        user_point_C.draw(ctx)
    }
}

let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")

let canvas2 = document.getElementById("canvas2")
let ctx2 = canvas2.getContext("2d")
