import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
    id: string;
  }>;
}

const SITE_URL = "https://runcaremassage.netlify.app";
const SITE_NAME = "런케어마사지";
const SUPPORT_PHONE = "0507-1280-3199";

const serviceKeywordPatterns = [
  "맞춤케어", "프리미엄", "릴렉싱", "아로마", "감성힐링",
  "밸런스케어", "딥티슈", "바디컨디셔닝", "전신힐링", "스페셜",
  "호텔식", "프라이빗", "웰니스", "소프트터치", "바디케어",
  "활력충전", "체형맞춤", "건식타이", "명품힐링", "안심방문",
  "집중관리", "근육이완", "스트레칭", "피로회복", "림프순환",
  "시그니처", "베이직힐링", "VIP바디", "테라피", "스웨디시"
];

const shopDatabase: Record<string, {
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
}> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 일상의 피로를 완벽하게 해소해 드립니다.",
    courses: [
      {
        category: "스웨디시 코스",
        badge: "인기 추천",
        desc: "부드럽고 섬세한 터치로 전신의 피로를 깊이 있게 이완해 주는 프리미엄 스웨디시 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "프리미엄 코스",
        badge: "시그니처",
        desc: "만족도 높은 힐링 테크닉으로 전신의 활력을 되찾아주는 맞춤형 바디케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램 및 제휴 샵.",
    courses: [
      {
        category: "아로디시 코스",
        desc: "부드러운 아로마 감성과 힐링 케어를 동시에 즐길 수 있는 실속 프로그램.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "VIP 스웨디시 코스",
        badge: "인기 추천",
        desc: "고급 오일과 깊은 이완 테크닉으로 최고의 휴식을 선사하는 프리미엄 케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국인 스웨디시 코스",
        badge: "BEST",
        desc: "한국인 전문 관리사의 섬세하고 수준 높은 프리미엄 맞춤 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 힐링 테라피부터 올인원 VIP 코스까지 체계적인 프로그램.",
    courses: [
      {
        category: "건식 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "종합 바디케어를 모두 즐길 수 있는 올인원 150분 힐링.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    courses: [
      {
        category: "건식 힐링 코스",
        desc: "오일 없이 건식 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어주는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "아로마 힐링 코스",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 방문 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "힐링스웨디시 코스",
        badge: "인기",
        desc: "부드럽고 감성적인 오일 테라피로 심신의 안정을 찾아주는 스웨디시.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분", price: "100,000원", recommend: true },
          { time: "120분", price: "120,000원" }
        ]
      },
      {
        category: "VIP스페셜코스",
        badge: "★추천",
        desc: "최고의 만족감을 선사하는 고품격 프리미엄 맞춤 스페셜 케어.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국 관리사 코스",
        badge: "BEST",
        desc: "한국인 관리사의 전문적인 손길로 진행되는 맞춤형 프리미엄 코스.",
        items: [
          { time: "60분", price: "150,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 타이부터 스웨디시까지 완벽하게 날려버리세요.",
    courses: [
      {
        category: "건식 코스",
        desc: "오일 없이 정통 건식 지압과 스트레칭으로 피로를 시원하게 해소.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "천연 오일의 부드러움으로 전신을 편안하게 이완시켜주는 아로마 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "완벽한 휴식을 위한 고품격 프리미엄 스페셜 관리 프로그램.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "타이 & 아로마 & 풋코스를 종합적으로 즐기는 150분 올인원 코스.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 디테일하고 품격 있는 스웨디시 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ]
  }
};

function getStableIndex(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % length;
}

const SHOP_TITLE_TEMPLATES = [
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 마사지·홈타이 ${shop} | 24시 방문 안내 - ${SITE_NAME}`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${shop} 마사지 | 100% 안심 후불제 ${kw} 테라피 코스`,
  (city: string, shop: string, kw: string) => `${city} 전지역 출장 방문 케어 ${shop} | ${kw} 홈타이 예약 가이드`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 테라피 전문 ${shop} | 25분 도착 안심 홈케어`,
  (city: string, shop: string, kw: string) => `${city} 출장 추천 마사지 ${shop} | ${kw} 스웨디시 정찰제 요금표 안내`,
  (city: string, shop: string, kw: string) => `${city} 출장 방문 ${kw} 마사지 ${shop} | 호텔·자택 24시 힐링 케어`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 힐링 홈타이 ${shop} | 선입금 없는 100% 현장결제`,
  (city: string, shop: string, kw: string) => `${city} 출장 전역 마사지 ${shop} | ${kw} 바디 테라피 공식 안내`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 바디케어 마사지 ${shop} | 신속 방문 1:1 맞춤 관리`,
  (city: string, shop: string, kw: string) => `${city} 출장 24시마사지 ${shop} | ${kw} 타이·스웨디시 추천 - ${SITE_NAME}`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 릴렉싱 마사지 ${shop} | 투명한 정찰제 요금 안내`,
  (city: string, shop: string, kw: string) => `${city} 출장 런케어 마사지 제휴처 ${shop} | ${kw} 안심 방문 케어`,
  (city: string, shop: string, kw: string) => `${city} 출장 전지역 ${kw} 마사지 ${shop} | 25분 빠른 출동 테라피`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 프라이빗 마사지 ${shop} | 자택에서 편안한 힐링 스파`,
  (city: string, shop: string, kw: string) => `${city} 출장 제휴 마사지 안내 ${shop} | ${kw} 홈타이 100% 후불제`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 감성 스웨디시 ${shop} | 전신 피로회복 전문 코스`,
  (city: string, shop: string, kw: string) => `${city} 출장 24시간 마사지 ${shop} | ${kw} 맞춤형 바디케어 안내 - ${SITE_NAME}`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 아로마 테라피 ${shop} | 최고급 오일 안심 홈케어`,
  (city: string, shop: string, kw: string) => `${city} 출장 전역 마사지 파트너 ${shop} | ${kw} 힐링 코스 가격표`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 딥티슈 마사지 ${shop} | 뭉친 근육 이완 전담 관리`,
  (city: string, shop: string, kw: string) => `${city} 출장 현장결제 마사지 ${shop} | ${kw} 방문 홈타이 가이드`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 웰니스 마사지 ${shop} | 25분 도착 프리미엄 케어`,
  (city: string, shop: string, kw: string) => `${city} 출장 추천 마사지 샵 ${shop} | ${kw} 힐링 테라피 정찰제 - ${SITE_NAME}`,
  (city: string, shop: string, kw: string) => `${city} 전지역 출장 ${kw} 마사지 ${shop} | 선입금 ZERO 안심 예약`,
  (city: string, shop: string, kw: string) => `${city} 출장 24시 마사지 안내 ${shop} | ${kw} 스웨디시 & 타이 케어`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 감성 테라피 ${shop} | 호텔 및 오피스텔 빠른 방문`,
  (city: string, shop: string, kw: string) => `${city} 출장 공식 마사지 안내 ${shop} | ${kw} 1:1 맞춤 바디케어`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 집중 케어 마사지 ${shop} | 투명한 정찰제 코스 안내`,
  (city: string, shop: string, kw: string) => `${city} 출장 전구역 마사지 ${shop} | ${kw} 힐링 홈타이 25분 칼도착`,
  (city: string, shop: string, kw: string) => `${city} 출장 ${kw} 프리미엄 테라피 ${shop} | 런케어 24시 안심 방문`,
];

const SHOP_DESCRIPTION_TEMPLATES = [
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop}에서 확인하세요! ${city} 전 지역 24시간 신속 방문, ${kw} 코스 및 100% 안심 현장 후불제 안내.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 공식 제휴처 ${shop}입니다. 선입금 0원 100% 현장 결제 시스템으로 자택 및 호텔에 25분 내 빠르게 방문하는 맞춤 바디케어.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop}의 ${kw} 코스 안내! 투명한 정찰제 요금과 숙련된 관리사의 1:1 집중 관리로 하루의 피로를 시원하게 풀어드립니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 추천 ${shop}! ${city} 전역 시·군·구 어디서나 24시간 연중무휴 안심 호출, ${kw} 힐링 테라피를 누려보세요.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 선입금 없는 안심 후불제! 도착 후 확인 결제하는 안전 시스템과 25분 내 신속한 방문 서비스로 편안한 휴식을 보장합니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 가격 및 코스 비교! ${kw} 건식 타이부터 프리미엄 아로마, 감성 스웨디시까지 투명한 정찰제 비용을 한눈에 확인하세요.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 24시 실시간 예약 안내. ${city} 전역 고객님이 계신 개인 공간으로 전문 관리사가 빠르게 방문하여 ${kw} 케어를 제공합니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 믿을 수 있는 100% 현장 후불제. 예약금 요구가 일절 없는 정직한 시스템으로 ${kw} 테라피를 안심하고 이용하세요.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 런케어 공식 사이트입니다. ${city} 관할 전 지역 25분 도착 보장, ${kw} 스웨디시 및 전신 스트레칭 프로그램.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop}과 함께하는 도심 속 힐링! 번거로운 외출 없이 집이나 숙소에서 편안하게 누리는 ${kw} 1:1 맞춤형 출장 홈케어.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 투명한 표준 요금 안내. 심야 할증 없는 정찰제와 철저한 위생 관리로 만족도 높은 ${kw} 프리미엄 바디 테라피를 선사합니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 빠른 방문 ${shop}. ${city} 주요 생활권 및 외곽 지역까지 25분 내 신속 배치, ${kw} 선입금 ZERO 안심 예약 시스템.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 프리미엄 홈타이 코스. 지친 직장인과 교대 근무자를 위한 ${kw} 맞춤형 이완 테라피 및 100% 현장 후불제 운영.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 스웨디시 & 아로마 전문 안내. 최고급 오일을 사용한 부드러운 감성 힐링과 ${kw} 전신 근막 이완 솔루션을 만나보세요.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 24시간 예약 접수 중! ${city} 전 지역 자택, 오피스텔, 호텔 방문 가능, 도착 후 결제하는 ${kw} 안전 정찰제.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 정통 건식 케어부터 딥티슈 림프 케어까지, ${city} 전역 어디서나 25분 내 도착하는 ${kw} 안심 홈타이 플랫폼.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop}만의 고품격 서비스. 불필요한 예약금 없이 계신 곳에서 편안하게 전화 한 통으로 이용하는 ${kw} 1:1 바디케어.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 코스별 상세 시간과 비용 안내. ${city} 전역 세부 동별 빠른 방문 배정과 친절한 ${kw} 테라피스트 케어를 약속합니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 100% 후불 결제 보장 안내. 사기 걱정 없는 투명한 예약 방식과 ${kw} 철저한 프라이버시 보호 시스템을 갖추고 있습니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 전문 매니저 대기 중! ${city} 전역 평균 25분 내 도착, ${shop}의 ${kw} 건식 스트레칭 및 아로마 테라피로 깊은 숙면을 유도합니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 고객 만족도 최우수 ${shop}. ${city} 전 지역 생활권 맞춤 방문, 이동 시간 없이 내 공간에서 즐기는 ${kw} 힐링 스파.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 안심 정찰제 서비스 ${shop}. 추가금 없는 정직한 요금표와 선입금 0원 원칙으로 ${city} 전 지역에서 편안하게 ${kw} 코스를 호출하세요.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 및 프라이빗 홈케어 안내. ${shop}에서 긴장된 어깨와 허리 근육을 부드럽게 이완시켜 드리는 ${kw} 1:1 전담 맞춤 테라피.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 신속 예약 시스템! ${city} 전 지역 24시간 실시간 배정, ${shop}의 ${kw} 스웨디시·타이 코스를 현장 결제로 안심 이용하세요.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop}에서 전하는 바디 테라피 가이드. 100% 현장 결제와 25분 빠른 출동으로 ${kw} 최상의 컨디션 회복을 도와드립니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 편안한 휴식을 위한 선택! 번거로운 이동 없이 자택에서 즐기는 ${shop}의 세심한 ${kw} 1:1 림프 순환 케어.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 안심 방문 가이드. ${city} 전역 시·군·구 어디든 선입금 없는 후불제로 ${shop}이 신속하게 찾아가는 ${kw} 고품격 홈타이.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 정찰제 가격표 공개! 타이 60분부터 VIP 스페셜 코스까지 ${city} 전 지역 25분 내 빠른 방문을 약속하는 ${shop}의 ${kw} 안내.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 24시간 안심 호출 센터. ${shop} 전문 테라피스트가 고객님의 공간으로 직접 방문하여 ${kw} 피로를 말끔히 덜어드립니다.`,
  (city: string, shop: string, kw: string) => `${city} 출장마사지 ${shop} 공식 안내. ${city} 전역 100% 현장 후불제, 25분 내 도착 보장, ${kw} 타이·아로마·스웨디시 맞춤 힐링.`,
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, id } = resolvedParams;
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const shop = shopDatabase[id] || shopDatabase["1"];

  const seedString = `${city}-shop-${id}-runcare-v2026`;
  const patternIdx = getStableIndex(seedString, 30);
  const keyword = serviceKeywordPatterns[patternIdx];

  const finalTitle = SHOP_TITLE_TEMPLATES[patternIdx](cityName, shop.name, keyword);
  const finalDescription = SHOP_DESCRIPTION_TEMPLATES[patternIdx](cityName, shop.name, keyword);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/shop/${id}`,
    },
    keywords: [
      `${cityName} 출장마사지`,
      `${cityName} ${shop.name}`,
      `${cityName} 홈타이`,
      `${cityName} 스웨디시`,
      `${cityName} 테라피`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/shop/${id}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: `${cityName} ${shop.name}` }],
    },
  };
}

export default async function CityShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, id } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const cityFullName = city.toLowerCase() === "seoul" ? "서울특별시" : city.toLowerCase() === "incheon" ? "인천광역시" : "경기도";
  const shop = shopDatabase[id] || shopDatabase["1"];
  const displayShopTitle = `${cityName} 전지역 안심 방문 케어 - ${shop.name}`;
  const currentUrl = `${SITE_URL}/${city}/shop/${id}`;

  const allShopsList = Object.entries(shopDatabase).map(([sId, sVal]) => ({
    id: sId,
    name: sVal.name,
    badge: sVal.badge,
    desc: sVal.desc,
    phone: sVal.phone,
    image: sVal.image,
    active: sId === id
  }));

  // 코스별 가격 구조화 데이터(Offer) 생성
  const offerList = shop.courses.flatMap((cg) =>
    cg.items.map((item) => {
      const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 60000;
      return {
        "@type": "Offer",
        name: `${shop.name} ${cg.category} ${item.time}`,
        description: cg.desc,
        price: priceNum,
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
        url: currentUrl
      };
    })
  );

  // 🌟 네이버 및 구글 검색엔진 최적화 통합 @graph JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 3단계 빵가루 내비게이션
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "홈",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `${cityName} 출장 홈케어`,
            "item": `${SITE_URL}/${city}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": shop.name,
            "item": currentUrl
          }
        ]
      },
      // 2. 시/도 단위 제휴 샵 정밀 비즈니스 & 정규 코스 카탈로그
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${currentUrl}#business`,
        "name": displayShopTitle,
        "description": shop.desc,
        "url": currentUrl,
        "telephone": shop.phone,
        "image": `${SITE_URL}${shop.image}`,
        "priceRange": shop.courses[0]?.items[0]?.price || "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": cityFullName
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": cityFullName,
          "addressCountry": "KR"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${shop.name} 정규 힐링 코스 요금표`,
          "itemListElement": offerList
        }
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-40 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs shadow-sm">
              런
            </span>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link 
              href={`/${city}`} 
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            >
              &larr; {cityName} 전체보기
            </Link>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <nav className="bg-[#0c0c0e] border-b border-white/5 py-2.5 px-4 text-xs text-gray-400">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-amber-400 hover:underline">홈</Link>
          <span>&gt;</span>
          <Link href={`/${city}`} className="hover:text-gray-200">{cityName}</Link>
          <span>&gt;</span>
          <span className="text-gray-200">{shop.name}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 상단 현재 선택된 샵 정보 배너 카드 */}
        <section className="bg-[#121214] border border-white/10 rounded-3xl overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
            <img src={shop.image} alt={displayShopTitle} className="w-full h-full object-cover filter brightness-[0.75]" />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
              ✨ {shop.badge}
            </span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-[#121214] rounded-t-3xl border-t border-amber-500/20">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
              📍 {cityName} 전지역 안심 방문 제휴처
            </span>
            <h1 className="text-xl md:text-3xl font-black text-white leading-tight">{displayShopTitle}</h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>
          </div>
        </section>

        {/* 전체 제휴 샵 목록 보기 카드 섹션 */}
        <section className="bg-[#121214] border border-white/10 p-6 rounded-3xl space-y-4 shadow-md">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PARTNER SHOPS IN {cityName}</span>
            <h3 className="text-base md:text-xl font-black text-white mt-1">
              ✨ {cityName} 전지역 공식 제휴처 (총 5곳)
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {allShopsList.map((s) => (
              <div 
                key={s.id} 
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  s.active 
                    ? "bg-amber-500/10 border-amber-500/50 shadow-sm" 
                    : "bg-black/40 border-white/10 hover:border-amber-500/30"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white truncate">{s.name}</span>
                      {s.active && <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded-full">선택됨</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/${city}/shop/${s.id}`}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      s.active
                        ? "bg-amber-500 text-black font-black shadow-xs"
                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500"
                    }`}
                  >
                    {s.active ? "안내 보기" : "샵 선택"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 코스 및 가격 안내 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-md">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM &amp; PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-white mt-1">💎 {shop.name} 정규 코스 및 요금</h2>
          </div>
          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div key={idx} className="bg-black/40 border border-white/10 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-white text-base">{courseGroup.category}</h3>
                  {courseGroup.badge && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {courseGroup.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{courseGroup.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3.5 bg-[#18181c] rounded-xl border border-white/10 flex justify-between items-center shadow-xs">
                      <span className="text-xs font-bold text-gray-300">⏱️ {item.time}</span>
                      <span className="text-sm font-black text-amber-400">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 고정 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-xl border-t border-amber-500/20 p-3 md:p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone}`} 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-md transition-transform active:scale-95"
          >
            📞 전화예약 ({shop.phone})
          </a>
          <a 
            href={`sms:${shop.phone}`} 
            className="flex items-center justify-center gap-2 bg-[#18181c] hover:bg-[#222228] border border-white/10 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm transition-transform active:scale-95"
          >
            💬 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}