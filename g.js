/************************* visualization and output ****************************

	written for binpacking display
	
*******************************************************************************/


function textLevels(bin){
	var s="";
	for(var i in bin.levels){
		s+="--------------------------------------------------------\n";
		var l = bin.levels[i];
		s+="Level "+i+" contents:\n";
		for(var j in l.rects){
			var r=l.rects[j];
			s+="["+r.w+","+r.h+"]\t";
		}
		s+="\n";
	}
	return s;
}


function initCanvas(){

	var c=document.createElement("canvas");
	c.width=500;
	c.height=800;
	c.style.position="absolute";
	c.style.top=0;
	c.style.left=16;
	document.body.appendChild(c);
	
	return c.getContext('2d'); 
}

function initTextbox(){
	var c=document.createElement("pre");
	c.style.position="absolute";
	c.style.top=0;
	c.style.left=332;
	c.style.fontSize="12px"
	c.style.color="#661";
	document.body.appendChild(c);
	
	return c; 
}

function drawBin(bin,gfx){
	var maxHeight=800;
	
	var x=0;
	var y=0;
	
	gfx.fillStyle="rgb(255,64,0)";
	gfx.lineWidth="2";
	
	// top edge of the bin
	gfx.beginPath();
	gfx.moveTo(0,0);
	gfx.lineTo(bin.w,0);
	gfx.stroke();
	
	// left edge of the bin
	gfx.beginPath();
	gfx.moveTo(0,0);
	gfx.lineTo(0,maxHeight);
	gfx.stroke();
	
	// right edge of the bin
	gfx.beginPath();
	gfx.moveTo(bin.w,0);
	gfx.lineTo(bin.w,maxHeight);
	gfx.stroke();
	
	for(var i in bin.levels){
		var l = bin.levels[i];
		x=0;
		for(var j in l.rects){
			var r = l.rects[j];
			gfx.fillStyle="rgb(128,64,0)";
			gfx.fillRect(x,y,r.w,r.h);
			gfx.fillStyle="rgb(255,"+(120*(parseInt(j)%2))+",0)";
			gfx.fillRect(x+1,y+1,r.w-2,r.h-2);
			x+=r.w;
		}
		y+=l.h;
		// draw the bottom of the next level
		gfx.beginPath();
		gfx.moveTo(0,y);
		gfx.lineTo(bin.w-1,y);
		gfx.stroke();
	}
		
}

