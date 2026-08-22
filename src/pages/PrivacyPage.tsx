import { LegalPage } from './LegalPage';

/**
 * 개인정보처리방침 — docs/legal/privacy-policy.md 이식.
 * ⚠️ 정정: 원문의 "FASHN/Kling"은 실제 확정 엔진(Google Gemini)과 불일치 →
 *    실제 데이터 흐름에 맞춰 Google로 수정(투명성 원칙·심사 정확성).
 */
export function PrivacyPage({ showChrome = true }: { showChrome?: boolean }) {
  return (
    <LegalPage title="개인정보처리방침" showChrome={showChrome}>
      <h2>1. 수집하는 정보</h2>
      <ul>
        <li><strong>계정 정보</strong>: 이메일, 로그인 제공자(Google/Apple).</li>
        <li><strong>프로필</strong>: 키, 몸무게, 체형 (가상 착용 정확도 향상 목적).</li>
        <li>
          <strong>이미지</strong>: 가상 착용에 사용하는 인물 사진·옷 사진은 <strong>서버에 저장하지 않고</strong>
          AI 생성에만 즉시 사용됩니다. 저장되는 것은 생성된 결과 이미지뿐입니다.
        </li>
        <li><strong>이용 데이터</strong>: 생성 기록, 크레딧/결제 내역, 오류 로그.</li>
      </ul>

      <h2>2. 이용 목적</h2>
      <ul>
        <li>가상 착용(AI 이미지 생성) 서비스 제공.</li>
        <li>결제/크레딧 관리, 부정사용 방지.</li>
        <li>서비스 개선 및 오류 진단.</li>
      </ul>

      <h2>3. 제3자 제공 / 처리위탁</h2>
      <ul>
        <li>
          <strong>AI 처리</strong>: 인물·옷 사진은 가상 착용 생성을 위해 AI 이미지 생성
          제공자(Google Gemini)로 전송·처리되며, 처리 후 서버에 저장되지 않습니다.
          결과 이미지만 저장됩니다.
        </li>
        <li><strong>인프라</strong>: Supabase(데이터 저장/인증), 앱스토어(결제), Google AdMob(광고).</li>
        <li>위 외 목적으로 개인정보를 판매하지 않습니다.</li>
      </ul>

      <h2>4. 보관 및 삭제</h2>
      <ul>
        <li><strong>원본 사진 미저장</strong>: 인물·옷 사진은 서버에 저장하지 않으며, AI 생성 직후 폐기됩니다.</li>
        <li>
          <strong>계정 삭제</strong>: 설정 → 계정 삭제 시 계정·사진·생성물·결제기록이 영구
          삭제됩니다(되돌릴 수 없음). <a href="#account-deletion">계정·데이터 삭제 방법 안내</a>.
        </li>
        <li>법령상 보관 의무가 있는 결제 기록 등은 해당 기간 동안 보관 후 파기.</li>
      </ul>

      <h2>5. 이용자 권리</h2>
      <ul>
        <li>열람·정정·삭제·처리정지 요청 가능.</li>
        <li>앱 내 삭제 경로 제공(스토어 정책 준수).</li>
      </ul>

      <h2>6. 아동 보호</h2>
      <ul>
        <li>만 14세 미만(또는 관할 최소연령) 미만 이용 금지.</li>
        <li>미성년자·비동의 인물 이미지 업로드 금지.</li>
      </ul>

      <h2>7. 보안</h2>
      <ul>
        <li>전송 구간 HTTPS, 저장되는 결과 이미지는 비공개 버킷 + 서명 URL(만료).</li>
        <li>금전/크레딧 로직은 서버(원장 기반, 멱등)로만 처리.</li>
      </ul>
    </LegalPage>
  );
}
