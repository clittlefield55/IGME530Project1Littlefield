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
    animIndex: 0,
    animating: false,
    commands: '',
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
        this.animButton = document.getElementById('animButton');
        this.slider = document.getElementById('repeats');
        this.select = document.getElementById('preset');
        
        this.button.addEventListener('click', function(){
            if(app.animating){
                app.animating = false;
                app.animIndex = 0;
                app.turtle.reset();
            }
            if(app.rulesForm.value != ''){
                app.rules['F'] = app.rulesForm.value;
                app.runTurtle();
            }
        });
        this.animButton.addEventListener('click', function(){
            app.animating = true;
            requestAnimationFrame(app.animateTurtle);
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
        if(app.animating){
            app.animating = false;
            app.animIndex = 0;
            app.turtle.reset();
        }
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
        this.commands = this.axiom;
        for(var i=0; i<this.times; i++){
            var newLine = '';
            for(var c of this.commands){
                if(this.rules[c]){
                    newLine += this.rules[c];        
                }
                else{
                    newLine += c;
                }
            }
            this.commands = newLine;
        }
        
        for(var char of this.commands){
            this.functions[char]();
        }

    },
      
    animateTurtle() {
        if(app.animating){
            if(app.animIndex == 0){
              app.ctx.fillStyle = 'black';
              app.ctx.fillRect(0,0,app.canvas.width,app.canvas.height);
            }
            if(app.animIndex < app.commands.length){
              requestAnimationFrame(app.animateTurtle);  
            }
              app.functions[app.commands[app.animIndex]]();
              app.animIndex++;   

            if(app.animIndex == app.commands.length - 1){
                app.animIndex = 0;
                app.animating = false;
            }
        }
    },
      
    map(oldMin, oldMax, newMin, newMax, scaledValue){
        return newMin + ( newMax - newMin) * ((scaledValue - oldMin) / (oldMax - oldMin));
    },
};    
    
 window.onload = app.init.bind( app )
}()