"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShopItem } from "./RandomDistrictShopList";

interface Props {
  initialShops: ShopItem[];
  fullLocation: string;
  city: string;
  district: string;
  dong: string;
}

export default function RandomShopList({
  initialShops,
  fullLocation,
  city,
  district,
  dong,
}: Props) {
  const [shops, setShops] = useState<ShopItem[]>(initialShops);

  // 새로고침 시 무작위 순서 셔플
  useEffect(() => {
    const shuffled = [...initialShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, [initialShops]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
          <span>✨</span> {fullLocation} 제휴 홈 테라피 파트너
        </h2>
        <span className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          실시간 100% 현장 후불제
        </span>
      </div>

      <div className="space-y-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/50 rounded-3xl p-5 md:p-6 transition-all shadow-lg group relative"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {shop.badge}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    실시간 방문 예약 가능
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                  {shop.name}
                </h3>

                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  {shop.desc}
                </p>

                {/* 특징 태그: shop.features?.map 및 조건부 렌더링으로 undefined 완벽 방어 */}
                {shop.features && shop.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {shop.features.map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] bg-black/50 text-gray-300 px-2.5 py-1 rounded-md border border-white/10 font-medium"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 가격 정보 및 예약 연결 */}
              <div className="flex md:flex-col items-center md:items-end justify-between border-t border-white/5 md:border-0 pt-4 md:pt-0 shrink-0 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-gray-500 block">
                    기본 코스 요금
                  </span>
                  <span className="text-base md:text-lg font-black text-amber-400">
                    {shop.courses[0]?.items[0]?.price || "상담 안내"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${shop.phone}`}
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>📞</span> 전화 예약
                  </a>
                  <Link
                    href={`/${city}/${district}/${encodeURIComponent(dong)}/shop/${shop.id}`}
                    className="bg-white/5 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 text-gray-300 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-white/10 transition-all whitespace-nowrap"
                  >
                    상세보기 &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}