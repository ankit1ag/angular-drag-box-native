import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  fillelem: any;

  constructor(private elem: ElementRef) {}
  dragStart(ev) {
    ev.target.className += " hold";
    setTimeout(() => {
      ev.target.className += " invisible";
    }, 0);
  }

  dragEnd(ev) {
    ev.target.className = "fill";
  }
  dragOver(e) {
    e.preventDefault();
  }
  dragEnter(e) {
    //e.preventDefault();
    e.target.className += " hovered";
  }

  dragLeave(e) {
    e.target.className = "empty";
  }
  dragDrop(e) {
    e.target.className = "empty";
    console.log(this.fillelem);
    e.target.append(this.fillelem);
    //console.log("drop");
  }

  ngOnInit() {
    let elements = this.elem.nativeElement.querySelectorAll(".empty");
    this.fillelem = this.elem.nativeElement.querySelector(".fill");
    console.log(this.fillelem);

    //this.fillelem.draggable({containment: "parent"});

    for (const elems of elements) {
      elems.addEventListener("dragover", this.dragOver);
      elems.addEventListener("dragenter", this.dragEnter);
      elems.addEventListener("dragleave", this.dragLeave);
      elems.addEventListener("drop", this.dragDrop.bind(this));
    }
  }
}
