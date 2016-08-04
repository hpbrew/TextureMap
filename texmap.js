/**
 * CS435
 * Project#5
 * Hampton Brewer
 * 04-01-2016
 * Description: This project is a webgl program that uses a 
 * 3D room. In the center of the room the user can watch a show.
 * The show is played on a T.V. The program is fully functional.
 * Using the buttons you can play/pause, turn off/on, or change the
 * frames of the T.V. 
 */


//Initializing global vars for buffers and all
var canvas;
var gl;
var cBuffer;
var vColor;
var vBuffer;
var vPosition;
var tBuffer;
var vTexCoord;
var numVertices  = 36;
var texSize = 64;
var program;
var texture;
//Stored variables for each object position
//FLOOR 
var pointsArray = [];
var colorsArray = [];
var texCoordsArray = [];
//LEFT WALL
var pointsArray2 = [];
var colorsArray2 = [];
var texCoordsArray2 = [];
//RIGHT WALL
var pointsArray3 = [];
var colorsArray3 = [];
var texCoordsArray3 = [];
//BACK WALL
var pointsArray4 = [];
var colorsArray4 = [];
var texCoordsArray4 = [];
//TABLE
var pointsArray5 = [];
var colorsArray5 = [];
var texCoordsArray5 = [];
//TV
var pointsArray6 = [];
var colorsArray6 = [];
var texCoordsArray6 = [];

//TV variables
//changes the channel of the TV
var tvChannel = 0;
var tvOn = false;
var tvString = 'tv';
var tvPaused = false;
var countSeconds = 0;


var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

//FLOOR
var vertices = [
    vec4( -.50, 0.0,  0.5, 1.0 ),
    vec4( -.50,  0.25,  0.5, 1.0 ),
    vec4( 1,  0.25,  0.5, 1.0 ),
    vec4( 1, 0.0,  0.5, 1.0 ),
    vec4( -1, -0.75, -0.5, 1.0 ),
    vec4( -1,  -0.5, -0.5, 1.0 ),
    vec4( 0.75,  -0.5, -0.5, 1.0 ),
    vec4( 0.75, -0.75, -0.5, 1.0 )
];
//LEFT WALL
var vertices2 = [
     vec4( -.5, .25,  0.5, 1.0 ), //back bottom left
     vec4( -.5,  1.25,  0.5, 1.0 ), //back top left
     vec4( -0.3,  1.25,  0.5, 1.0 ), //bacj bottom right
     vec4( -0.3, .25,  0.5, 1.0 ), //back top right
     vec4( -1, -0.5, -0.5, 1.0 ), //front bottom left 1
     vec4( -1,  0.5, -0.5, 1.0 ), //front top left1
     vec4( -0.8,  0.5, -0.5, 1.0 ), //front top right.8
     vec4( -0.8, -0.5, -0.5, 1.0 ) //front bottom right.8
 ];
//RIGHT WALL
var vertices3 = [
     vec4( .8, .25,  0.5, 1.0 ), //back bottom left
     vec4( .8,  1.25,  0.5, 1.0 ), //back top left
     vec4( 1,  1.25,  0.5, 1.0 ), //bacj bottom right
     vec4( 1, .25,  0.5, 1.0 ), //back top right
     vec4( .55, -0.5, -0.7, 1.0 ), //front bottom left 1
     vec4( .55,  0.5, -0.7, 1.0 ), //front top left1
     vec4( .75,  0.5, -0.7, 1.0 ), //front top right.8
     vec4( .75, -0.5, -0.7, 1.0 ) //front bottom right.8
 ];
