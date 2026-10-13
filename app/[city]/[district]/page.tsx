import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import RandomDistrictShopList, { ShopItem } from "@/components/RandomDistrictShopList";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
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

const DISTRICT_TITLE_TEMPLATES = [
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 마사지·홈타이 | ${city} 24시 방문 안내 - ${SITE_NAME}`,
  (city: string, dist: string, kw: string) => `${dist} 출장 런케어 마사지 | ${city} 100% 안심 후불제 ${kw} 테라피`,
  (city: string, dist: string, kw: string) => `${dist} 출장 전지역 마사지 케어 | ${kw} 홈타이 예약 가이드 - ${SITE_NAME}`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 마사지 전문 | 25분 도착 안심 홈케어 안내`,
  (city: string, dist: string, kw: string) => `${dist} 출장 추천 마사지 | ${city} ${kw} 스웨디시 정찰제 요금표`,
  (city: string, dist: string, kw: string) => `${dist} 출장 방문 ${kw} 마사지 | 호텔·자택 24시 힐링 케어`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 힐링 홈타이 | 선입금 없는 100% 현장결제`,
  (city: string, dist: string, kw: string) => `${dist} 출장 전역 마사지 안내 | ${kw} 바디 테라피 공식 가이드`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 바디케어 마사지 | 신속 방문 1:1 맞춤 관리`,
  (city: string, dist: string, kw: string) => `${dist} 출장 24시 마사지 | ${city} ${kw} 타이·스웨디시 - ${SITE_NAME}`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 릴렉싱 마사지 | 투명한 정찰제 요금 안내`,
  (city: string, dist: string, kw: string) => `${dist} 출장 런케어 마사지 안내 | ${kw} 안심 방문 케어`,
  (city: string, dist: string, kw: string) => `${dist} 출장 전지역 ${kw} 마사지 | 25분 빠른 출동 테라피`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 프라이빗 마사지 | 자택에서 편안한 힐링 스파`,
  (city: string, dist: string, kw: string) => `${dist} 출장 안심 마사지 가이드 | ${kw} 홈타이 100% 후불제`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 감성 마사지 | 전신 피로회복 전문 코스`,
  (city: string, dist: string, kw: string) => `${dist} 출장 24시간 마사지 | ${kw} 맞춤형 바디케어 안내 - ${SITE_NAME}`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 아로마 마사지 | 최고급 오일 안심 홈케어`,
  (city: string, dist: string, kw: string) => `${dist} 출장 전역 마사지 제휴처 | ${kw} 힐링 코스 가격표 안내`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 딥티슈 마사지 | 뭉친 근육 이완 전담 관리`,
  (city: string, dist: string, kw: string) => `${dist} 출장 100% 마사지 현장결제 | ${kw} 방문 홈타이 가이드`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 웰니스 마사지 | 25분 도착 프리미엄 케어`,
  (city: string, dist: string, kw: string) => `${dist} 출장 추천 마사지 런케어 | ${kw} 힐링 테라피 정찰제 안내`,
  (city: string, dist: string, kw: string) => `${dist} 전지역 출장 ${kw} 마사지 | 선입금 ZERO 안심 예약`,
  (city: string, dist: string, kw: string) => `${dist} 출장 24시 마사지 안내 | ${kw} 스웨디시 & 타이 케어`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 감성 테라피 | 호텔 및 오피스텔 빠른 방문`,
  (city: string, dist: string, kw: string) => `${dist} 출장 공식 마사지 안내 | ${kw} 1:1 맞춤 바디케어`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 집중 케어 마사지 | 투명한 정찰제 코스 안내`,
  (city: string, dist: string, kw: string) => `${dist} 출장 전구역 마사지 | ${kw} 힐링 홈타이 25분 칼도착`,
  (city: string, dist: string, kw: string) => `${dist} 출장 ${kw} 프리미엄 테라피 | 런케어 24시 안심 방문`,
];

