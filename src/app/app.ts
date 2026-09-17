import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';

import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  @ViewChild('bgVideo')
  bgVideo?: ElementRef<HTMLVideoElement>;


  /*
   * 10–15 IMAGES
   *
   * Put your images inside:
   * public/images/marquee/
   *
   * Names:
   * 01.jpg
   * 02.jpg
   * 03.jpg
   * ...
   * 15.jpg
   */
  marqueeImages = [
    '/images/marquee/01.jpg',
    '/images/marquee/02.jpg',
    '/images/marquee/03.jpg',
    '/images/marquee/04.jpg',
    '/images/marquee/05.jpg',
    '/images/marquee/06.jpg',
    '/images/marquee/07.jpg',
    '/images/marquee/08.jpg',
    '/images/marquee/09.jpg',
    '/images/marquee/10.jpg',
    '/images/marquee/11.jpg',
    '/images/marquee/12.jpg',
    '/images/marquee/13.jpg',
    '/images/marquee/14.jpg',
    '/images/marquee/15.jpg'
  ];


  items = [

    {
      key: 'web',
      number: '01',
      kicker: 'SYSTEM 01',
      title: 'WEB DEVELOPMENT',
      line1: 'CUSTOM WEBSITES & E-COMMERCE',
      line2: 'FAST, HIGH-PERFORMANCE BUILDS',
      body:
        'We design and build fast, secure websites and online stores that convert visitors into clients. From landing pages to full e-commerce platforms, every build is clean, mobile-ready, scalable and engineered for real business traffic.',
      features: [
        'Landing Pages',
        'E-Commerce',
        'Business Websites',
        'Web Applications'
      ],
      tone: 'tone-teal'
    },

    {
      key: 'design',
      number: '02',
      kicker: 'SYSTEM 02',
      title: 'DESIGN SERVICES',
      line1: 'UI/UX & BRAND IDENTITY',
      line2: 'MOTION GRAPHICS & ANIMATION',
      body:
        'We shape brands that look sharp and feel clear. UI/UX, identity systems, visual direction and motion graphics work together so your product becomes easier to use, easier to remember and ready for every digital platform.',
      features: [
        'UI / UX',
        'Brand Identity',
        'Motion Graphics',
        'Visual Systems'
      ],
      tone: 'tone-aqua'
    },

    {
      key: 'erp',
      number: '03',
      kicker: 'SYSTEM 03',
      title: 'CUSTOM ERP',
      line1: 'ENTERPRISE RESOURCE PLANNING',
      line2: 'UAE VAT / WPS READY SYSTEMS',
      body:
        'Custom ERP systems built around the way your company actually works. Finance, inventory, HR, operations and reporting can stay connected inside one structured business platform.',
      features: [
        'Finance',
        'Inventory',
        'HR',
        'Operations'
      ],
      tone: 'tone-mint'
    },

    {
      key: 'warm',
      number: '04',
      kicker: 'SYSTEM 04',
      title: 'WARM MARKETING',
      line1: 'SOCIAL MEDIA & COMMUNITY',
      line2: 'PAID ADS & BRAND DEVELOPMENT',
      body:
        'We turn existing attention into measurable business opportunities. Content, community and paid advertising across Instagram, TikTok and Facebook stay connected to your brand and commercial goals.',
      features: [
        'Social Media',
        'Paid Advertising',
        'Content',
        'Brand Growth'
      ],
      tone: 'tone-cyan'
    },

    {
      key: 'app',
      number: '05',
      kicker: 'SYSTEM 05',
      title: 'APP DEVELOPMENT',
      line1: 'NATIVE iOS & ANDROID',
      line2: 'CROSS-PLATFORM FLUTTER DEVELOPMENT',
      body:
        'Native iOS and Android applications, plus Flutter when one codebase should cover both platforms. We build stable products with clean UX, secure APIs and scalable architecture.',
      features: [
        'iOS',
        'Android',
        'Flutter',
        'API Integration'
      ],
      tone: 'tone-sea'
    },

    {
      key: 'ai',
      number: '06',
      kicker: 'SYSTEM 06',
      title: 'AI AGENTS',
      line1: 'VOICE AI AGENTS',
      line2: 'MULTI-AGENT AUTOMATION SYSTEMS',
      body:
        'Intelligent agents that can answer, qualify, automate and complete tasks. AI systems connect with business tools and workflows while keeping interactions natural and operationally useful.',
      features: [
        'Voice AI',
        'Automation',
        'Multi-Agent',
        'AI Workflows'
      ],
      tone: 'tone-fresh'
    },

    {
      key: 'crm',
      number: '07',
      kicker: 'SYSTEM 07',
      title: 'CUSTOM CRM',
      line1: 'WHATSAPP INTEGRATION',
      line2: 'AI-POWERED CUSTOMER MANAGEMENT',
      body:
        'A CRM built around your actual sales flow. Leads, WhatsApp conversations, follow-ups, customer notes and team activity stay connected so opportunities are easier to manage and harder to miss.',
      features: [
        'WhatsApp',
        'Lead Management',
        'AI Assistance',
        'Sales Pipeline'
      ],
      tone: 'tone-ocean'
    },

    {
      key: 'cold',
      number: '08',
      kicker: 'SYSTEM 08',
      title: 'COLD MARKETING',
      line1: 'B2B EMAIL MARKETING',
      line2: 'LINKEDIN OUTREACH & COLD CALLING',
      body:
        'Structured B2B outreach designed to open new conversations. Email campaigns, LinkedIn outreach and calling can work together to identify relevant accounts and create qualified business opportunities.',
      features: [
        'B2B Email',
        'LinkedIn',
        'Cold Calling',
        'Lead Generation'
      ],
      tone: 'tone-turquoise'
    }

  ];


  activeKey = 'web';
  cardOpen = true;

  hideTimer: ReturnType<typeof setTimeout> | null = null;


  get activeItem() {
    return this.items.find(
      (item) => item.key === this.activeKey
    );
  }


  ngAfterViewInit(): void {

    const video = this.bgVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;

    const playVideo = () => {
      const promise = video.play();

      if (promise && promise.catch) {
        promise.catch(() => {});
      }
    };

    playVideo();

    video.addEventListener('pause', playVideo);

    video.addEventListener('ended', () => {
      video.currentTime = 0.05;
      playVideo();
    });

    document.addEventListener(
      'visibilitychange',
      () => {
        if (!document.hidden) {
          playVideo();
        }
      }
    );

  }


  @HostListener(
    'document:click',
    ['$event']
  )
  onDocumentClick(event: MouseEvent): void {

    const target =
      event.target as HTMLElement;

    if (
      target.closest('.service-button') ||
      target.closest('.service-card')
    ) {
      return;
    }

    this.cardOpen = false;

  }


  openCard(key: string): void {

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.activeKey = key;
    this.cardOpen = true;

  }


  keepOpen(): void {

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

  }


  scheduleClose(): void {

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.hideTimer = setTimeout(() => {
      this.cardOpen = false;
    }, 180);

  }

}