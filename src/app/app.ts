import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo?: ElementRef<HTMLVideoElement>;
  @ViewChild('waterVideo') waterVideo?: ElementRef<HTMLVideoElement>;

  items = [
    {
      key: 'web',
      kicker: 'SYSTEM 01',
      title: 'WEB DEVELOPMENT',
      line1: 'CUSTOM WEBSITES & E-COMMERCE',
      line2: 'FAST, HIGH-PERFORMANCE BUILDS',
      body: 'We design and build fast, secure websites and online stores that convert visitors into clients. From landing pages to full e-commerce, every build is clean, mobile-ready, and made to perform under real business traffic.',
      tone: 'tone-orange'
    },
    {
      key: 'design',
      kicker: 'SYSTEM 02',
      title: 'DESIGN SERVICES',
      line1: 'UI/UX & BRAND IDENTITY',
      line2: 'MOTION GRAPHICS ANIMATION',
      body: 'We shape brands that look sharp and feel clear. UI/UX, identity systems, and motion graphics work together so your product is easy to use, easy to remember, and ready for web, app, and campaign screens.',
      tone: 'tone-yellow'
    },
    {
      key: 'erp',
      kicker: 'SYSTEM 03',
      title: 'CUSTOM ERP',
      line1: 'ENTERPRISE RESOURCE PLANNING',
      line2: 'FULL UAE VAT/WPS COMPLIANCE',
      body: 'Custom ERP built around how your company actually works. Finance, stock, HR, and operations stay in one system, with UAE VAT and WPS rules handled correctly so reporting stays clean and audits stay simple.',
      tone: 'tone-purple'
    },
    {
      key: 'warm',
      kicker: 'SYSTEM 04',
      title: 'WARM MARKETING',
      line1: 'SMM ACROSS INSTAGRAM, TIKTOK, FACEBOOK',
      line2: 'PAID ADS MANAGEMENT & BRAND DEVELOPMENT',
      body: 'We grow audiences that already know your name. Content, community, and paid ads on Instagram, TikTok, and Facebook stay on-brand, so warm leads keep moving toward enquiry, booking, and repeat business.',
      tone: 'tone-pink'
    },
    {
      key: 'app',
      kicker: 'SYSTEM 05',
      title: 'APP DEVELOPMENT',
      line1: 'NATIVE iOS & ANDROID APPS',
      line2: 'CROSS-PLATFORM FLUTTER DEVELOPMENT',
      body: 'Native iOS and Android apps, plus Flutter when one codebase should cover both. We build stable, fast products with clean UX, secure APIs, and store-ready releases that your team can grow after launch.',
      tone: 'tone-blue'
    },
    {
      key: 'ai',
      kicker: 'SYSTEM 06',
      title: 'AI AGENTS',
      line1: 'VOICE AI AGENTS',
      line2: 'MULTI-AGENT AUTOMATION SYSTEMS',
      body: 'Voice agents and multi-agent systems that answer, qualify, and complete tasks without extra staff load. They connect to your tools, follow your rules, and keep conversations natural while work moves in the background.',
      tone: 'tone-teal'
    },
    {
      key: 'crm',
      kicker: 'SYSTEM 07',
      title: 'CUSTOM CRM',
      line1: 'WHATSAPP INTEGRATION',
      line2: 'AI-POWERED CUSTOMER MANAGEMENT',
      body: 'A CRM built around WhatsApp and your sales flow. Leads, chats, follow-ups, and team notes stay in one place, with AI helping you reply faster, miss fewer clients, and see what each conversation needs next.',
      tone: 'tone-green'
    },
    {
      key: 'cold',
      kicker: 'SYSTEM 08',
      title: 'COLD MARKETING',
      line1: 'B2B EMAIL MARKETING',
      line2: 'LINKEDIN OUTREACH & COLD CALLING',
      body: 'Targeted B2B outreach that opens new doors. Email sequences, LinkedIn contact, and structured calling work as one system to reach the right accounts, start real talks, and book meetings without wasting the list.',
      tone: 'tone-red'
    }
  ];

  activeKey = '';
  cardOpen = false;
  hideTimer: ReturnType<typeof setTimeout> | null = null;

  get activeItem() {
    return this.items.find((item) => item.key === this.activeKey);
  }

  ngAfterViewInit() {
    const vids = [
      this.bgVideo?.nativeElement,
      this.waterVideo?.nativeElement
    ].filter(Boolean) as HTMLVideoElement[];

    const playNow = (el: HTMLVideoElement) => {
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.autoplay = true;
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
    };

    vids.forEach((el) => {
      playNow(el);
      el.addEventListener('pause', () => playNow(el));
      el.addEventListener('ended', () => {
        el.currentTime = 0.05;
        playNow(el);
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) vids.forEach(playNow);
    });

    setInterval(() => {
      vids.forEach((el) => {
        if (el.paused) playNow(el);
      });
    }, 1500);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    const t = ev.target as HTMLElement;
    if (t.closest('.heading') || t.closest('.glass-card')) return;
    this.cardOpen = false;
    this.activeKey = '';
  }

  openCard(key: string) {
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.activeKey = key;
    this.cardOpen = true;
  }

  keepOpen() {
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }

  scheduleClose() {
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.cardOpen = false;
      this.activeKey = '';
    }, 80);
  }
}