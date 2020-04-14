function CoolGraphics(parameters) {
    // this.sigma = parameters.sigma;
        // paper.settings.handleSize = 0;
      // paper.settings.hitTolerance = 4;
      // Create a Paper.js Path to draw a line into it:
    //   var path = new Path();
    //   // Give the stroke a color
    //   path.strokeColor = 'black';
    //   var start = new Point(100, 100);
    //   // // Move to start and draw a line from there
    //   path.moveTo(start);
    //   // // Note that the plus operator on Point objects does not work
    //   // // in JavaScript. Instead, we need to call the add() function:
    //   path.lineTo(start.add([ 200, -50 ]));
    //   // // Draw the view now:
    //   paper.view.draw();
      
      var points = 20;

      // The distance between the points:
          var length = 3;
           var path = new paper.Path({
            strokeColor: '#E4141B',
            strokeWidth: 20,
            strokeCap: 'round'
          });
              
      
          var start = new paper.Point(100,100);
          for (var i = 0; i < points; i++){
            path.add(start + new paper.Point(i * length, 0));
          }
          var tool;
          tool =new paper.Tool();
          tool.onMouseMove = function(event) {
            path.firstSegment.point = event.point;
            for (var i = 0; i < points - 1; i++) {
              var segment = path.segments[i];
              var nextSegment = segment.next;
              var vector = segment.point - nextSegment.point ;
              vector.length = length;
              nextSegment.point = segment.point - vector;
            }
            // path.smooth({ type: 'asymmetric' });
          }
}


export {CoolGraphics};