window.generate_png = function(speaker_name, callback){
    let container = document.getElementById("svg_container");
    container.insertAdjacentHTML("afterbegin", certificate_template(speaker_name));

    // https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f
    let svgElement = document.getElementById("certi_svg");
    let width = 792;
    let height = 562;

    let clonedSvgElement = svgElement.cloneNode(true);

    let outerHTML = clonedSvgElement.outerHTML,
    blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});

    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);

    let image = new Image();
    image.src = blobURL;
    image.onload = () => {
    
        let canvas = document.createElement('canvas');
        
        canvas.width = width;
        
        canvas.height = height;
        let context = canvas.getContext('2d');
        // draw image in canvas starting left-0 , top - 0  
        context.drawImage(image, 0, 0, width, height );
        //  downloadImage(canvas); need to implement

        callback(canvas.toDataURL());
    };
}