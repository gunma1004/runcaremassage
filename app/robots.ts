import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://runcaremassage.netlify.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 관리자 페이지나 API 라우트 등 크롤러 수집 제외 경로가 있다면 주석 해제 후 지정
      // disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}