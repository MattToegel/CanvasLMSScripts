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

//find the module element assuming you named it "Module #" otherwise edit the label accordingly or adjust the selector
let eles = document.querySelectorAll(".context_module[aria-label*='Module '");
let html = "";
for (let el of eles) {
    //use the label as the summary
    html += `<details open> <summary>${el.ariaLabel}</summary>`;
    //generate ordered list
    html += `<ol>`;
    //find the active links
    let links = el.querySelectorAll(".module-item-title a");
    for (let link of links) {
        //capture only publish links (if you want all, remove this if condition)
        if (link.closest(".ig-row").classList.contains("ig-published")) {

            html += `<li>${link.title} - `;
            //ignore canvas links
            if (link.href.includes("instructure.com")) {
                html += "[internal canvas assignent]";
            }
            else {//generate a link for external items
                html += `<a href="${link.href}">link<a>`;
            }
            html += "</li>";
        }
    }
    html += "</ol></details>";
}
console.log(html);//<-- this will be copyable (Chrome had a nice link/button to click to copy it) 
