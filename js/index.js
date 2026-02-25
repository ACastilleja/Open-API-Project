//Footer element
var footerElement = document.createElement('footer');
document.body.appendChild(footerElement);

// Copyright Text in Footer variables
var today = new Date();
var thisYear = today.getFullYear();
var footer = document.querySelector('footer');
var copyright = document.createElement('p');

//Adding variables to p element of copyright
copyright.innerHTML = ` Arturo Castilleja ${thisYear} &copy;`;

//adding class to footer for css styling
footer.classList.add('footer');

//appending copyright to footer and to html body
footer.appendChild(copyright);
document.body.appendChild(footer);

// Weather API
