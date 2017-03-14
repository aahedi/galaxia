var img,sliderThr,button,canvas,val=0,copy,images=[],cnt=0,x=0,ratio,xcor,ycor;
function preload(){
    for(var i = 1;i<=6;i++){
        images[i-1]=loadImage('images/'+i+'.jpg');
    }
}

function setup(){
    var uploadBtn = createFileInput(imageUpload);
    var container = createDiv('');
    var saveBtn=createButton('Save');
    saveBtn.id('save');
    saveBtn.mousePressed(saveImage);
    container.id('container');
    sliderThr=createSlider(0.2,0.7,0.5,0.01);
    effectB=createDiv('');
    effectB.class('effects');
    displaySize();
    canvas.id('canvas');
    container.child(canvas);
    container.child(effectB);
    sliderThr.class('slider');
    uploadBtn.class('upload');
    sliderThr.input(effect);
}
function draw(){
}
function imageUpload(file){
    xcor=0,ycor=0;
    img = loadImage(file.data,function(){
        if(file.type == 'image'){
            //tint(255, 220); 
            clear();
            ratio = img.width/img.height;
            newW = width;
            newH=newW/ratio;
            if(newH>height){
                newH=height;
                newW=newW*ratio;
            }
            if(width>newW){
                xcor = (width-newW)/2;
            }
            if(height>newH){
                ycor = (height-newH)/2;
            }
            cnt++;
            effect();
        }
        else{
            alert('Upload an image file.');
        }
        if(cnt<=1){
            showeffects();
        }
    })
}
function effect(){
    clear();
    copy = img;
    img.filter(GRAY,0.8);
    //img.filter(THRESHOLD,sliderThr.value());
    image(copy,xcor,ycor,newW,newH);
    filter(THRESHOLD,sliderThr.value());
    blend(images[x], 0, 0,images[x].width,images[x].height, xcor,ycor,newW,newH, SCREEN);
}
function showeffects(){
    for(var i = 1;i <= 6;i++){
        var im = createImg('images/'+i+'.jpg');
        im.id(i-1);
        im.class('images');
        im.size(100,70);
        effectB.child(im);
        im.mouseClicked(function(){
            x = this.id();
            effect();
        })
    }
}

function displaySize(){
  if(window.innerWidth<=500 ){
      canvas = createCanvas(window.innerWidth-5,window.innerHeight-200);
  }
    else{
        canvas = createCanvas(550,500);
    }
}

function saveImage(){
    save();
}
