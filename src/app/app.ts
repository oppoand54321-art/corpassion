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


  servicePages = [

    {
      key: 'web',
      kicker: 'SYSTEM 01',
      title: 'WEB DEVELOPMENT',
      headings: [
        'SITES THAT CONVERT, NOT JUST LOOK GOOD',
        'ENGINEERED FOR SPEED AND SCALE',
        'BUILT AROUND REAL BUSINESS WORKFLOWS'
      ],
      paragraphs: [
        'Corpassion designs and develops websites that carry the full weight of a modern business: brand presence, lead capture, product discovery and conversion. Landing pages, corporate sites and e-commerce platforms are planned as systems, not one-off pages.',
        'Every build is mobile-first, secure and measured against performance. Clean architecture, reusable components and hosting that can take real traffic keep the product stable as the company grows.',
        'From first wireframe to launch and aftercare, the site stays connected to your CRM, analytics and marketing stack so the website is not a brochure — it is an operating channel.'
      ],
      video: '/videos/web-development.mp4',
      images: [] as string[]
    },

    {
      key: 'design',
      kicker: 'SYSTEM 02',
      title: 'DESIGN SERVICES',
      headings: [
        'IDENTITY THAT HOLDS ACROSS EVERY SCREEN',
        'UI/UX THAT MAKES THE PRODUCT EASY',
        'MOTION THAT GIVES THE BRAND A PULSE'
      ],
      paragraphs: [
        'Design at Corpassion starts with how a company should feel in the market, then becomes a usable system: logo, type, colour, layout rules and interface patterns that work on web, app and campaign assets.',
        'UI/UX work is practical. Screens are mapped to real user jobs — browse, compare, buy, book, ask, return — so the product is faster to understand and harder to abandon.',
        'Motion graphics and short brand films extend the same language into video, so campaigns, product launches and social content stay on-brand without looking like afterthoughts.'
      ],
      video: '/videos/design-services.mp4',
      images: [] as string[]
    },

    {
      key: 'erp',
      kicker: 'SYSTEM 03',
      title: 'CUSTOM ERP',
      headings: [
        'ONE SYSTEM FOR FINANCE, STOCK AND PEOPLE',
        'BUILT FOR HOW YOUR COMPANY ACTUALLY WORKS'
      ],
      paragraphs: [
        'Off-the-shelf ERP often forces a business to change its process. Corpassion builds the opposite: modules for finance, inventory, HR and operations that follow the way your teams already move work through the company.',
        'VAT-aware accounting, warehouse movement, payroll and operational reporting sit in one place. Approvals, roles and audit trails are designed in from the start so the system stays usable as the organisation grows.',
        'The result is a single source of truth — not five spreadsheets and three logins — with room to add industry-specific workflows later.'
      ],
      video: '',
      images: [
        '/images/marquee/01.jpg',
        '/images/marquee/02.jpg',
        '/images/marquee/03.jpg'
      ]
    },

    {
      key: 'warm',
      kicker: 'SYSTEM 04',
      title: 'WARM MARKETING',
      headings: [
        'TURN ATTENTION INTO A SALES PIPELINE',
        'CONTENT, COMMUNITY AND PAID MEDIA TOGETHER'
      ],
      paragraphs: [
        'Warm marketing works with people who already know the brand. Corpassion plans social presence, community conversation and paid campaigns so they feed the same commercial goal instead of running as separate experiments.',
        'Instagram, TikTok and Facebook content is scheduled against offers, proof and product stories. Paid ads then amplify the pieces that already hold attention, instead of shouting into a cold feed.',
        'Reporting is tied to enquiries and revenue, not vanity metrics, so the team can see which creatives, audiences and offers actually move the business.'
      ],
      video: '',
      images: [
        '/images/marquee/04.jpg',
        '/images/marquee/05.jpg'
      ]
    },

    {
      key: 'app',
      kicker: 'SYSTEM 05',
      title: 'APP DEVELOPMENT',
      headings: [
        'NATIVE WHERE IT MATTERS, FLUTTER WHERE IT SAVES TIME',
        'STABLE PRODUCTS WITH CLEAN APIS'
      ],
      paragraphs: [
        'Mobile products are built as long-term assets. Native iOS and Android when the experience needs platform depth; Flutter when one codebase should cover both stores without slowing the roadmap.',
        'Architecture covers auth, payments, notifications, offline states and API contracts so the app does not collapse under the first wave of real users.',
        'Design and engineering stay in the same loop: screens are tested against actual tasks, then shipped with room to add features without rewriting the core.'
      ],
      video: '',
      images: [
        '/images/marquee/06.jpg',
        '/images/marquee/07.jpg',
        '/images/marquee/08.jpg'
      ]
    },

    {
      key: 'ai',
      kicker: 'SYSTEM 06',
      title: 'AI AGENTS',
      headings: [
        'AGENTS THAT ANSWER, QUALIFY AND COMPLETE WORK',
        'VOICE, CHAT AND BACK-OFFICE AUTOMATION',
        'CONNECTED TO THE TOOLS YOU ALREADY USE'
      ],
      paragraphs: [
        'Corpassion builds AI agents that sit inside real operations — answering inbound questions, qualifying leads, booking slots, updating records and handing off to a human when judgement is required.',
        'Voice agents handle calls with a natural flow. Multi-agent setups split research, writing, follow-up and reporting so each job has a clear owner instead of one overloaded chatbot.',
        'Integrations keep the agent useful: CRM, WhatsApp, calendars, knowledge bases and internal APIs. The system is measured on completed tasks, not on how clever the reply sounds.'
      ],
      video: '/videos/ai-agents.mp4',
      images: [] as string[]
    },

    {
      key: 'crm',
      kicker: 'SYSTEM 07',
      title: 'CUSTOM CRM',
      headings: [
        'SALES FLOW, NOT A GENERIC DATABASE',
        'WHATSAPP AND AI INSIDE THE PIPELINE'
      ],
      paragraphs: [
        'A custom CRM starts from how your team actually sells: where leads arrive, who owns them, what a good follow-up looks like and when a deal should move. Screens and stages match that flow instead of forcing a generic pipeline.',
        'WhatsApp conversations, notes, tasks and deal history live on the same record. AI assistance drafts replies, scores leads and flags silence so opportunities are harder to lose.',
        'Managers see activity and conversion without chasing updates. The CRM becomes the working desk of the sales team, not another login they avoid.'
      ],
      video: '',
      images: [
        '/images/marquee/09.jpg',
        '/images/marquee/10.jpg'
      ]
    },

    {
      key: 'cold',
      kicker: 'SYSTEM 08',
      title: 'COLD MARKETING',
      headings: [
        'STRUCTURED OUTREACH THAT OPENS NEW DOORS',
        'EMAIL, LINKEDIN AND CALLING AS ONE SYSTEM'
      ],
      paragraphs: [
        'Cold marketing is treated as a disciplined channel, not a spray of messages. Account lists are built around fit, then sequences run across email, LinkedIn and calling with a clear reason to reply.',
        'Copy, timing and follow-up rules are designed together so a prospect meets one coherent story instead of three disconnected pitches. Replies route into the CRM for qualification.',
        'The aim is qualified conversations with the right companies — volume that sales can actually work, not a mailbox full of noise.'
      ],
      video: '',
      images: [
        '/images/marquee/11.jpg',
        '/images/marquee/12.jpg',
        '/images/marquee/13.jpg'
      ]
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


  firstWord(text: string): string {
    if (!text) {
      return '';
    }

    return text.trim().split(/\s+/)[0];
  }


  restWords(text: string): string {
    if (!text) {
      return '';
    }

    const parts = text.trim().split(/\s+/);
    return parts.slice(1).join(' ');
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