//BACK WALL
var vertices4 = [
     vec4( -.3, .25,  0.5, 1.0 ), //back bottom left
     vec4( -.3,  1.25,  0.5, 1.0 ), //back top left
     vec4( .71,  1.25,  0.5, 1.0 ), //bacj bottom right
     vec4( .8, .25,  0.5, 1.0 ), //back top right
     vec4( -.35, .17, -0.5, 1.0 ), //front bottom left 1
     vec4( -.43,  1, .2, 1.0 ), //front top left1
     vec4( .73,  1, .2, 1.0 ), //front top right.8
     vec4( .72, .15, -0.5, 1.0 ) //front bottom right.8
];
//TABLE
var vertices5 = [
	  vec4( -0.2, 0.0,  -0.5, 1.0 ),//back bottom left
	  vec4( -.1,  .2,  -.5, 1.0 ),//back top left
	  vec4( 0.5,  0.2,  -0.5, 1.0 ),//back bottom right
	  vec4( 0.5, -.1,  -0.5, 1.0 ),//back top right
	  vec4( -0.4, -0.5, -0.6, 1.0 ),//front bottom left 1
	  vec4( -0.4,  -0.2, -0.6, 1.0 ),//front top left1
	  vec4( 0.3,  -0.2, -0.6, 1.0 ),//front top right
	  vec4( 0.3, -0.5, -0.6, 1.0 )//front bottom right
];
//TV
var vertices6 = [
      vec4( -0.2, -0.1,  -0.61, 1.0 ),
      vec4( -0.2,  0.45, - 0.61, 1.0 ),
      vec4( 0.33,  0.45,  -0.61, 1.0 ),
      vec4( 0.33, 0.00,  -0.61, 1.0 ),
      vec4( -0.25, -0.1, -0.8, 1.0 ),
      vec4( -0.25,  0.4, -0.8, 1.0 ),
      vec4( 0.3,  0.4, -0.8, 1.0 ),
      vec4( 0.3, -0.1, -0.8, 1.0 )
];
var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];  

function configureTexture( image ) {
    texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, 
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}


function quadFLOOR(a, b, c, d,e) {
	 //FLOOR
     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[e]); 
     texCoordsArray.push(texCoord[0]);

     pointsArray.push(vertices[b]); 
     colorsArray.push(vertexColors[e]);
     texCoordsArray.push(texCoord[1]); 

     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[e]);
     texCoordsArray.push(texCoord[2]); 
   
     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[e]);
     texCoordsArray.push(texCoord[0]); 

     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[e]);
     texCoordsArray.push(texCoord[2]); 

     pointsArray.push(vertices[d]); 
     colorsArray.push(vertexColors[e]);
     texCoordsArray.push(texCoord[3]);
     
}

function quadLEFTWALL(a,b,c,d,e){
    //LEFT WALL 
    pointsArray2.push(vertices2[a]); 
    colorsArray2.push(vertexColors[e]); 
    texCoordsArray2.push(texCoord[0]);

    pointsArray2.push(vertices2[b]); 
    colorsArray2.push(vertexColors[e]);
    texCoordsArray2.push(texCoord[1]); 

    pointsArray2.push(vertices2[c]); 
    colorsArray2.push(vertexColors[e]);
    texCoordsArray2.push(texCoord[2]); 
  
    pointsArray2.push(vertices2[a]); 
    colorsArray2.push(vertexColors[e]);
    texCoordsArray2.push(texCoord[0]); 

    pointsArray2.push(vertices2[c]); 
    colorsArray2.push(vertexColors[e]);
    texCoordsArray2.push(texCoord[2]); 

    pointsArray2.push(vertices2[d]); 
    colorsArray2.push(vertexColors[e]);
    texCoordsArray2.push(texCoord[3]);   
}

