let letters = (() => {
    const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
    return caps.concat(caps.map(letter => letter.toLowerCase()));
})();



function shuffleArray(array) {
    const arrays = array.map((x) => x);
    // console.log(arrays);
    const newArray = [];
    const times = arrays.length;
    for (let i = 0; i < times; i++) {
        let random = Math.floor(Math.random() * arrays.length);
        // console.log(random);
        let temp = arrays.splice(random, 1);
        newArray.push(temp);
    }
    // console.log("new: " + newArray);
    return newArray;
}

function createOrbitE(element, num, content) {
    const degree = 360 / (num);
    const rad = degree * (Math.PI / 180)

    for (let i = 0; i < num; i++) {
        let orbitElement = document.createElement("input");
        let orbitLabel = document.createElement("label");
        orbitElement.setAttribute("type", "checkbox");

        orbitElement.classList.add("ansButton");
        orbitLabel.classList.add("ansLabel");

        orbitLabel.innerText = content[i];
        orbitElement.id = content[i];

        orbitLabel.setAttribute("for", content[i]);

        element.appendChild(orbitElement);
        element.appendChild(orbitLabel);

        // orbitLabel.style.transition = "transform 3s";
        // orbitElement.style.transition = "transform 3s";

        orbitElement.style.transform = `translateY(${-26 * Math.cos(rad * (i))}em) translateX(${Math.sin(rad * (i)) * 26}em) rotate(${degree * i}deg)`
        orbitLabel.style.transform = `translateY(${-22 * Math.cos(rad * (i))}rem) translateX(${Math.sin(rad * (i)) * 22}rem) rotate(${degree * i}deg)`
    }
}