const DISTRICT_DESCRIPTION_TEMPLATES = [
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 런케어마사지에서 확인하세요! ${dist} 전 지역 24시간 신속 방문, ${kw} 코스 및 100% 안심 현장 후불제 안내.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 공식 안내 런케어입니다. 선입금 0원 100% 현장 결제 시스템으로 자택 및 호텔에 25분 내 빠르게 방문하는 맞춤 바디케어.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 및 홈타이 코스 안내! 투명한 정찰제 요금과 숙련된 관리사의 1:1 집중 관리로 ${kw} 힐링을 선사합니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 추천 런케어! ${city} ${dist} 전역 어디서나 24시간 연중무휴 안심 호출, ${kw} 테라피를 누려보세요.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 선입금 없는 안심 후불제! 도착 후 확인 결제하는 안전 시스템과 25분 내 신속한 방문 서비스로 편안한 휴식을 보장합니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 가격 및 코스 비교! ${kw} 건식 타이부터 프리미엄 아로마, 감성 스웨디시까지 투명한 정찰제 비용을 확인하세요.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 24시 실시간 예약 안내. ${dist} 전역 고객님이 계신 개인 공간으로 전문 관리사가 빠르게 방문하여 ${kw} 케어를 제공합니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 믿을 수 있는 100% 현장 후불제. 예약금 요구가 일절 없는 정직한 시스템으로 ${kw} 테라피를 안심하고 이용하세요.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 런케어 공식 사이트입니다. ${dist} 관할 전 지역 25분 도착 보장, ${kw} 스웨디시 및 전신 스트레칭 프로그램.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 도심 속 힐링 솔루션! 번거로운 외출 없이 집이나 숙소에서 편안하게 누리는 ${kw} 1:1 맞춤형 출장 홈케어.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 투명한 표준 요금 안내. 심야 할증 없는 정찰제와 철저한 위생 관리로 만족도 높은 ${kw} 프리미엄 바디 테라피를 선사합니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 빠른 방문 런케어마사지. ${dist} 주요 생활권 및 외곽 지역까지 25분 내 신속 배치, ${kw} 선입금 ZERO 안심 예약 시스템.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 프리미엄 홈타이 코스. 지친 직장인과 거주민을 위한 ${kw} 맞춤형 이완 테라피 및 100% 현장 후불제 운영.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 스웨디시 & 아로마 전문 안내. 최고급 오일을 사용한 부드러운 감성 힐링과 ${kw} 전신 근막 이완 솔루션을 만나보세요.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 24시간 예약 접수 중! ${dist} 전 지역 자택, 오피스텔, 호텔 방문 가능, 도착 후 결제하는 ${kw} 안전 정찰제.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 정통 건식 케어부터 딥티슈 림프 케어까지, ${dist} 전역 어디서나 25분 내 도착하는 ${kw} 안심 홈타이 플랫폼.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 런케어만의 고품격 서비스. 불필요한 예약금 없이 계신 곳에서 편안하게 전화 한 통으로 이용하는 ${kw} 1:1 바디케어.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 코스별 상세 시간과 비용 안내. ${dist} 전역 세부 동별 빠른 방문 배정과 친절한 ${kw} 테라피스트 케어를 약속합니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 100% 후불 결제 보장 안내. 사기 걱정 없는 투명한 예약 방식과 ${kw} 철저한 프라이버시 보호 시스템을 갖추고 있습니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 전문 매니저 대기 중! ${dist} 전역 평균 25분 내 도착, ${kw} 건식 스트레칭 및 아로마 테라피로 깊은 숙면을 유도합니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 고객 만족도 최우수 런케어마사지. ${dist} 생활권 맞춤 방문, 이동 시간 없이 내 공간에서 즐기는 ${kw} 힐링 스파.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 안심 정찰제 서비스. 추가금 없는 정직한 요금표와 선입금 0원 원칙으로 ${dist} 전 지역에서 편안하게 ${kw} 코스를 호출하세요.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 및 프라이빗 홈케어 안내. 긴장된 어깨와 허리 근육을 부드럽게 이완시켜 드리는 ${kw} 1:1 전담 맞춤 테라피.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 신속 예약 시스템! ${dist} 전 지역 24시간 실시간 배정, ${kw} 스웨디시·타이 코스를 현장 결제로 안심 이용하세요.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 런케어에서 전하는 바디 테라피 가이드. 100% 현장 결제와 25분 빠른 출동으로 ${kw} 최상의 컨디션 회복을 도와드립니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 편안한 휴식을 위한 선택! 번거로운 이동 없이 자택에서 즐기는 ${dist} 세심한 ${kw} 1:1 림프 순환 케어.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 안심 방문 가이드. ${city} ${dist} 어디든 선입금 없는 후불제로 신속하게 찾아가는 ${kw} 고품격 홈타이.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 정찰제 가격표 공개! 타이 60분부터 VIP 스페셜 코스까지 ${dist} 전 지역 25분 내 빠른 방문을 약속하는 ${kw} 안내.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 24시간 안심 호출 센터. 전문 테라피스트가 고객님의 공간으로 직접 방문하여 ${kw} 피로를 말끔히 덜어드립니다.`,
  (city: string, dist: string, kw: string) => `${dist} 출장마사지 런케어 공식 안내. ${dist} 전역 100% 현장 후불제, 25분 내 도착 보장, ${kw} 타이·아로마·스웨디시 맞춤 힐링.`,
];

function getDynamicDistrictInsight(districtName: string, cityName: string, seed: number) {
  const insightGroups = [
    {
      subtitle: `${cityName} ${districtName} 맞춤형 바디 밸런스 회복 및 근막 이완 웰니스 리포트`,
      sec1Title: "1. 고정 좌식 근무와 상체 근골격계 긴장의 역학적 기전",
      sec1Text: [
        `${cityName} ${districtName} 일대에서 사무 업무나 이동이 잦은 직장인들은 하루의 상당 시간을 모니터 앞에 앉아 보내며 상체 근골격계에 지속적인 부하를 받습니다. 특히 시선이 아래로 향하거나 턱을 앞으로 내미는 전방 두부 자세(거북목)는 경추를 지탱하는 후두하근과 상부 승모근, 견갑거근에 비정상적인 장력을 발생시킵니다. 이로 인해 어깨 윗선이 묵직해지고 혈류 순환이 제한되면서 뻐근한 두통과 안구 피로감이 동반되기 쉽습니다.`,
        `이러한 국소 부위의 만성 근막 긴장을 완화하려면 체온을 적정 수준으로 유지하여 모세혈관을 확장하고, 결을 따라 섬세한 수기 압을 가해 단축된 근섬유를 넓게 펴주는 이완 과정이 필요합니다. 연부조직의 혈류량이 증가하면 축적된 젖산과 대사 노폐물이 배출되어 신체 본래의 유연성과 편안한 가동 범위를 되찾을 수 있습니다.`
      ],
      sec2Title: "2. 신체 상태에 따른 건식 스트레칭과 오일 테라피의 기능적 차이",
      sec2Text: [
        `테라피를 선택할 때는 당일의 피로도와 신체 통증 양상에 맞춰 적절한 기법을 고르는 것이 안전하고 효과적입니다.`,
        `오일을 사용하지 않는 건식 타이 케어는 수동적 전신 스트레칭과 지압을 결합하여 굳어있던 관절의 가동 범위를 넓히고 햄스트링, 이상근, 척추기립근 등 큰 근육 무리를 시원하게 신전시키는 데 탁월합니다. 반면 스웨디시 및 아로마 테라피는 식물성 베이스 오일을 매개체로 마찰 저항을 줄이며 림프절을 자극하는 유러피언 기법입니다. 강한 자극 없이도 심신의 깊은 안정과 정서적 스트레스 해소, 붓기 관리를 동시에 누릴 수 있어 민감한 신체 상태에 최적화되어 있습니다.`
      ],
      sec3Title: "3. 독립된 1인 프라이빗 공간에서 누리는 심리적 안정 효과",
      sec3Text: [
        `테라피의 생리학적 효과를 온전히 누리기 위해서는 심리적 안정감이 필수적입니다. 외부 번화가 매장을 직접 방문할 때 겪는 도심 교통 체증, 주차 스트레스, 대기 시간은 무의식중에 스트레스 호르몬인 코르티솔 분비를 촉진할 수 있습니다.`,
        `자택이나 호텔 객실 등 독립된 사적 공간에서 진행되는 홈케어는 외부 소음과 시선이 완전히 차단되어 부교감신경계를 빠르게 활성화합니다. 세션 종료 후에도 번거로운 귀가 이동이나 환복 과정 없이 곧바로 아늑한 침상에서 깊은 수면으로 이어질 수 있어 피로 회복의 지속 시간이 훨씬 길어집니다.`
      ],
      sec4Title: "4. 안전하고 투명한 100% 현장 후불제 이용 수칙",
      sec4Text: [
        `${districtName} 일대에서 웰니스 서비스를 이용하실 때는 소비자의 안전을 보장하는 정찰제 원칙을 확인하시는 것이 좋습니다. 신뢰할 수 있는 공식 등록 파트너는 예약 명목의 불법 선입금을 일절 요구하지 않으며 투명한 현장 결제 기준을 엄격히 준수합니다.`,
        `또한 최근 디스크 시술 병력, 임신, 급성 염증 질환이 있는 경우에는 관리 시작 전 담당 힐러에게 컨디션을 명확히 전달하여 안전한 맞춤 압 조절을 진행하시길 권장합니다.`
      ]
    },
    {
      subtitle: `${cityName} ${districtName} 일상 스트레스 완화와 전신 림프 순환 디톡스 솔루션`,
      sec1Title: "1. 과중한 도심 스트레스와 자율신경계 불균형의 상관관계",
      sec1Text: [
        `${cityName} ${districtName} 생활권에서 바쁜 스케줄을 소화하다 보면 신체의 교감신경이 지속적인 긴장 상태에 머물게 됩니다. 자율신경계의 밸런스가 무너지면 말초 혈관이 수축하여 손발이 차가워지고 근육이 무의식중에 긴장 상태를 유지하여 신체 전반의 회복 능력이 저하됩니다.`,
        `정성 어린 감성 터치와 균일한 리듬의 수기 테라피는 감각 수용기를 안정적으로 자극하여 엔도르핀과 옥시토신 분비를 유도합니다. 뇌파가 각성 상태(베타파)에서 안정 상태(알파파)로 전환되면서 긴장되어 있던 중추신경계가 회복 국면으로 접어들고 자연스러운 활력을 되찾게 됩니다.`
      ],
      sec2Title: "2. 부종 완화와 신진대사 촉진을 위한 림프 배농 테라피",
      sec2Text: [
        `림프계는 체내 노폐물과 잉여 수분을 걸러내는 정화 시스템이지만 심장과 같은 자체 박동 펌프가 없습니다. 장시간 서 있거나 앉아 있는 생활로 인해 서혜부(사타구니)와 액와부(겨드랑이) 주변 림프절이 긴장되면 체액 순환이 정체되어 하체 붓기와 무거움증이 가중됩니다.`,
        `림프 순환 케어는 강한 지압을 지양하고 림프의 자연스러운 흐름 방향에 맞추어 피부층을 섬세하게 밀어 올리는 기법을 적용합니다. 정체되어 있던 체액이 원활하게 흡수 및 배출되면서 무겁고 둔탁했던 전신이 한결 가볍고 상쾌해지는 변화를 체감할 수 있습니다.`
      ],
      sec3Title: "3. 식물성 천연 에센셜 오일의 후각적 릴렉싱 메커니즘",
      sec3Text: [
        `에센셜 오일 테라피는 천연 식물 추출물의 유효 성분과 후각적 아로마콜로지 효과를 결합한 복합 힐링입니다. 실내에 은은하게 퍼지는 향기는 후각 신경을 통해 대뇌 변연계에 즉각 도달하여 감정적 불안과 긴장을 차분히 가라앉혀 줍니다.`,
        `동시에 호호바, 스위트 아몬드 등 고급 베이스 오일이 피부 표면에 촉촉한 보습막을 형성하여 건조한 환경으로부터 피부 장벽을 보호합니다. 몸의 긴장 완화와 피부 영양 공급을 동시에 완성하는 핵심 비결입니다.`
      ],
      sec4Title: "4. 건강한 테라피를 위한 수분 섭취와 사후 관리",
      sec4Text: [
        `세션을 마친 직후에는 림프 순환을 통해 체내로 배출된 대사 노폐물이 원활하게 배설될 수 있도록 미온수를 충분히 섭취해 주는 것이 좋습니다.`,
        `관리 당일은 과도한 음주나 격렬한 운동을 지양하고 따뜻한 실내 환경에서 충분한 수면을 취함으로써 근육의 미세 이완 효과를 오랜 시간 안정적으로 유지하시기 바랍니다.`
      ]
    },
    {
      subtitle: `${cityName} ${districtName} 근골격계 정렬 회복을 위한 체계적 심부근막 릴렉싱 분석`,
      sec1Title: "1. 보행 패턴과 골반 주변 지지근의 비대칭적 하중 해소",
      sec1Text: [
        `${cityName} ${districtName} 일대에서 잦은 도보 이동이나 계단 이용을 반복하는 경우 골반을 지지하는 중둔근, 이상근, 장요근에 불균형한 하중이 가해지기 쉽습니다. 특히 한쪽 다리에 체중을 싣는 짝다리 습관이나 다리를 꼬는 자세는 골반의 미세한 뒤틀림을 일으켜 허리 하부와 허벅지 뒤쪽 햄스트링까지 연쇄적인 당김과 통증을 유발합니다.`,
        `체계적인 바디 컨디셔닝은 겉 근육만을 문지르는 것이 아니라 골반과 척추를 지지하는 심부 기립근을 정밀하게 짚어냅니다. 틀어진 좌우 대칭 균형을 바로잡아 보행 시 하체 피로도를 현저히 낮추고 상쾌한 신체 정렬을 완성합니다.`
      ],
      sec2Title: "2. 만성 피로의 원인인 속근육 매듭을 다루는 딥티슈 테라피",
      sec2Text: [
        `오랜 기간 축적된 만성적인 결림은 표층 근육 아래 위치한 심부 근막에 단단한 통증 유발점(트리거 포인트)이 자리 잡고 있기 때문입니다. 가벼운 터치만으로는 도달하기 어려운 이 부위는 전문적인 딥티슈 기법으로 다루어야 합니다.`,
        `체중을 실은 일정한 지속 압력을 심부 조직까지 서서히 전달하여 굳어있던 근막 유착을 분리하고 정상적인 탄력을 회복시킵니다. 세션 직후 뻐근했던 허리와 등줄기 전체가 시원하게 개방되는 개운함을 경험하실 수 있습니다.`
      ],
      sec3Title: "3. 방문형 프라이빗 서비스가 제공하는 스마트한 시간 절약",
      sec3Text: [
        `바쁜 현대인에게 이동 시간을 아끼는 것은 가장 현명한 자기 관리 방식 중 하나입니다. 번화가의 주차난을 겪거나 대기 시간을 기다리는 피로를 덜어내고, 내가 원하는 시간에 프라이빗한 관리를 누릴 수 있습니다.`,
        `누구의 방해도 받지 않는 독립된 공간에서 진행되는 세션은 물리적 에너지 소모 없이 온전히 관리 자체에만 집중할 수 있는 최적의 쉼터를 제공합니다.`
      ],
      sec4Title: "4. 투명한 요금 체계와 품격 있는 힐링 문화",
      sec4Text: [
        `${SITE_NAME}은 공시된 정찰제 요금과 100% 현장 후불제 시스템을 기반으로 운영되어 이용자에게 어떠한 부당한 추가 요금도 청구하지 않습니다.`,
        `철저한 소독과 위생 관리를 준수하는 검증된 전문 관리사와 함께 ${districtName} 전역 어디서나 품격 높은 프라이빗 바디케어를 안심하고 누려보시기 바랍니다.`
      ]
    }
  ];

  return insightGroups[seed % insightGroups.length];
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
  const { city, district } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;

  const seedString = `${city}-${district}-runcare-district-v2026`;
  const patternIdx = getStableIndex(seedString, 30);
  const keyword = serviceKeywordPatterns[patternIdx];

  const finalTitle = DISTRICT_TITLE_TEMPLATES[patternIdx](cityName, districtName, keyword);
  const finalDescription = DISTRICT_DESCRIPTION_TEMPLATES[patternIdx](cityName, districtName, keyword);

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}`,
    },
    keywords: [
      `${districtName} 출장마사지`,
      `${districtName}출장마사지`,
      `${districtName} 홈타이`,
      `${districtName} 스웨디시`,
      `${cityName} ${districtName} 마사지`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const cityFullName = city.toLowerCase() === "seoul" ? "서울특별시" : city.toLowerCase() === "incheon" ? "인천광역시" : "경기도";
  const districtName = districtInfo ? districtInfo.name : district;

  const dongs = districtInfo?.dongs || [];
  const otherDistricts = Object.entries(region?.districts || {}).filter(([k]) => k !== district.toLowerCase());

  const shops: ShopItem[] = Object.entries(rawShopsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  const charSum = (cityName + districtName + city + district).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const insight = getDynamicDistrictInsight(districtName, cityName, Math.abs(charSum));

  const currentUrl = `${SITE_URL}/${city}/${district}`;

  // 🌟 네이버 및 구글 검색엔진 최적화 통합 @graph JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 빵가루 내비게이션
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
            "item": currentUrl
          }
        ]
      },
      // 2. 구 단위 로컬 비즈니스 상세
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${currentUrl}#business`,
        "name": `${cityName} ${districtName} 출장 케어 마사지 - ${SITE_NAME}`,
        "description": `${cityName} ${districtName} 전 지역 100% 안심 현장 후불제 출장 홈타이 및 바디케어 서비스 안내.`,
        "url": currentUrl,
        "telephone": SUPPORT_PHONE,
        "image": `${SITE_URL}/og-main.png`,
        "priceRange": "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": `${cityFullName} ${districtName}`
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": districtName,
          "addressRegion": cityFullName,
          "addressCountry": "KR"
        }
      },
      // 3. 제휴 샵 목록 ItemList
      {
        "@type": "ItemList",
        "@id": `${currentUrl}#partners`,
        "name": `${districtName} 추천 제휴 테라피 샵 목록`,
        "numberOfItems": shops.length,
        "itemListElement": shops.map((shop, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "HealthAndBeautyBusiness",
            "name": `${shop.name} (${districtName})`,
            "description": shop.desc,
            "telephone": shop.phone,
            "image": `${SITE_URL}${shop.image}`,
            "priceRange": shop.courses[0]?.items[0]?.price || "60,000원~",
            "paymentAccepted": "100% 현장 후불제"
          }
        }))
      },
      // 4. 구 단위 FAQ
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `${districtName} 전 지역 어디든 방문 가능한가요?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `네, ${districtName} 관내 모든 아파트, 주택, 오피스텔은 물론 비즈니스호텔 및 숙박시설까지 25분 내 신속하게 방문합니다.`
            }
          },
          {
            "@type": "Question",
            "name": "예약 후 도착까지 얼마나 걸리나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${districtName} 인근 상주 힐러 배정 시스템으로 예약 완료 시점 기준 평균 20~30분 이내 도착합니다.`
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 크롤러 수집용 SSR 시맨틱 블록 */}
      <div className="sr-only" aria-hidden="true">
        <h1>{cityName} {districtName} 출장 홈케어 마사지 &amp; 홈타이 안내</h1>
        <p>{cityName} {districtName} 전 지역 100% 안심 후불 정찰제 출장마사지 가이드 및 제휴점 코스 요금표.</p>
      </div>

      {/* 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-40 px-4 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs">런</span>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">{SITE_NAME}</span>
          </Link>
          <div className="flex items-center gap-2">
            <a href={`tel:${SUPPORT_PHONE}`} className="text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 py-1.5 rounded-xl hover:opacity-90">📞 24시 전화예약</a>
            <Link href={`/${city}`} className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30">&larr; {cityName} 전체</Link>
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
          <span className="text-gray-200">{districtName}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        {/* 인트로 배너 */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#141418] to-[#0a0a0c] p-6 md:p-8 space-y-3">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
            {cityName} {districtName} REGIONAL GUIDE
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            <span className="text-amber-400">{districtName}</span> 출장 홈케어 마사지 &amp; 홈타이 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {cityName} {districtName} 전 지역 자택, 오피스텔, 호텔 어디든 25분 내 빠른 방문을 약속합니다. 
            선입금 0원 100% 현장 결제 원칙으로 운영되는 검증된 제휴 파트너 정보를 확인하세요.
          </p>
        </section>

        {/* 관할 동 리스트 */}
        <section className="bg-[#121214] border border-white/10 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">📍</span> {districtName} 세부 관할 동별 안내 ({dongs.length}개 지역)
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {dongs.map((dongName, idx) => (
              <Link
                key={idx}
                href={`/${city}/${district}/${encodeURIComponent(dongName)}`}
                className="px-3.5 py-2 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                {dongName}
              </Link>
            ))}
          </div>
        </section>

        {/* 제휴 샵 리스트 */}
        <RandomDistrictShopList 
          initialShops={shops}
          districtName={districtName}
          city={city}
          district={district}
        />

        {/* 📚 네이버 상위 노출용 2,000자 전문 웰니스 칼럼 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              WELLNESS &amp; RECOVERY INSIGHT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {insight.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {cityName} {districtName} 고객님을 위한 신체 불균형 개선 원리와 테라피 선택 가이드
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
            * 본 가이드는 {cityName} {districtName} 지역 거주자 및 방문객 여러분의 올바른 신체 건강 상식과 투명한 테라피 서비스 이용을 돕기 위해 작성된 정보성 칼럼입니다.
          </div>
        </section>

        {/* 안심 방문 케어 특징 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">🛡️</span> {districtName} 안심 방문 케어 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 pt-2">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">사기 걱정 없는 100% 후불</span>
              <p className="text-gray-400 leading-relaxed">
                {districtName} 모든 제휴처는 예약금·선입금을 일체 요구하지 않으며 관리사 대면 후 결제합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">전문 테라피스트 직접 방문</span>
              <p className="text-gray-400 leading-relaxed">
                엄격한 테스트를 거친 베테랑 관리사가 청결한 매트와 최고급 오일을 직접 지참하여 방문합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">24시간 신속 배정</span>
              <p className="text-gray-400 leading-relaxed">
                주야간 및 심야 시간대에도 추가 할증 없이 {districtName} 전역 25분 내 빠른 이동이 가능합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 구 단위 FAQ */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">❓</span> {districtName} 출장마사지 자주 묻는 질문
          </h2>
          <div className="space-y-3 text-xs md:text-sm">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. {districtName} 전 지역 어디든 방문 가능한가요?</h3>
              <p className="text-gray-400 leading-relaxed">
                네, {districtName} 관내 모든 아파트, 주택, 오피스텔은 물론 비즈니스호텔 및 숙박시설까지 신속하게 방문합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. 예약 후 도착까지 얼마나 걸리나요?</h3>
              <p className="text-gray-400 leading-relaxed">
                {districtName} 인근 상주 힐러 배정 시스템으로 예약 완료 시점 기준 평균 20~30분 이내 도착합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 인접 구 연계 내부 링크 */}
        {otherDistricts.length > 0 && (
          <section className="bg-[#121214] border border-white/10 p-5 md:p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <h2 className="text-xs md:text-sm font-bold text-gray-300">
                📍 {cityName} 다른 시·구·군 보러가기
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {otherDistricts.slice(0, 12).map(([dKey, dVal]) => (
                <Link
                  key={dKey}
                  href={`/${city}/${dKey}`}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                >
                  {dVal.name} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-8 text-center text-xs text-gray-500 mt-20">
        <p className="font-bold text-gray-400">{SITE_NAME} · {cityName} {districtName} 100% 안심 후불제 출장 홈케어</p>
        <p className="text-[11px] text-gray-600 mt-1">© 2026 {SITE_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}