function quadRIGHTWALL(a,b,c,d,e){
    //RIGHT WALL
    pointsArray3.push(vertices3[a]); 
    colorsArray3.push(vertexColors[e]); 
    texCoordsArray3.push(texCoord[0]);

    pointsArray3.push(vertices3[b]); 
    colorsArray3.push(vertexColors[e]);
    texCoordsArray3.push(texCoord[1]); 

    pointsArray3.push(vertices3[c]); 
    colorsArray3.push(vertexColors[e]);
    texCoordsArray3.push(texCoord[2]); 
  
    pointsArray3.push(vertices3[a]); 
    colorsArray3.push(vertexColors[e]);
    texCoordsArray3.push(texCoord[0]); 

    pointsArray3.push(vertices3[c]); 
    colorsArray3.push(vertexColors[e]);
    texCoordsArray3.push(texCoord[2]); 

    pointsArray3.push(vertices3[d]); 
    colorsArray3.push(vertexColors[e]);
    texCoordsArray3.push(texCoord[3]);
}
function quadBACKWALL(a,b,c,d,e){
    //BACK WALL
    pointsArray4.push(vertices4[a]); 
    colorsArray4.push(vertexColors[e]); 
    texCoordsArray4.push(texCoord[0]);

    pointsArray4.push(vertices4[b]); 
    colorsArray4.push(vertexColors[e]);
    texCoordsArray4.push(texCoord[1]); 

    pointsArray4.push(vertices4[c]); 
    colorsArray4.push(vertexColors[e]);
    texCoordsArray4.push(texCoord[2]); 
  
    pointsArray4.push(vertices4[a]); 
    colorsArray4.push(vertexColors[e]);
    texCoordsArray4.push(texCoord[0]); 

    pointsArray4.push(vertices4[c]); 
    colorsArray4.push(vertexColors[e]);
    texCoordsArray4.push(texCoord[2]); 

    pointsArray4.push(vertices4[d]); 
    colorsArray4.push(vertexColors[e]);
    texCoordsArray4.push(texCoord[3]);	
}

function quadTABLE(a,b,c,d,e){
    
    //TABLE
    pointsArray5.push(vertices5[a]); 
    colorsArray5.push(vertexColors[e]); 
    texCoordsArray5.push(texCoord[0]);

    pointsArray5.push(vertices5[b]); 
    colorsArray5.push(vertexColors[e]);
    texCoordsArray5.push(texCoord[1]); 

    pointsArray5.push(vertices5[c]); 
    colorsArray5.push(vertexColors[e]);
    texCoordsArray5.push(texCoord[2]); 
  
    pointsArray5.push(vertices5[a]); 
    colorsArray5.push(vertexColors[e]);
    texCoordsArray5.push(texCoord[0]); 

    pointsArray5.push(vertices5[c]); 
    colorsArray5.push(vertexColors[e]);
    texCoordsArray5.push(texCoord[2]); 

    pointsArray5.push(vertices5[d]); 
    colorsArray5.push(vertexColors[e]);
    texCoordsArray5.push(texCoord[3]);	
}
function quadTV(a,b,c,d,e){
    //TV
    pointsArray6.push(vertices6[a]); 
    colorsArray6.push(vertexColors[e]); 
    texCoordsArray6.push(texCoord[0]);

    pointsArray6.push(vertices6[b]); 
    colorsArray6.push(vertexColors[e]);
    texCoordsArray6.push(texCoord[1]); 

    pointsArray6.push(vertices6[c]); 
    colorsArray6.push(vertexColors[e]);
    texCoordsArray6.push(texCoord[2]); 
  
    pointsArray6.push(vertices6[a]); 
    colorsArray6.push(vertexColors[e]);
    texCoordsArray6.push(texCoord[0]); 

    pointsArray6.push(vertices6[c]); 
    colorsArray6.push(vertexColors[e]);
    texCoordsArray6.push(texCoord[2]); 

    pointsArray6.push(vertices6[d]); 
    colorsArray6.push(vertexColors[e]);
    texCoordsArray6.push(texCoord[3]);	
}
function colorCube()
{
	quadFLOOR( 1, 0, 3, 2 ,0);
	quadFLOOR( 2, 3, 7, 6 ,0);
	quadFLOOR( 3, 0, 4, 7 ,0);
	quadFLOOR( 6, 5, 1, 2 ,6);
	quadFLOOR( 4, 5, 6, 7 ,0);
	quadFLOOR( 5, 4, 0, 1 ,0);
    
    quadLEFTWALL( 1, 0, 3, 2 ,0);
    quadLEFTWALL( 2, 3, 7, 6 ,2);
    quadLEFTWALL( 3, 0, 4, 7 ,0);
    quadLEFTWALL( 6, 5, 1, 2 ,0);
    quadLEFTWALL( 4, 5, 6, 7 ,0);
    quadLEFTWALL( 5, 4, 0, 1 ,0);
    
    quadRIGHTWALL( 1, 0, 3, 2 ,0);
    quadRIGHTWALL( 2, 3, 7, 6 ,0);
    quadRIGHTWALL( 3, 0, 4, 7 ,2);
    quadRIGHTWALL( 6, 5, 1, 2 ,0);
    quadRIGHTWALL( 4, 5, 6, 7 ,0);
    quadRIGHTWALL( 5, 4, 0, 1 ,0);
    
    quadBACKWALL( 1, 0, 3, 2 ,0);
    quadBACKWALL( 2, 3, 7, 6 ,0);
    quadBACKWALL( 3, 0, 4, 7 ,0);
    quadBACKWALL( 6, 5, 1, 2 ,0);
    quadBACKWALL( 4, 5, 6, 7 ,2);
    quadBACKWALL( 5, 4, 0, 1 ,0);
    
    quadTABLE( 1, 0, 3, 2 ,2);
    quadTABLE( 2, 3, 7, 6 ,2);
    quadTABLE( 3, 0, 4, 7 ,2);
    quadTABLE( 6, 5, 1, 2 ,2);
    quadTABLE( 4, 5, 6, 7 ,2);
    quadTABLE( 5, 4, 0, 1 ,2);
    
    quadTV( 1, 0, 3, 2 ,0);
    quadTV( 2, 3, 7, 6 ,0);
    quadTV( 3, 0, 4, 7 ,0);
    quadTV( 6, 5, 1, 2 ,0);
    quadTV( 4, 5, 6, 7 ,2);
    quadTV( 5, 4, 0, 1 ,0);
}


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    colorCube();

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    
    vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

    //does a function when buttons pressed
    document.getElementById("btnOnOff").onclick = function(){tvOn = !tvOn;};
    document.getElementById("btnPauseResume").onclick = function(){ 
    	if(tvOn){
    		tvPaused = !tvPaused;
    		}
    	};
    document.getElementById("btnPrev").onclick = function(){
    	if(tvChannel > -1 && tvOn && tvPaused){
    		tvChannel--; 
    		}
    	if(tvChannel <= -1){
    		tvChannel = 51;
    	}
    	};
    document.getElementById("btnNext").onclick = function(){ 
    	if(tvChannel < 52 && tvOn && tvPaused){
    		tvChannel++; 
    		}
    	if(tvChannel >= 52 && tvOn){
    		tvChannel = 0;
    	}
    	};
  
    render();
 
}

