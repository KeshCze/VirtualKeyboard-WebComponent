const template = document.createElement('template')
template.innerHTML = `
  <style>
    #mydiv {
      position: absolute;
      z-index: 9;
      background-color: #f1f1f1;
      border: 1px solid #d3d3d3;
      text-align: center;
      }
  
      #mydivheader {
      padding: 10px;
      cursor: move;
      z-index: 10;
      background-color: #2196F3;
      color: #fff;
      }
  </style>
    <div id="mydiv">
      <div id="mydivheader">Click here to move</div>     
      <table>
        <tr>
          <td data-item="1">1</td>
          <td data-item="2">2</td>
          <td data-item="3">3</td>
        </tr>
        <tr>
          <td data-item="4">4</td>
          <td data-item="5">5</td>
          <td data-item="6">6</td>
        </tr>
        <tr>
          <td data-item="7">7</td>
          <td data-item="8">8</td>
          <td data-item="9">9</td>
        </tr>
      </table>
    
  </div>
`;

class siemensNumKeyboard extends HTMLElement {
  // =====================================
  // Sets up dollar sign selector function
  // =====================================
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelectorAll(selector)
  }

  constructor() {
    super()
    // =============================================
    // Attaches the HTML content to the Shadows DOM
    // =============================================
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    // ======================
    // Adds event to buttons
    // ======================
    this.$('td').forEach(function (item) {
      item.addEventListener('click', function () {
        console.log(this.dataset.item);
      });
    });

    this.dragElement(this.shadowRoot.querySelector('#mydiv'));
  }

  // shine(event) {
  //     //this.$('span').animate(keyframes, options)
  //     // this.dispatchEvent(new CustomEvent("clicked", {
  //     //   detail: 2
  //     // }));
  //     console.log(this);
  // }

  // ===========================
  // W3C method to drag elements
  // ===========================
  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

window.customElements.define('siemens-num-keyboard', siemensNumKeyboard);