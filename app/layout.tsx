import type { Metadata } from "next";

const SITE_URL = "https://runcaremassage.netlify.app";
const SITE_NAME = "런케어마사지";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "서울 출장 케어 마사지 | 경기·인천 24시 홈타이 테라피 - 런케어",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "프라이빗 케어 전문 서울 출장마사지 런케어입니다. 경기 및 인천 전지역 방문 테라피, 스웨디시·아로마·타이 힐링 코스 및 투명한 100% 현장후불 정찰제 안내.",
  keywords: [
    "런케어마사지",
    "서울 출장 케어 마사지",
    "서울 출장마사지",
    "서울 홈타이",
    "경기 출장 케어",
    "인천 출장 테라피",
    "스웨디시 마사지",
    "아로마 힐링 케어",
    "수도권 24시 홈케어",
    "현장 후불제 마사지",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  verification: {
    other: {
      "naver-site-verification": "157949d35498de22dc8cf429832764c32342c098",
    },
  },
  openGraph: {
    title: "서울 출장 케어 마사지 | 경기·인천 24시 홈타이 테라피 - 런케어",
    description:
      "프라이빗 케어 전문 서울 출장마사지 런케어입니다. 경기 및 인천 전지역 방문 테라피, 스웨디시·아로마·타이 힐링 코스 및 투명한 100% 현장후불 정찰제 안내.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "런케어마사지 - 서울 경기 인천 프라이빗 테라피",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "서울 출장 케어 마사지 | 경기·인천 24시 홈타이 테라피 - 런케어",
    description:
      "프라이빗 케어 전문 서울 출장마사지 런케어입니다. 경기 및 인천 전지역 방문 테라피, 스웨디시·아로마·타이 힐링 코스 및 투명한 100% 현장후불 정찰제 안내.",
    images: ["/og-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};