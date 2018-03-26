!function() {
  'use strict'
    
  const app = {
    canvas: null,
    dist: 10,
    angle: Math.PI / 6,
    turtle: null,
    axiom: 'F',
    times: 5,
    maxTimes: 5,
    functions: null,
    rulesForm: null,
    button: null,

    rules: {
        'F': '[F+F+F]-F-F-F'
    },
      
    init() {
        app.bind
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.turtle = new Turtle(this.canvas, this.canvas.width / 2, this.canvas.height / 2);
        
        
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
        
        this.rulesForm = document.getElementById('rulesField');
        this.button = document.getElementById('updateButton');
        this.slider = document.getElementById('repeats');
        this.select = document.getElementById('preset');
        
        this.button.addEventListener('click', function(){
            if(app.rulesForm.value != ''){
            app.rules['F'] = app.rulesForm.value;
            app.runTurtle();
        }
        });
        this.slider.addEventListener('change', this.updateTimes);
        this.select.addEventListener('change', this.updateRules);
        
        /*
        this.canvas.addEventListener('mousemove', function(){

        });
        */

        this.runTurtle();
    },
      
    updateRules() {
        app.rules['F'] = app.select.value;
        app.rulesForm.value = app.select.value;
        app.runTurtle();
    },
      
    updateTimes() {
        app.times = app.slider.value;
        app.runTurtle();
    },
      
    runTurtle() {
        app.turtle.reset();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
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
      
    map(oldMin, oldMax, newMin, newMax, scaledValue){
        return newMin + ( newMax - newMin) * ((scaledValue - oldMin) / (oldMax - oldMin));
    },
};    
    
 window.onload = app.init.bind( app )
}()