import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit, OnDestroy {

  @ViewChild('waveCanvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  private width = window.innerWidth;
  private height = window.innerHeight;

  private animationFrameId = 0;

  private step = 0;

  /* =========================================================
     SIMPLE CUSTOM CURSOR
     ========================================================= */

  private cursor!: HTMLDivElement;

  private cursorX = 0;
  private cursorY = 0;

  private cursorTargetX = 0;
  private cursorTargetY = 0;

  private cursorAnimationId = 0;

  private cursorEnabled = false;

  ngAfterViewInit(): void {

    this.initCanvas();

    this.startAnimation();

    this.initCursor();

  }

  /* =========================================================
     WINDOW RESIZE
     ========================================================= */

  @HostListener('window:resize')
  onResize(): void {

    if (!this.canvasRef) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = this.width;
    canvas.height = this.height;

  }

  /* =========================================================
     MOUSE MOVE
     ========================================================= */

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {

    if (!this.cursorEnabled || !this.cursor) {
      return;
    }

    this.cursorTargetX = event.clientX;
    this.cursorTargetY = event.clientY;

    this.updateCursorState(event.target);

  }

  /* =========================================================
     CANVAS
     ========================================================= */

  private initCanvas(): void {

    const canvas = this.canvasRef.nativeElement;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = this.width;
    canvas.height = this.height;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    this.ctx = context;

    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

  }

  /* =========================================================
     WAVE ANIMATION
     ========================================================= */

  private startAnimation = (): void => {

    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );

    this.drawWave(
      0.0019,
      62,
      0.38,
      'rgba(0, 245, 212, 0.62)',
      2.4,
      0.45
    );

    this.drawWave(
      0.0028,
      48,
      0.68,
      'rgba(0, 220, 195, 0.42)',
      2.0,
      0.48
    );

    this.drawWave(
      0.00135,
      82,
      0.22,
      'rgba(74, 144, 226, 0.38)',
      2.1,
      0.42
    );

    this.drawWave(
      0.0037,
      30,
      0.95,
      'rgba(0, 245, 212, 0.28)',
      1.4,
      0.51
    );

    this.drawWave(
      0.0009,
      105,
      0.16,
      'rgba(42, 58, 94, 0.55)',
      2.2,
      0.39
    );

    this.drawWave(
      0.0011,
      125,
      0.11,
      'rgba(0, 245, 212, 0.16)',
      1.2,
      0.54
    );

    this.step += 0.018;

    this.animationFrameId =
      requestAnimationFrame(this.startAnimation);

  };

  /* =========================================================
     DRAW WAVE
     ========================================================= */

  private drawWave(
    frequency: number,
    amplitude: number,
    speedMultiplier: number,
    color: string,
    lineWidth: number,
    verticalPosition: number
  ): void {

    if (!this.ctx) {
      return;
    }

    this.ctx.beginPath();

    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;

    if (color.includes('0, 245, 212')) {

      this.ctx.shadowColor =
        'rgba(0, 245, 212, 0.35)';

      this.ctx.shadowBlur = 12;

    } else {

      this.ctx.shadowBlur = 0;

    }

    const stepSize =
      this.width > 1200 ? 7 : 10;

    for (
      let x = 0;
      x <= this.width;
      x += stepSize
    ) {

      const primaryWave =
        Math.sin(
          x * frequency +
          this.step * speedMultiplier
        ) * amplitude;

      const secondaryWave =
        Math.cos(
          x * 0.0011 +
          this.step * 0.48
        ) * 34;

      const tertiaryWave =
        Math.sin(
          x * 0.00055 +
          this.step * 0.23
        ) * 18;

      const y =
        primaryWave +
        secondaryWave +
        tertiaryWave +
        this.height * verticalPosition;

      if (x === 0) {

        this.ctx.moveTo(x, y);

      } else {

        this.ctx.lineTo(x, y);

      }

    }

    this.ctx.stroke();

    this.ctx.shadowBlur = 0;

  }

  /* =========================================================
     INITIALIZE CURSOR
     ========================================================= */

  private initCursor(): void {

    /*
     * Do not enable on touch devices.
     */

    if (
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    this.cursorEnabled = true;

    this.cursor =
      document.createElement('div');

    this.cursor.className =
      'corpassion-cursor';

    document.body.appendChild(
      this.cursor
    );

    this.cursorX =
      window.innerWidth / 2;

    this.cursorY =
      window.innerHeight / 2;

    this.cursorTargetX =
      this.cursorX;

    this.cursorTargetY =
      this.cursorY;

    this.startCursorAnimation();

  }

  /* =========================================================
     CURSOR STATE
     ========================================================= */

  private updateCursorState(
    target: EventTarget | null
  ): void {

    if (!this.cursor) {
      return;
    }

    if (!(target instanceof Element)) {

      this.cursor.dataset ['state'] =
        'default';

      return;

    }

    const element =
      target.closest(
        'button, a, [role="button"], input, textarea, select, video, .service-card, .pricing-card, .dashboard-card, .industry-card, .premium-card'
      );

    if (!element) {

      this.cursor.dataset ['state'] =
        'default';

      return;

    }

    if (
      element.matches(
        'button, [role="button"]'
      )
    ) {

      this.cursor.dataset ['state'] =
        'button';

      return;

    }

    if (element.matches('video')) {

      this.cursor.dataset ['state'] =
        'video';

      return;

    }

    if (
      element.matches(
        '.service-card, .pricing-card, .dashboard-card, .industry-card, .premium-card'
      )
    ) {

      this.cursor.dataset ['state'] =
        'card';

      return;

    }

    if (
      element.matches(
        'input, textarea, select'
      )
    ) {

      this.cursor.dataset ['state'] =
        'input';

      return;

    }

    if (element.matches('a')) {

      this.cursor.dataset ['state'] =
        'link';

      return;

    }

    this.cursor.dataset ['state'] =
      'default';

  }

  /* =========================================================
     CURSOR SMOOTH MOVEMENT
     ========================================================= */

  private startCursorAnimation = (): void => {

    if (!this.cursor) {
      return;
    }

    this.cursorX +=
      (
        this.cursorTargetX -
        this.cursorX
      ) * 0.18;

    this.cursorY +=
      (
        this.cursorTargetY -
        this.cursorY
      ) * 0.18;

    this.cursor.style.transform =
      `translate3d(${this.cursorX}px, ${this.cursorY}px, 0) translate(-50%, -50%)`;

    this.cursorAnimationId =
      requestAnimationFrame(
        this.startCursorAnimation
      );

  };

  /* =========================================================
     CLEANUP
     ========================================================= */

  ngOnDestroy(): void {

    if (this.animationFrameId) {

      cancelAnimationFrame(
        this.animationFrameId
      );

    }

    if (this.cursorAnimationId) {

      cancelAnimationFrame(
        this.cursorAnimationId
      );

    }

    if (this.cursor) {

      this.cursor.remove();

    }

  }

}