function render(){
	
    //DRAW FLOOR
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    var image = document.getElementById("texImage");
    configureTexture( image );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );

    //DRAW LEFT WALL
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray2), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray2), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray2), gl.STATIC_DRAW );
    var image = document.getElementById("brickImage");    
    configureTexture( image );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    
    //DRAW BACK WALL
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray4), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray4), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray4), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
      
    //DRAW RIGHT WALL
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray3), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray3), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray3), gl.STATIC_DRAW );   
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    
    //TABLE
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray5), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray5), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray5), gl.STATIC_DRAW );  
    var image = document.getElementById("woodImage");    
    configureTexture( image );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    
    //TV
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray6), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray6), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray6), gl.STATIC_DRAW );   
    
    if(tvOn == false){ //if tv is not on just show off screen
    	var image = document.getElementById("tvOff");    
        configureTexture( image );
    }
    else{ //if tv is on
    	if(tvPaused){ //for a paused tv no auto update
    		//gets the current channel display
    		var currentChan = tvString.concat(tvChannel.toString()); 
    	    var image = document.getElementById(currentChan);    
    	        configureTexture( image );
    	}
    	else{ //tv not paused so continue to flip through channels
    		if(countSeconds > 5){
	    		if(tvChannel < 52 && tvOn){
	        		tvChannel++; 
	        	}
	    		else{
	    			tvChannel = 0;
	    		}
	    		//gets the current channel display
	    	    var currentChan = tvString.concat(tvChannel.toString()); 
	    	    var image = document.getElementById(currentChan);    
	    	    configureTexture( image );
	    	    countSeconds = 0;
	    	        
    		}
    		else{
    			countSeconds++;
    		}
    		//show old image if time hasn't allowed for new one yet
    		var currentChan = tvString.concat(tvChannel.toString()); 
    	    var image = document.getElementById(currentChan);    
    	    configureTexture( image );
    	}
    }
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );

    requestAnimFrame(render);
}
