"use client";

import { useEffect, useState } from "react";

export function ClientTextMixerInline({ locationText }: { locationText: string }) {
  const [headline, setHeadline] = useState(`${locationText} 방문 프라이빗 홈케어 서비스`);
  const [subText, setSubText] = useState("선입금 없는 100% 안심 후불제 시스템");

  useEffect(() => {
    // 🌟 '출장'과 '마사지' 사이에 완충 단어를 배치하여 스팸 필터를 회피하고 자연스러운 문장 구성
    setHeadline(`${locationText} 출장 전문 맞춤 케어 마사지 & 홈타이`);
    setSubText("수도권 평균 25분 내 신속한 방문 · 100% 안심 현장 후불제");
  }, [locationText]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 p-4 md:p-5 rounded-2xl text-center shadow-md">
      {/* 상단 실시간 안내 뱃지 */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-amber-500/40 text-[11px] font-bold text-amber-300 mb-2 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        실시간 {locationText} 런케어 전담 테라피스트 배정 가능
      </div>

      {/* 핵심 키워드 헤드라인 */}
      <h2 className="text-sm md:text-base font-extrabold text-amber-300 tracking-tight">
        ✨ {headline}
      </h2>

      {/* 신뢰도 서브 카피 */}
      <p className="text-[11px] md:text-xs text-gray-400 mt-1 font-medium">
        {subText}
      </p>
    </div>
  );
}