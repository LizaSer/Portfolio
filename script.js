class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const currentIndexWord = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentIndexWord];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.txtElement.innerHTML = `<span class=txt>${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt == fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 1000;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const textTypeEl = document.getElementById("text-type");
  const words = JSON.parse(textTypeEl.getAttribute("data-words"));
  const wait = textTypeEl.getAttribute("data-wait");
  new TypeWriter(textTypeEl, words, wait);
}
