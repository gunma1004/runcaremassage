import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://runcaremassage.netlify.app";
const SITE_NAME = "런케어마사지";

export const metadata: Metadata = {
  // 스팸 필터를 회피하고 정찰제 요금 검색 의도를 반영한 타이틀
  title: `코스별 이용 요금 안내 | 투명한 100% 현장 후불 정찰제 - ${SITE_NAME}`,
  description: "서울·경기·인천 런케어마사지 투명한 코스별 이용 안내. 타이, 아로마, 스웨디시, VIP 맞춤 테라피 비용과 선입금 없는 100% 안심 현장 결제 시스템.",
  keywords: [
    "런케어마사지 가격",
    "서울 출장 케어 요금",
    "방문 홈타이 비용",
    "스웨디시 테라피 가격",
    "아로마 케어 요금",
    "수도권 홈케어 코스",
    "후불제 출장 케어"
  ],
  alternates: {
    canonical: `${SITE_URL}/prices`,
  },
  openGraph: {
    title: `코스별 이용 요금 안내 | ${SITE_NAME} 투명한 후불 정찰제`,
    description: "선입금 없는 100% 안심 후불제! 타이, 아로마, 스웨디시, VIP 맞춤 코스별 요금을 투명하게 비교해 보세요.",
    url: `${SITE_URL}/prices`,
    siteName: `${SITE_NAME} (RunCareMassage)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 코스별 이용 안내`,
      },
    ],
  },
};

const priceList = [
  {
    title: "베이직 타이 힐링 케어",
    duration: "60분 / 90분 / 120분",
    price: "60,000원부터~",
    desc: "오일 없이 정통 건식 지압과 스트레칭으로 전신 근육 피로를 시원하게 풀어주는 기본 코스",
    badge: "가성비 추천",
    highlight: false,
  },
  {
    title: "프리미엄 전신 아로마 케어",
    duration: "60분 / 90분 / 120분",
    price: "70,000원부터~",
    desc: "최고급 천연 아로마 에센셜 오일로 림프 순환을 돕고 심신을 부드럽게 이완시키는 힐링 프로그램",
    badge: "인기 만족도",
    highlight: false,
  },
  {
    title: "감성 힐링 스웨디시 케어",
    duration: "60분 / 90분 / 120분",
    price: "80,000원부터~",
    desc: "섬세하고 부드러운 감성 테크닉으로 깊은 휴식과 활력을 선사하는 런케어마사지 시그니처 코스",
    badge: "BEST 시그니처",
    highlight: true,
  },
  {
    title: "VIP 스페셜 올인원 케어",
    duration: "60분 / 90분 / 120분 / 150분",
    price: "100,000원부터~",
    desc: "타이 스트레칭과 아로마, 스웨디시를 유기적으로 결합한 최고급 고품격 맞춤형 바디 솔루션",
    badge: "스페셜 VIP",
    highlight: false,
  },
  {
    title: "한국인 관리사 프리미엄 코스",
    duration: "60분 / 90분",
    price: "140,000원부터~",
    desc: "전문 자격을 갖춘 한국인 테라피스트의 디테일하고 수준 높은 1:1 전담 맞춤 테라피",
    badge: "명품 프리미엄",
    highlight: false,
  },
];

export default function PricesPage() {
  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase shadow-sm">
            TRANSPARENT PRICE POLICY
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            {SITE_NAME} 투명한 코스별 이용 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            선입금 0원 100% 안심 후불제 시스템으로 운영되며, 관리사 도착 전 일체의 예약금을 요구하지 않습니다.
          </p>
        </section>

        {/* 100% 안심 보증 배너 */}
        <section className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
            🛡️
          </div>
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-amber-300">
              선입금 ZERO · 100% 현장 결제 보장
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              {SITE_NAME}의 모든 제휴점은 전문 테라피스트 방문 후 고객님께서 직접 확인하시고 결제하는 안전 시스템입니다.
            </p>
          </div>
        </section>

        {/* 코스별 가격 카드 리스트 */}
        <section className="space-y-4">
          {priceList.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-[#121214] border rounded-2xl p-5 md:p-6 transition-all shadow-md group relative ${
                item.highlight 
                  ? "border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.12)] bg-gradient-to-b from-[#18181c] to-[#121214]" 
                  : "border-white/10 hover:border-amber-500/40"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                      item.highlight 
                        ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-amber-400" 
                        : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    }`}>
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      ⏱️ {item.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base md:text-lg text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between border-t border-white/5 md:border-0 pt-3 md:pt-0">
                  <span className="text-amber-400 font-black text-lg md:text-xl tracking-tight">
                    {item.price}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    (VAT 포함 / 100% 현장결제)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 하단 이용 가이드 및 주의사항 */}
        <section className="bg-[#121214] border border-white/10 p-6 rounded-3xl space-y-3 text-xs text-gray-300 leading-relaxed shadow-md">
          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
            <span>📌</span> 이용 요금 및 예약 안내 사항
          </h4>
          <ul className="list-disc list-inside space-y-1 pl-1 text-gray-400">
            <li>서울, 경기, 인천 수도권 전 지역 자택 및 호텔로 신속하게 방문합니다.</li>
            <li>심야 시간대에도 추가 할증 없이 투명한 정찰제로 정직하게 운영됩니다.</li>
            <li>음주 상태가 심하거나 비매너 행위 시 관리사의 안전을 위해 서비스가 중단될 수 있습니다.</li>
            <li>방문 25분 전 취소 시 별도 위약금 없이 일정 조정이 가능합니다.</li>
          </ul>
        </section>

        {/* 빠른 상담 및 예약 연결 */}
        <section className="text-center pt-2 space-y-4">
          <a 
            href="tel:050712803199"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-sm px-8 py-4 rounded-2xl shadow-lg transition-transform active:scale-95"
          >
            📞 24시 실시간 코스 및 예약 상담 (0507-1280-3199)
          </a>

          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-amber-400 transition-colors font-medium"
            >
              ← {SITE_NAME} 메인 홈으로 이동하기
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}