import { LegalPage } from './LegalPage';
import { SITE, COMPANY } from '../constants/site.shared.mjs';

/**
 * 계정·데이터 삭제 안내 — 스토어 필수 페이지(앱 밖에서도 삭제 경로 고지).
 * 앱 delete-account Edge Function 연계. iOS/Android 삭제 경로 명시.
 */
export function AccountDeletionPage() {
  return (
    <LegalPage title="계정·데이터 삭제">
      <p>
        {SITE.name}은(는) 사용자가 언제든 계정과 관련 데이터를 삭제할 수 있도록 지원합니다.
        삭제는 되돌릴 수 없으며, 아래 데이터가 영구 삭제됩니다.
      </p>

      <h2>삭제되는 데이터</h2>
      <ul>
        <li>계정 정보(이메일, 로그인 연동)</li>
        <li>프로필(키·몸무게·체형)</li>
        <li>업로드한 인물·옷 사진 및 생성된 결과 이미지</li>
        <li>생성 기록, 크레딧 잔액</li>
      </ul>
      <p>
        단, 법령상 보관 의무가 있는 결제 기록 등은 관련 법정 기간 동안 보관 후 파기됩니다.
      </p>

      <h2>앱에서 삭제하기</h2>
      <ul>
        <li>앱 실행 → <strong>설정</strong> → <strong>계정 삭제</strong> 선택</li>
        <li>안내에 따라 확인하면 삭제 요청이 접수되어 처리됩니다.</li>
      </ul>

      <h2>스토어 구독 해지</h2>
      <p>
        계정 삭제와 별개로, 진행 중인 구독은 각 스토어에서 해지해야 추가 청구가 발생하지 않습니다.
      </p>
      <ul>
        <li><strong>iOS</strong>: 설정 → Apple 계정 → 구독 → {SITE.name} → 구독 취소</li>
        <li><strong>Android</strong>: Play 스토어 → 프로필 → 결제 및 정기 결제 → 정기 결제 → {SITE.name} → 구독 취소</li>
      </ul>

      <h2>이메일로 삭제 요청</h2>
      <p>
        앱에 접근할 수 없는 경우, 가입한 이메일 주소로{' '}
        {COMPANY.email ? <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> : '고객센터'}에
        삭제를 요청하실 수 있습니다. 본인 확인 후 처리됩니다.
      </p>
    </LegalPage>
  );
}
