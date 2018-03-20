!function() {
  'use strict'
    
  const app = {
    canvas: null,
    dist: 10,
    angle: Math.PI / 6,
    turtle: null,
    axiom: 'F',
    times: 5,
    functions: null,

    rules: {
        'F': 'FF[++F][+F][F][-F][--F]'
    },

    init() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.turtle = new Turtle(this.canvas, this.canvas.width / 2, (this.canvas.height * 5) / 6);
        
        
        this.functions = {
            "F": function() { 
                app.turtle.penDown();
                app.turtle.move(app.dist);
                app.turtle.penUp();
                },
            "f": function(){app.turtle.move(app.dist);},
            "-": function(){app.turtle.rotate(app.angle);},
            "+": function(){app.turtle.rotate(-(app.angle));},
            "[": function(){app.turtle.push();},
            "]": function(){app.turtle.pop();},
        };

        this.runTurtle();
    },

    runTurtle() {
        var commands = this.axiom;
        for(var i=0; i<this.times; i++){
            var newLine = '';
            for(var c of commands){
                if(this.rules[c]){
                    newLine += this.rules[c];        
                }
                else{
                    newLine += c;
                }
            }
            commands = newLine;
        }
        
        for(var char of commands){
            this.functions[char]();
        }

    },
};
    
 window.onload = app.init.bind( app )
}()