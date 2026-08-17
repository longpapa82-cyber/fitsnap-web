/**
 * 표시용 가격 — 앱 products.ts 값 미러링(앱-웹 정보 일치).
 * ⚠️ 웹은 홍보용이라 결제 안 함(다운로드 유도). 앱 가격 변경 시 여기도 갱신.
 * 실제 청구는 스토어 로케일 가격. 여기 값은 참고 표시용.
 */

export const SUBSCRIPTIONS = [
  {
    title: '주간',
    priceLabel: '$4.99',
    period: '주',
    perks: ['매일 넉넉한 생성', '고해상도', '워터마크 제거', '우선 처리'],
    trialDays: 3,
    isLead: true,
  },
  {
    title: '월간',
    priceLabel: '$9.99',
    period: '월',
    perks: ['매일 넉넉한 생성', '고해상도', '워터마크 제거', '우선 처리'],
  },
  {
    title: '연간',
    priceLabel: '$39.99',
    period: '년',
    perks: ['무제한(공정사용)', '프리미엄 전체', '월 환산 최저가'],
    anchorNote: '주간 대비 ~85% 절약',
  },
];

export const CREDIT_PACKS = [
  { title: 'Starter', credits: 50, priceLabel: '$4.99' },
  { title: 'Popular', credits: 120, priceLabel: '$9.99' },
  { title: 'Pro', credits: 300, priceLabel: '$19.99' },
];
