import { BuilderComponent } from "@/types/builder";

export const onlineMarketingConferenceLayout: BuilderComponent[] = [
  {
    id: "hero-section-1",
    type: "hero",
    props: {
      title: "Online Marketing Conference",
      subtitle: "26 - 28 Nov, 2021",
      description: "Learn more about internet marketing in london",
      ctaText: "Register Now",
      background: "gradient-teal-orange",
    },
    height: 600,
  },
  {
    id: "section-1",
    type: "section",
    props: {
      backgroundColor: "#ffffff",
      padding: 64,
    },
    children: [
      {
        id: "row-1",
        type: "row",
        props: {},
        children: [
          {
            id: "col-1",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "heading-1",
                type: "heading",
                props: {
                  text: "Get a fresh perspective",
                  level: 2,
                  fontSize: 36,
                  fontWeight: "bold",
                },
              },
              {
                id: "paragraph-1",
                type: "paragraph",
                props: {
                  text: "Listen to over 10 speakers that have made it in the digital world of marketing, around over 50 scheduled workshops and a lot more at the conference. Get real insights and inspiration you need to take your marketing to the next level.",
                  fontSize: 16,
                  lineHeight: 1.6,
                },
              },
            ],
          },
          {
            id: "col-2",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "image-1",
                type: "image",
                props: {
                  src: "https://via.placeholder.com/300x300?text=Speaker",
                  alt: "Speaker Image",
                },
                height: 300,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "section-2",
    type: "section",
    props: {
      backgroundColor: "#f9fafb",
      padding: 64,
    },
    children: [
      {
        id: "row-2",
        type: "row",
        props: {},
        children: [
          {
            id: "col-3",
            type: "column",
            width: 4,
            props: {},
            children: [
              {
                id: "card-1",
                type: "card",
                props: {
                  title: "Inborn Street San Francisco",
                  description:
                    "You are organized in a way that is and needs to go beyond the day one's official theme of the same time.",
                },
                height: 250,
              },
            ],
          },
          {
            id: "col-4",
            type: "column",
            width: 4,
            props: {},
            children: [
              {
                id: "card-2",
                type: "card",
                props: {
                  title: "Virtual only stays - Be there!",
                  description:
                    "Suit your own gathering in shore shores worth during the there is no world of online marketing.",
                },
                height: 250,
              },
            ],
          },
          {
            id: "col-5",
            type: "column",
            width: 4,
            props: {},
            children: [
              {
                id: "card-3",
                type: "card",
                props: {
                  title: "The beginners workshop - Learn more!",
                  description:
                    "Suited to people who are going to shore down worth during the world of online marketing.",
                },
                height: 250,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cta-section-1",
    type: "cta",
    props: {
      title: "Register for the Conference 2021",
      description:
        "Register with your details and you'll be registered for the world's leading digital marketing event.",
      ctaText: "Register Now",
      background: "gradient-teal-cyan",
    },
    height: 400,
  },
];

export const modernHeroPageLayout: BuilderComponent[] = [
  {
    id: "hero-1",
    type: "hero",
    props: {
      title: "Online Marketing Conference",
      subtitle: "26 – 28 NOV, 2021",
      description: "Learn more about internet marketing in London.",
      ctaText: "Register Now!",
      background: "gradient-teal-orange",
    },
    height: 500,
  },
  {
    id: "about-section",
    type: "section",
    props: {
      backgroundColor: "#ffffff",
      padding: 60,
    },
    children: [
      {
        id: "about-row-1",
        type: "row",
        props: {},
        children: [
          {
            id: "about-col-1",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "about-heading",
                type: "heading",
                props: {
                  text: "Get a fresh perspective",
                  level: 2,
                  fontSize: 32,
                  fontWeight: "bold",
                },
              },
              {
                id: "about-para",
                type: "paragraph",
                props: {
                  text: "Listen to over 10 speakers that have made it in the digital world of marketing, attend over 100 scheduled workshops and get the tools, insights and inspiration you need to take your marketing to the next level.",
                  fontSize: 16,
                  lineHeight: 1.7,
                },
              },
            ],
          },
          {
            id: "about-col-2",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "about-image",
                type: "image",
                props: {
                  src: "https://via.placeholder.com/500x400?text=Conference+Image",
                  alt: "Conference Image",
                },
                height: 300,
              },
            ],
          },
        ],
      },
      {
        id: "divider-1",
        type: "divider",
        props: {
          color: "#eeeeee",
          thickness: 1,
          margin: "30px 0",
        },
      },
      {
        id: "location-row",
        type: "row",
        props: {},
        children: [
          {
            id: "location-col-1",
            type: "column",
            width: 4,
            props: {},
            children: [
              {
                id: "location-heading",
                type: "heading",
                props: {
                  text: "Folsom Street, San Francisco",
                  level: 3,
                  fontSize: 24,
                  fontWeight: "bold",
                },
              },
              {
                id: "location-para",
                type: "paragraph",
                props: {
                  text: "San Francisco is the center of the online world, so we're able to bring in the best speakers in the industry at the same time, a unique chance!",
                  fontSize: 14,
                  lineHeight: 1.7,
                },
              },
            ],
          },
          {
            id: "location-col-2",
            type: "column",
            width: 4,
            props: {},
            children: [
              {
                id: "location-image",
                type: "image",
                props: {
                  src: "https://via.placeholder.com/300x250?text=Location",
                  alt: "Location",
                },
                height: 200,
              },
            ],
          },
          {
            id: "date-col",
            type: "column",
            width: 4,
            props: {},
            children: [
              {
                id: "date-heading",
                type: "heading",
                props: {
                  text: "August 20th. 2021 - Be there!",
                  level: 4,
                  fontSize: 18,
                  fontWeight: "bold",
                },
              },
              {
                id: "date-para",
                type: "paragraph",
                props: {
                  text: "Each year we're gathering to share ideas worth sharing. Be there if you're a B2B marketer who wants to learn more about the world of online marketing.",
                  fontSize: 14,
                  lineHeight: 1.7,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sponsors-section",
    type: "section",
    props: {
      backgroundColor: "#4FBDBA",
      padding: 40,
    },
    children: [
      {
        id: "sponsors-row",
        type: "row",
        props: {},
        children: [
          {
            id: "sponsor-1",
            type: "column",
            width: 3,
            props: {},
            children: [
              {
                id: "sponsor-item-1",
                type: "paragraph",
                props: {
                  text: "The Amazing Company",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "sponsor-2",
            type: "column",
            width: 3,
            props: {},
            children: [
              {
                id: "sponsor-item-2",
                type: "paragraph",
                props: {
                  text: "The Wonderful Company",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "sponsor-3",
            type: "column",
            width: 3,
            props: {},
            children: [
              {
                id: "sponsor-item-3",
                type: "paragraph",
                props: {
                  text: "The Awesome Company",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "sponsor-4",
            type: "column",
            width: 3,
            props: {},
            children: [
              {
                id: "sponsor-item-4",
                type: "paragraph",
                props: {
                  text: "The Incredible Company",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "center",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "speakers-section",
    type: "section",
    props: {
      backgroundColor: "#ffffff",
      padding: 60,
    },
    children: [
      {
        id: "speakers-row-1",
        type: "row",
        props: {},
        children: [
          {
            id: "speakers-col-1",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "speakers-heading",
                type: "heading",
                props: {
                  text: "Our Speakers",
                  level: 2,
                  fontSize: 32,
                  fontWeight: "bold",
                },
              },
              {
                id: "speakers-para",
                type: "paragraph",
                props: {
                  text: "Listen to over 10 speakers that have made it in the digital world of marketing, attend over 100 scheduled workshops and get the tools, insights and inspiration you need to take your marketing to the next level.",
                  fontSize: 14,
                  lineHeight: 1.7,
                },
              },
            ],
          },
          {
            id: "speakers-col-2",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "speaker-grid",
                type: "row",
                props: {},
                children: [
                  {
                    id: "speaker-1",
                    type: "column",
                    width: 6,
                    props: {},
                    children: [
                      {
                        id: "speaker-card-1",
                        type: "paragraph",
                        props: {
                          text: "Richard - CEO",
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#ffffff",
                          backgroundColor: "#4FBDBA",
                          padding: "20px",
                          textAlign: "center",
                        },
                      },
                    ],
                  },
                  {
                    id: "speaker-2",
                    type: "column",
                    width: 6,
                    props: {},
                    children: [
                      {
                        id: "speaker-card-2",
                        type: "paragraph",
                        props: {
                          text: "David Mark - Newsletter",
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#ffffff",
                          backgroundColor: "#E8B4B8",
                          padding: "20px",
                          textAlign: "center",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "register-section",
    type: "section",
    props: {
      backgroundColor: "#f8f9fa",
      padding: 80,
    },
    children: [
      {
        id: "register-row",
        type: "row",
        props: {},
        children: [
          {
            id: "register-col-1",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "register-tag",
                type: "paragraph",
                props: {
                  text: "SECURE YOUR SPOT",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#4FBDBA",
                  letterSpacing: "2px",
                },
              },
              {
                id: "register-heading",
                type: "heading",
                props: {
                  text: "Register for the Conference 2021",
                  level: 2,
                  fontSize: 32,
                  fontWeight: "bold",
                },
              },
              {
                id: "register-desc",
                type: "paragraph",
                props: {
                  text: "Fill in your details below and join thousands of marketers at the world's leading digital marketing event.",
                  fontSize: 14,
                  lineHeight: 1.7,
                },
              },
            ],
          },
          {
            id: "register-col-2",
            type: "column",
            width: 6,
            props: {},
            children: [
              {
                id: "form-section",
                type: "paragraph",
                props: {
                  text: "Registration Form",
                  fontSize: 16,
                  fontWeight: "bold",
                },
              },
              {
                id: "form-note",
                type: "paragraph",
                props: {
                  text: "Form fields can be customized in the editor - Name, Email, Phone, Company, Location, Job Role, and Message.",
                  fontSize: 13,
                  color: "#666",
                  fontStyle: "italic",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cta-footer",
    type: "cta",
    props: {
      title: "What are you waiting for?",
      description: "Save your spot and get to learn more about online marketing.",
      ctaText: "Register Now!",
      background: "gradient-teal-orange",
    },
    height: 400,
  },
];

export const templateLayoutMap: Record<string, BuilderComponent[]> = {
  "online-marketing-conference": onlineMarketingConferenceLayout,
  "1": modernHeroPageLayout,
  "2": onlineMarketingConferenceLayout,
  "3": onlineMarketingConferenceLayout,
  "4": onlineMarketingConferenceLayout,
};
