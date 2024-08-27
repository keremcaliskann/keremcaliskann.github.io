// Check browser support
if (typeof(Storage) !== "undefined") {
    // Store
    let visitorCount = parseInt( localStorage.getItem("visitorCount"))+1;

    localStorage.setItem("visitorCount", visitorCount);
    // Retrieve
    document.getElementById("visitorCounter").innerText = "Visitor Count : " + visitorCount;
  } else {
    document.getElementById("visitorCounter").textContent = "Sorry, your browser does not support Web Storage...";
  }

function populateContent(item) {

    const li = document.createElement('li');
    li.className = 'project-item  active';

    const a = document.createElement('a');
    a.href=item.link;
    a.target = '_blank';
    
    const figure = document.createElement('figure');
    figure.className='project-img';
    
    const div = document.createElement('div');
    div.className='project-item-icon-box';
    
    const ionIcon = document.createElement('ion-icon');
    ionIcon.name='eye-outline';
    
    const img = document.createElement('img');
    img.src= 'icons/'+item.title+'.png';
    img.loading='lazy';
    
    const h3 = document.createElement('h3');
    h3.className='project-title';
    h3.textContent=item.title;

    li.appendChild(a);

    a.appendChild(figure);
    a.appendChild(h3);

    figure.appendChild(div);
    figure.appendChild(img);

    div.appendChild(ionIcon);

    const ul = document.getElementById('item');
    ul.appendChild(li);
}

function load(){
    data.forEach(item=>{
        populateContent(item);
    });
}

window.onload = load;