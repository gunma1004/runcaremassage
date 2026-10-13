import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import RandomShopList from "@/components/RandomShopList";
import { ShopItem } from "@/components/RandomDistrictShopList";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    dong: string;
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

function getStableIndex(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % length;
}

const DONG_TITLE_TEMPLATES = [
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 마사지·홈타이 | ${dist} 24시 방문 안내 - ${SITE_NAME}`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 런케어 마사지 | ${city} ${dist} 100% 안심 후불제 ${kw} 테라피`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 전지역 출장 방문 케어 | ${kw} 홈타이 예약 가이드 - ${SITE_NAME}`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 테라피 전문 | 25분 도착 안심 홈케어 안내`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 추천 마사지 | ${dist} ${kw} 스웨디시 정찰제 요금표`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 방문 ${kw} 마사지 | 호텔·자택 24시 힐링 케어`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 힐링 홈타이 | 선입금 없는 100% 현장결제`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 전역 마사지 안내 | ${kw} 바디 테라피 공식 가이드`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 바디케어 마사지 | 신속 방문 1:1 맞춤 관리`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 24시 마사지 | ${dist} ${kw} 타이·스웨디시 - ${SITE_NAME}`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 릴렉싱 마사지 | 투명한 정찰제 요금 안내`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 런케어 공식 마사지 안내 | ${kw} 안심 방문 케어`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 전지역 ${kw} 마사지 | 25분 빠른 출동 테라피`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 프라이빗 마사지 | 자택에서 편안한 힐링 스파`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 안심 마사지 가이드 | ${kw} 홈타이 100% 후불제`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 감성 스웨디시 | 전신 피로회복 전문 코스`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 24시 마사지 | ${kw} 맞춤형 바디케어 안내 - ${SITE_NAME}`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 아로마 테라피 | 최고급 오일 안심 홈케어`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 전역 마사지 제휴처 | ${kw} 힐링 코스 가격표 안내`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 딥티슈 마사지 | 뭉친 근육 이완 전담 관리`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 100% 현장결제 마사지 | ${kw} 방문 홈타이 가이드`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 웰니스 마사지 | 25분 도착 프리미엄 케어`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 추천 마사지 런케어 | ${kw} 힐링 테라피 정찰제 안내`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 마사지 | 선입금 ZERO 안심 예약`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 24시 마사지 안내 | ${kw} 스웨디시 & 타이 케어`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 감성 테라피 | 호텔 및 오피스텔 빠른 방문`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 공식 마사지안내 | ${kw} 1:1 맞춤 바디케어`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 집중 케어 마사지 | 투명한 정찰제 코스 안내`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 전구역 마사지 | ${kw} 힐링 홈타이 25분 칼도착`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장 ${kw} 프리미엄 테라피 | 런케어 24시 안심 방문`,
];

