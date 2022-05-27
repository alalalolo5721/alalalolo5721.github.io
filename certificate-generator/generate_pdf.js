
window.generate_pdf = function(speaker_name, callback){

    //https://jsfiddle.net/klesun/zg4qbwd8/42/
    const doc = new window.PDFDocument({
        size: [777, 552],
        // size: [100, 100],
        margins : { // by default, all are 72
            top: 0, 
            bottom: 0,
            left: 0,
            right: 0
        },
        // layout: 'landscape', // can be 'landscape'
    });
    const chunks = [];
    function loadFont(font_url, font_name, callb){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', font_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function (e) {
        if (this.status == 200) {
            doc.registerFont(font_name, xhr.response);
            callb();
        }
        };

        xhr.send();
    }
    loadFont('resources/Gotham-Black.ttf', 'Gotham-Black', () => {
        loadFont('resources/Gotham-Medium.ttf', 'Gotham-Medium', () => {
            loadFont('resources/Gotham-Book.ttf', 'Gotham-Book', () => {
                loadFont('resources/MTCORSVA.TTF', 'MonotypeCorsiva', () => {
                    // doc.registerFont('Gotham-Black', 'resources/Gotham-Black.ttf', 'Gotham-Black');
                    // doc.registerFont('Gotham-Medium', 'resources/Gotham-Medium.ttf', 'Gotham-Medium');
                    // doc.registerFont('Gotham-Book', 'resources/Gotham-Book.ttf', 'Gotham-Book');
                    // doc.registerFont('MonotypeCorsiva', 'resources/MTCORSVA.TTF', 'MonotypeCorsiva');
                    const stream = doc.pipe({
                        // writable stream implementation
                        write: (chunk) => chunks.push(chunk),
                        end: () => {
                        const pdfBlob = new Blob(chunks, {
                            type: 'application/octet-stream'
                        });
                            var blobUrl = URL.createObjectURL(pdfBlob);
                            // let a = document.createElement("a");
                            // a.setAttribute("href", blobUrl);
                            // a.setAttribute("download", "certificate.pdf")
                            
                            // let clickEvent = new Event("click");
                            // a.dispatchEvent(clickEvent);
                            // window.open(blobUrl);
                            callback(blobUrl);
                            
                        },
                        // readable streaaam stub iplementation
                        on: (event, action) => {},
                        once: (...args) => {},
                        emit: (...args) => {},
                    });
                    window.SVGtoPDF(doc, certificate_template(speaker_name), 0, 0, {
                        // width: 883.2, 
                        // height:552,
                        fontCallback:function(family, bold, italic, fontOptions) {
                            // console.log(`'${family}'`)
                            family = family.replace(/\'/g, "");
                            // let font = "Times-Roman";
                            // switch(family){
                            //     case "Gotham-Black":
                            //         font = "resources/Gotham-Black.ttf"
                            //         console.log("black")
                            //         break;
                            //     case "Gotham-Medium":
                            //         font = "resources/Gotham-Medium.ttf"
                            //         console.log("Medium")
                            //         break;
                            //     case "Gotham-Book":
                            //         font = "resources/Gotham-Book.ttf"
                            //         console.log("Book")
                            //         break;
                            //     case "MonotypeCorsiva":
                            //         font = "resources/MonotypeCorsiva.ttf"
                            //         console.log("MonotypeCorsiva")
                            //         break;
                            //     default:
                            //         break;
                            // }

                            return family;
                        }
                    });

                    doc.end();
                })
            })
        })
    })

    
}