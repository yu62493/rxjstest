import { Component, OnInit } from '@angular/core';
import { from, Observable, fromEvent } from 'rxjs';
import { map, takeUntil, concatAll } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.pickTest();
  }


  mouseTest(){

    const dragDOM = document.getElementById('drag');
    const mouseMove = fromEvent(dragDOM, 'mousemove') ;

    mouseMove.subscribe((e : MouseEvent) => {
      console.log(e.clientX);
    });
  }

  pickTest() {
    const dragDOM = document.getElementById('drag');
    const body = document.body;
    const ShowDOM = document.getElementById('show_postion');

    const mouseDown = fromEvent(dragDOM, 'mousedown');
    const mouseUp = fromEvent(body, 'mouseup');
    const mouseMove = fromEvent(body, 'mousemove');

    // const TT = mouseDown.pipe(map(event => mouseMove.pipe(takeUntil(mouseUp))));

    // const TT2 = TT.pipe(concatAll());


    // TT2.pipe(map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY }))).subscribe(pos => {
    //          dragDOM.style.left = pos.x + 'px';
    //          dragDOM.style.top = pos.y + 'px';
    //          console.log(dragDOM.style.left, dragDOM.style.top);
    // });

    // tslint:disable-next-line:max-line-length
    mouseDown.pipe(map(event => mouseMove.pipe(takeUntil(mouseUp)))).pipe(concatAll())
            .pipe(map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })))
            .subscribe(pos => {
             dragDOM.style.left = pos.x + 'px';
             dragDOM.style.top = pos.y + 'px';
             ShowDOM.innerText = 'x :' + dragDOM.style.left + ' y :' + dragDOM.style.top ;
    });

    // mouseDown
    //     .map(event => mouseMove.takeUntil(mouseUp))
    //   .concatAll()
    //   .map(event => ({ x: event.clientX, y: event.clientY }))
    //   .subscribe(pos => {
    //       dragDOM.style.left = pos.x + 'px';
    //     dragDOM.style.top = pos.y + 'px';
    //   })

  }
}