const DONG_DESCRIPTION_TEMPLATES = [
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 런케어마사지에서 확인하세요! ${dist} ${dong} 전 지역 24시간 신속 방문, ${kw} 코스 및 100% 안심 현장 후불제 안내.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 공식 안내 런케어입니다. 선입금 0원 100% 현장 결제 시스템으로 자택 및 호텔에 25분 내 빠르게 방문하는 맞춤 바디케어.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 및 홈타이 코스 안내! 투명한 정찰제 요금과 숙련된 관리사의 1:1 집중 관리로 ${kw} 힐링을 선사합니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 추천 런케어! ${city} ${dist} ${dong} 어디서나 24시간 연중무휴 안심 호출, ${kw} 테라피를 누려보세요.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 선입금 없는 안심 후불제! 도착 후 확인 결제하는 안전 시스템과 25분 내 신속한 방문 서비스로 편안한 휴식을 보장합니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 가격 및 코스 비교! ${kw} 건식 타이부터 프리미엄 아로마, 감성 스웨디시까지 투명한 정찰제 비용을 확인하세요.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 24시 실시간 예약 안내. ${dong} 전역 고객님이 계신 개인 공간으로 전문 관리사가 빠르게 방문하여 ${kw} 케어를 제공합니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 믿을 수 있는 100% 현장 후불제. 예약금 요구가 일절 없는 정직한 시스템으로 ${kw} 테라피를 안심하고 이용하세요.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 런케어 공식 사이트입니다. ${dong} 관할 전 지역 25분 도착 보장, ${kw} 스웨디시 및 전신 스트레칭 프로그램.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 도심 속 힐링 솔루션! 번거로운 외출 없이 집이나 숙소에서 편안하게 누리는 ${kw} 1:1 맞춤형 출장 홈케어.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 투명한 표준 요금 안내. 심야 할증 없는 정찰제와 철저한 위생 관리로 만족도 높은 ${kw} 프리미엄 바디 테라피를 선사합니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 빠른 방문 런케어마사지. ${dong} 주요 생활권 및 숙소까지 25분 내 신속 배치, ${kw} 선입금 ZERO 안심 예약 시스템.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 프리미엄 홈타이 코스. 지친 직장인과 거주민을 위한 ${kw} 맞춤형 이완 테라피 및 100% 현장 후불제 운영.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 스웨디시 & 아로마 전문 안내. 최고급 오일을 사용한 부드러운 감성 힐링과 ${kw} 전신 근막 이완 솔루션을 만나보세요.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 24시간 예약 접수 중! ${dong} 전 지역 자택, 오피스텔, 호텔 방문 가능, 도착 후 결제하는 ${kw} 안전 정찰제.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 정통 건식 케어부터 딥티슈 림프 케어까지, ${dong} 전역 어디서나 25분 내 도착하는 ${kw} 안심 홈타이 플랫폼.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 런케어만의 고품격 서비스. 불필요한 예약금 없이 계신 곳에서 편안하게 전화 한 통으로 이용하는 ${kw} 1:1 바디케어.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 코스별 상세 시간과 비용 안내. ${dist} ${dong} 빠른 방문 배정과 친절한 ${kw} 테라피스트 케어를 약속합니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 100% 후불 결제 보장 안내. 사기 걱정 없는 투명한 예약 방식과 ${kw} 철저한 프라이버시 보호 시스템을 갖추고 있습니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 전문 매니저 대기 중! ${dong} 전역 평균 25분 내 도착, ${kw} 건식 스트레칭 및 아로마 테라피로 깊은 숙면을 유도합니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 고객 만족도 최우수 런케어마사지. ${dong} 생활권 맞춤 방문, 이동 시간 없이 내 공간에서 즐기는 ${kw} 힐링 스파.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 안심 정찰제 서비스. 추가금 없는 정직한 요금표와 선입금 0원 원칙으로 ${dong} 전 지역에서 편안하게 ${kw} 코스를 호출하세요.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 및 프라이빗 홈케어 안내. 긴장된 어깨와 허리 근육을 부드럽게 이완시켜 드리는 ${kw} 1:1 전담 맞춤 테라피.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 신속 예약 시스템! ${dong} 전 지역 24시간 실시간 배정, ${kw} 스웨디시·타이 코스를 현장 결제로 안심 이용하세요.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 런케어에서 전하는 바디 테라피 가이드. 100% 현장 결제와 25분 빠른 출동으로 ${kw} 최상의 컨디션 회복을 도와드립니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 편안한 휴식을 위한 선택! 번거로운 이동 없이 자택에서 즐기는 ${dong} 세심한 ${kw} 1:1 림프 순환 케어.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 안심 방문 가이드. ${city} ${dist} ${dong} 어디든 선입금 없는 후불제로 신속하게 찾아가는 ${kw} 고품격 홈타이.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 정찰제 가격표 공개! 타이 60분부터 VIP 스페셜 코스까지 ${dong} 전 지역 25분 내 빠른 방문을 약속하는 ${kw} 안내.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 24시간 안심 호출 센터. 전문 테라피스트가 고객님의 공간으로 직접 방문하여 ${kw} 피로를 말끔히 덜어드립니다.`,
  (city: string, dist: string, dong: string, kw: string) => `${dong} 출장마사지 런케어 공식 안내. ${dist} ${dong} 100% 현장 후불제, 25분 내 도착 보장, ${kw} 타이·아로마·스웨디시 맞춤 힐링.`,
];

function getDynamicDongInsight(districtName: string, dongName: string, seed: number) {
  const dongInsightGroups = [
    {
      subtitle: `${districtName} ${dongName} 주민 및 직장인을 위한 1:1 맞춤 바디 테라피 인사이트`,
      sec1Title: `1. ${dongName} 일대 생활권의 좌식 업무와 승모근 긴장 완화`,
      sec1Text: [
        `${districtName} ${dongName}은 활발한 상업 공간과 주거 단지가 조화를 이루는 곳으로, 일상 업무나 컴퓨터 작업 등으로 인한 상체 근육의 긴장도가 높게 나타나는 지역입니다. 장시간 키보드와 마우스를 조작하다 보면 어깨가 안으로 말리는 라운드 숄더와 거북목 자세가 유발되기 쉽습니다. 이는 목덜미 후두하근과 상부 승모근에 지속적인 부하를 주어 혈액 순환을 저해하고, 만성적인 어깨 뻐근함과 두중감을 일으킵니다.`,
        `이러한 국소 근막 긴장을 효과적으로 완화하기 위해서는 체온을 안정적으로 유지하면서 단축된 근섬유를 결을 따라 부드럽게 늘려주는 수기 요법이 필요합니다. 굳어있던 혈관이 확장되면서 림프액과 혈액 순환이 촉진되고, 근육 내부에 쌓인 피로 부산물이 빠르게 배출되어 가벼운 어깨 컨디션을 회복할 수 있습니다.`
      ],
      sec2Title: "2. 컨디션에 따른 건식 타이와 스웨디시 오일 케어 비교",
      sec2Text: [
        `테라피를 선택할 때는 당일의 피로도와 신체 통증 양상을 파악하는 것이 중요합니다. 건식 기법의 대표인 타이는 별도의 오일 없이 진행되며, 관절의 가동 범위를 넓혀주는 수동적 전신 스트레칭을 핵심으로 합니다. 평소 운동량이 적어 관절 마디가 굳었거나 허리 및 하체의 묵직함을 개운하게 해소하고 싶을 때 알맞습니다.`,
        `반면 프리미엄 스웨디시는 식물성 오일을 도포하여 심장 방향으로 부드럽고 리드미컬하게 밀어 올리는 림프 순환 중심 테크닉입니다. 피부 표면의 자극 없이 정서적 안정과 깊은 신체 이완을 유도하므로, 스트레스로 인해 불면증을 겪거나 은은한 휴식을 원하는 분들에게 만족스러운 결과를 제공합니다.`
      ],
      sec3Title: `3. ${dongName} 프라이빗 룸에서 누리는 힐링의 환경적 장점`,
      sec3Text: [
        `테라피의 생리학적 효과를 온전히 누리기 위해서는 심리적 안정감이 필수적입니다. 외부 매장으로 직접 이동할 때 소모되는 교통 체증, 주차 스트레스, 대중교통 이용은 무의식중에 코르티솔 분비를 촉진할 수 있습니다.`,
        `반면 내가 가장 익숙한 독립된 공간에서 진행되는 홈케어는 외부 자극이 원천 차단되어 부교감 신경계가 빠르게 활성화됩니다. 세션이 끝난 후 환복이나 추가 이동 없이 바로 아늑한 수면으로 이어질 수 있어 힐링의 잔여 효과가 다음 날 아침까지 편안하게 지속됩니다.`
      ],
      sec4Title: "4. 안전하고 투명한 정찰제 이용 수칙",
      sec4Text: [
        `${dongName} 일대에서 서비스를 이용하실 때는 건전성과 투명성을 갖춘 공식 플랫폼을 확인하시는 것이 안전합니다. 정상적인 제휴 파트너는 예약 명목의 불법 선입금을 요구하지 않으며, 사전 공시된 정찰제 요금 기준을 엄격히 준수합니다.`,
        `허리 디스크 등 특정 질환이 있거나 임신 중인 경우 세션 시작 전 담당 힐러에게 미리 전달하시면 세심한 맞춤 압 조절을 통해 가장 안전한 웰니스 케어를 경험하실 수 있습니다.`
      ]
    },
    {
      subtitle: `${districtName} ${dongName} 웰니스 라이프를 위한 전신 림프 순환 & 디톡스 솔루션`,
      sec1Title: `1. 만성 피로와 교감신경 흥분이 신체에 미치는 생리적 영향`,
      sec1Text: [
        `현대인의 불규칙한 생활 습관과 과중한 스트레스는 체내 자율신경계의 밸런스를 무너뜨리는 주된 요인입니다. 교감신경이 지속적으로 긴장하면 말초 혈관이 수축하여 손발이 차가워지고, 근육이 무의식중에 수축 상태를 유지하게 됩니다. 이러한 긴장 상태가 지속되면 체내 노폐물 배출이 지연되고 아침에 기상할 때 몸이 무거운 만성 피로 증후군으로 발전합니다.`,
        `정성 어린 감성 터치와 균일한 리듬의 이완 요법은 감각 신경을 안정시키고 옥시토신과 세로토닌의 분비를 촉진합니다. 이를 통해 긴장되어 있던 신체가 회복 모드로 전환되며, 전신에 온기가 돌면서 자연스러운 활력을 되찾게 됩니다.`
      ],
      sec2Title: "2. 부종 완화와 혈액 순환을 위한 림프 배농 테라피",
      sec2Text: [
        `림프계는 신체의 자가 정화 시스템 역할을 수행하지만 혈관과 달리 자체 박동 펌프가 없습니다. 장시간 앉아 있거나 서 있는 생활로 서혜부(사타구니)와 액와부(겨드랑이) 주변 림프절이 뭉치면 림프액 흐름이 정체되어 하체 부종과 신체 피로도가 급격히 상승합니다.`,
        `림프 순환 케어는 강한 지압을 피하고 림프의 자연스러운 흐름 방향에 맞추어 피부층을 섬세하게 밀어주는 기법을 사용합니다. 이를 통해 축적된 잉여 수분과 대사 폐기물이 림프관으로 원활히 흡수되어 둔탁했던 다리와 전신이 한결 가벼워지는 것을 체감할 수 있습니다.`
      ],
      sec3Title: "3. 식물성 에센셜 아로마 오일의 릴렉싱 메커니즘",
      sec3Text: [
        `아로마 오일 테라피는 천연 식물 추출물의 유효 성분과 후각적 자극을 동시에 활용하는 복합 힐링 기법입니다. 실내를 은은하게 채우는 에센셜 향기는 대뇌 변연계에 직접 작용하여 불안과 긴장을 완화하는 신경 전달 물질을 유도합니다.`,
        `동시에 호호바, 스위트 아몬드 등 고급 베이스 오일이 피부 장벽에 수분막을 형성하여 건조한 환절기 피부를 윤택하게 가꾸어 줍니다. 몸의 긴장 완화와 피부 케어를 동시에 완성하는 이유입니다.`
      ],
      sec4Title: `4. ${dongName} 제휴 매장 신뢰 이용 팁`,
      sec4Text: [
        `${SITE_NAME}은 ${dongName} 전역의 고객 여러분께서 안심하고 힐링을 누리실 수 있도록 엄격한 위생 점검과 검증 절차를 통과한 파트너만을 선별합니다.`,
        `세션 후에는 미온수를 충분히 마셔 체내로 방출된 노폐물이 땀과 소변으로 원활히 배출되도록 돕고, 관리 당일은 과음을 피하고 충분한 수면을 취하는 것이 릴렉싱 효과를 극대화하는 비결입니다.`
      ]
    },
    {
      subtitle: `${districtName} ${dongName} 바디 컨디셔닝을 위한 체계적 근골격계 릴렉싱 가이드`,
      sec1Title: `1. 보행 패턴과 골반 주변 근육의 긴장 메커니즘`,
      sec1Text: [
        `${districtName} ${dongName} 일대를 중심으로 대중교통 이용과 잦은 도보 이동을 반복하는 경우, 척추를 받쳐주는 골반 지지근(중둔근, 이상근, 장요근)에 불균형한 하중이 가해집니다. 특히 짝다리를 짚거나 다리를 꼬는 습관은 골반의 미세한 뒤틀림을 유발하여 허리 하부와 허벅지 뒤쪽 햄스트링에 연쇄적인 뻐근함을 초래합니다.`,
        `체계적인 바디 컨디셔닝 요법은 단순히 겉 근육만을 문지르는 것이 아니라 골반과 척추 주변의 심부 지지근을 정교하게 짚어냅니다. 틀어진 좌우 밸런스를 정돈함으로써 보행 시 하체 피로도를 낮추고 안정적인 신체 정렬을 완성합니다.`
      ],
      sec2Title: "2. 뭉친 속근육을 풀어내는 딥티슈 테크닉의 이해",
      sec2Text: [
        `오랜 기간 묵혀둔 만성 피로는 표층 근육 아래 위치한 심부 근막에 단단한 매듭 형태의 트리거 포인트가 형성되어 발생합니다. 가벼운 터치만으로는 도달하기 힘든 이 부위는 전문적인 딥티슈 기법을 통해 다루어야 합니다.`,
        `체중을 실은 일정한 지속 압력을 심부 조직에 전달함으로써 굳어있던 근막을 분리하고 정상적인 탄력을 회복시킵니다. 세션 직후 뻐근했던 허리와 등줄기가 개운하게 열리는 상쾌함을 경험하실 수 있습니다.`
      ],
      sec3Title: "3. 방문형 케어가 제공하는 프라이빗 시간의 효율성",
      sec3Text: [
        `바쁜 현대인에게 이동 시간을 절약하는 것은 가장 현명한 컨디션 관리 전략입니다. 주차 공간을 찾거나 대기 시간을 기다리는 피로를 덜어내고, 내가 지정한 시간에 프라이빗한 관리를 누릴 수 있습니다.`,
        `누구의 방해도 받지 않는 아늑한 공간에서 진행되는 세션은 정신적 휴식과 신체적 재생을 동시에 도모할 수 있는 최적의 환경을 선사합니다.`
      ],
      sec4Title: "4. 매너 있는 이용과 정찰제 서비스 신뢰",
      sec4Text: [
        `${dongName} 공식 제휴 샵들은 사전에 명시된 투명한 코스별 정찰제 요금을 적용하여 이용자에게 혼선을 주지 않습니다.`,
        `위생 어메니티와 소독을 철저히 마친 전문 관리사와의 신뢰 관계를 통해 ${dongName} 일대 어디서나 격조 높은 프라이빗 테라피를 편안하게 누려보시기 바랍니다.`
      ]
    }
  ];

  return dongInsightGroups[seed % dongInsightGroups.length];
}

const rawShopsData: Record<string, Omit<ShopItem, "id">> = {
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
    ],
    features: ["100% 안심 후불제", "25분 내 신속 방문", "24시간 상시 운영", "전문 관리사 1:1 배정"]
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
      }
    ],
    features: ["선입금 ZERO 100% 후불제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 케어 안내"]
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
          { time: "90분", price: "90,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 없는 100% 후불제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
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
          { time: "90분", price: "80,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 후불 안심결제", "전문 관리사 상시 대기", "수도권 전지역 출장 방문", "24시간 예약 가능"]
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
          { time: "90분", price: "80,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 안심 후불제", "수도권 전지역 신속 방문", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);

  const seedString = `${city}-${district}-${dong}-runcare-v2026`;
  const patternIdx = getStableIndex(seedString, 30);
  const keyword = serviceKeywordPatterns[patternIdx];

  const finalTitle = DONG_TITLE_TEMPLATES[patternIdx](cityName, districtName, dongName, keyword);
  const finalDescription = DONG_DESCRIPTION_TEMPLATES[patternIdx](cityName, districtName, dongName, keyword);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/${encodeURIComponent(dong)}`,
    },
    keywords: [
      `${dongName} 출장마사지`,
      `${dongName}출장마사지`,
      `${dongName} 홈타이`,
      `${dongName} 스웨디시`,
      `${districtName} ${dongName} 마사지`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/${encodeURIComponent(dong)}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongMainPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const cityFullName = city.toLowerCase() === "seoul" ? "서울특별시" : city.toLowerCase() === "incheon" ? "인천광역시" : "경기도";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);

  const fullLocation = `${cityName} ${districtName} ${dongName}`;
  const currentUrl = `${SITE_URL}/${city}/${district}/${encodeURIComponent(dong)}`;

  const nearbyDongs = (districtInfo?.dongs || []).filter(d => d !== dongName).slice(0, 10);

  const shops: ShopItem[] = Object.entries(rawShopsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  const charSum = (cityName + districtName + dongName + city + district).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const insight = getDynamicDongInsight(districtName, dongName, Math.abs(charSum));

  // 🌟 네이버 및 구글 검색엔진 최적화 통합 @graph JSON-LD (4단계 빵가루 및 최하위 행정동 비즈니스 매핑)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 4단계 정밀 빵가루 내비게이션
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
            "name": `${districtName} 케어`,
            "item": `${SITE_URL}/${city}/${district}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": `${dongName} 케어`,
            "item": currentUrl
          }
        ]
      },
      // 2. 동 단위 로컬 비즈니스 상세
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${currentUrl}#business`,
        "name": `${fullLocation} 출장 케어 마사지 - ${SITE_NAME}`,
        "description": `${fullLocation} 전 지역 100% 안심 현장 후불제 출장 홈타이 및 바디케어 서비스 안내.`,
        "url": currentUrl,
        "telephone": SUPPORT_PHONE,
        "image": `${SITE_URL}/og-main.png`,
        "priceRange": "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": fullLocation
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": `${districtName} ${dongName}`,
          "addressRegion": cityFullName,
          "addressCountry": "KR"
        }
      },
      // 3. 제휴 샵 목록 ItemList
      {
        "@type": "ItemList",
        "@id": `${currentUrl}#partners`,
        "name": `${fullLocation} 추천 제휴 테라피 샵 목록`,
        "numberOfItems": shops.length,
        "itemListElement": shops.map((shop, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "HealthAndBeautyBusiness",
            "name": `${shop.name} (${dongName})`,
            "description": shop.desc,
            "telephone": shop.phone,
            "image": `${SITE_URL}${shop.image}`,
            "priceRange": shop.courses[0]?.items[0]?.price || "60,000원~",
            "paymentAccepted": "100% 현장 후불제"
          }
        }))
      },
      // 4. 동 단위 FAQ
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `${dongName}에서 예약 시 예약금이나 선입금이 있나요?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "아닙니다. 런케어마사지 제휴처는 일체의 선입금을 요구하지 않습니다. 관리사가 도착한 뒤 확인하시고 결제하는 100% 현장 후불제입니다."
            }
          },
          {
            "@type": "Question",
            "name": `늦은 심야 시간에도 ${dongName} 방문이 가능한가요?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "네, 24시간 연중무휴로 운영되며 심야 시간대에도 추가 할증 없이 주간과 동일한 투명한 정찰제로 이용하실 수 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": `${dongName} 기준 어떤 코스를 가장 많이 이용하나요?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "처음 이용하시는 분들은 부드러운 아로마 90분 또는 근육 뭉침을 시원하게 풀어주는 타이 90분 코스를 가장 선호하십니다."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 크롤러 수집용 SSR 시맨틱 블록 */}
      <div className="sr-only" aria-hidden="true">
        <h1>{fullLocation} 출장 홈케어 마사지 &amp; 홈타이 안내</h1>
        <p>{fullLocation} 고객님을 위한 100% 안심 후불제 타이·아로마·스웨디시 방문 테라피 가이드.</p>
      </div>

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
            <a
              href={`tel:${SUPPORT_PHONE}`}
              className="text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 py-1.5 rounded-xl hover:opacity-90 transition-all"
            >
              📞 24시 전화예약
            </a>
            <Link 
              href={`/${city}/${district}`} 
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            >
              &larr; {districtName} 전체
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
          <Link href={`/${city}/${district}`} className="hover:text-gray-200">{districtName}</Link>
          <span>&gt;</span>
          <span className="text-gray-200">{dongName}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        
        {/* 인트로 히어로 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-lg bg-gradient-to-b from-[#141418] to-[#0a0a0c] p-6 md:p-8 text-center md:text-left space-y-3">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {fullLocation} LOCAL GUIDE
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
            <span className="text-amber-400">{dongName}</span> 출장 홈케어 마사지 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
            {fullLocation} 고객님을 위한 엄선된 홈타이 및 바디케어 제휴처 정보입니다. 
            선입금 0원 100% 현장 후불제 시스템으로 집, 호텔, 오피스 어디서든 25분 내 안심하고 이용해 보세요.
          </p>
        </section>

        {/* 제휴 샵 목록 */}
        <RandomShopList 
          initialShops={shops} 
          fullLocation={fullLocation} 
          city={city} 
          district={district} 
          dong={dong} 
        />

        {/* 📚 네이버 상위 노출용 2,000자 전문 웰니스 칼럼 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm shadow-md">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              LOCAL WELLNESS &amp; CARE GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {insight.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {fullLocation} 고객님을 위한 신체 피로 회복 원리와 프라이빗 테라피 이용 가이드
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec1Title}
            </h3>
            {insight.sec1Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec2Title}
            </h3>
            {insight.sec2Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec3Title}
            </h3>
            {insight.sec3Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {insight.sec4Title}
            </h3>
            {insight.sec4Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 text-[11px] text-gray-500">
            * 본 콘텐츠는 {fullLocation} 이용 고객 여러분의 건강한 라이프스타일과 안전한 힐링 테라피 정보 제공을 목적으로 작성되었습니다.
          </div>
        </section>

        {/* 동별 고유 방문 환경 및 진행 가이드 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4 shadow-md">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">🏢</span> {dongName} 방문 이용 안내 및 준비사항
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 pt-2">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">자택 및 오피스텔</span>
              <p className="text-gray-400 leading-relaxed">
                매트 및 오일, 타월 등 모든 케어 용품을 테라피스트가 직접 지참하여 방문하므로 편안한 휴식 공간만 준비해 주시면 됩니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">호텔 및 비즈니스 숙소</span>
              <p className="text-gray-400 leading-relaxed">
                {dongName} 관내 비즈니스호텔 및 숙박시설에서도 호실 확인 후 신속하게 입실하여 피로 회복 케어를 도와드립니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">25분 신속 도착 시스템</span>
              <p className="text-gray-400 leading-relaxed">
                {districtName} 인근 상주 기사 및 테라피스트 배정으로 호출 즉시 평균 20~30분 내 약속된 장소로 도착합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 지역 검색 맞춤 FAQ */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4 shadow-md">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">❓</span> {dongName} 출장 홈케어 마사지 자주 묻는 질문
          </h2>
          <div className="space-y-3 text-xs md:text-sm">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. {dongName}에서 예약 시 예약금이나 선입금이 있나요?</h3>
              <p className="text-gray-400 leading-relaxed">
                아닙니다. 런케어마사지 제휴처는 일체의 선입금을 요구하지 않습니다. 관리사가 도착한 뒤 확인하시고 결제하는 100% 현장 후불제입니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. 늦은 심야 시간에도 {dongName} 방문이 가능한가요?</h3>
              <p className="text-gray-400 leading-relaxed">
                네, 24시간 연중무휴로 운영되며 심야 시간대에도 추가 할증 없이 주간과 동일한 투명한 정찰제로 이용하실 수 있습니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. {dongName} 기준 어떤 코스를 가장 많이 이용하나요?</h3>
              <p className="text-gray-400 leading-relaxed">
                처음 이용하시는 분들은 부드러운 아로마 90분 또는 근육 뭉침을 시원하게 풀어주는 타이 90분 코스를 가장 선호하십니다.
              </p>
            </div>
          </div>
        </section>

        {/* 인접 동 연계 내부 링크 */}
        {nearbyDongs.length > 0 && (
          <section className="bg-[#121214] border border-white/10 p-5 md:p-6 rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <h2 className="text-xs md:text-sm font-bold text-gray-300 flex items-center gap-2">
                <span className="text-amber-400">📍</span> {dongName} 인근 {districtName} 다른 지역 둘러보기
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {nearbyDongs.map((nearDong, idx) => (
                <Link
                  key={idx}
                  href={`/${city}/${district}/${encodeURIComponent(nearDong)}`}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-400 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                >
                  {nearDong} 출장마사지 &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-8 text-center text-xs text-gray-500 mt-20">
        <p className="font-bold text-gray-400">
          {SITE_NAME} · {fullLocation} 100% 안심 후불제 출장 홈케어
        </p>
        <p className="text-[11px] text-gray-600 mt-1">
          © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/{city}/${district}/{encodeURIComponent(dong)})
        </p>
      </footer>
    </div>
  );
}