// Extract Course Module Content
/*
Copy the below script.
Open up developer tools on your browser.
Paste the code in the console area and press enter.
Paste the content into a .html file and save it, then open with your favorite browser.
It'll console.log() html that'll display your modules in a list with collapsable elements.
Any external links are copied and any internal links are ignored (since an external person won't have access to them anyway).
Optionally, you can attempt to print the page as a PDF for easier sharing.
*/

const exportModules = () => {
    //find the Canvas Modules that contain the content list
    let eles = document.querySelectorAll(".context_module");
    //console.log("eles count: ", eles.length);
    let html = "";
    for (let el of eles) {
        // grabs only the links
        let links = el.querySelectorAll(".module-item-title a");
        //console.log(el);
        html += `<h5>${el.ariaLabel}</h5>`;
        html += "<ol>";
        for (let link of links) {
            //only retrieve published items
            if (link.closest(".ig-row").classList.contains("ig-published")) {
                console.log(link.title, link.href);
                html += `<li>${link.title} - `;
                //ignore canvas links
                if (link.href.includes("instructure.com")) {
                    html += "[internal canvas assignent]";
                } else { //generate a link for external items
                    html += `<a href="${link.href}">link<a>`;
                }
                html += "</li>";
            }
        }
        html += "</ol><br>";
        // console.log(el.querySelectorAll(".module-item-title a"));
    }

    console.log(html);//<-- this will be copyable (Chrome had a nice link/button to click to copy it) 
};
exportModules();
