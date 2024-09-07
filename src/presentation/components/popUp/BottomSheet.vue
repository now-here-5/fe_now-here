<template>
  <div v-if="store_Login.bottomSheetVisible.agree" class="overlay" @click="closeBottomSheet('agree')">
    <div class="bottomSheet" @click.stop>
      <div class="bottomSheet_header">
        <p>약관 동의</p>
        <img @click="closeBottomSheet('agree')" src="@/assets/images/clear.png"/>
      </div>
      <div class="bottomSheet_contentContainer">
        <div class="bottomSheet_detailContainer">
          <p>회원가입을 위해 약관을 동의해주세요.</p>
        </div>
        <div class="bottomSheet_componentCotainer">
          <div class="subAgreeContainer">
            <div class="subAgree" :class="{ active: store_Login.agreeState.service }">
              <div class="agreeBtnS" @click="toggleSubAgree('service')"></div>
              <p>[필수] 서비스 약관 동의</p>
              <img class="arrowRight" src="@/assets/images/keyboard_arrowRight.png" @click="openTermBottomSheet('service')"/>
            </div>
            <div class="subAgree" :class="{ active: store_Login.agreeState.privacy }">
              <div class="agreeBtnS" @click="toggleSubAgree('privacy')"></div>
              <p>[필수] 개인정보 수집 및 이용 동의</p>
              <img class="arrowRight" src="@/assets/images/keyboard_arrowRight.png" @click="openTermBottomSheet('privacy')"/>
            </div>
            <div class="allAgree" :class="{ active: store_Login.agreeState.all }">
              <div class="agreeBtnL" @click="toggleAllAgree"></div>
              <p>전체 동의</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomSheet_bottom">
        <div class="agreeBtn" :class="{ active: store_Login.agreeState.service && store_Login.agreeState.privacy }" @click="navigateToSignUp">
          <p>확인</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="store_Login.bottomSheetVisible.terms" class="overlay" @click="closeBottomSheet('terms')">
    <div class="bottomSheet" @click.stop>
      <div class="bottomSheet_header">
        <p v-if="store_Login.termType === 'service'">서비스 약관</p>
        <p v-else-if="store_Login.termType === 'privacy'">개인정보 수집 및<br> 이용 동의</p>
        <img @click="closeBottomSheet('terms')" src="@/assets/images/clear.png"/>
      </div>
      <div class="bottomSheet_contentContainer">
        <div class="bottomSheet_detailContainer">
          <p2 v-if="store_Login.termType === 'service'">
            <br>1. 서비스 설명
            <br>  • 'Now, Here'는 특정 이벤트에 참여하는 사용자가 서로를 매칭하여 새로운 인연을 맺을 수 있도록 도와주는 온라인 매칭 서비스입니다. 이 서비스는 휴대폰 번호 인증을 통해 가입할 수 있으며, 닉네임, 생년월일, 성별, MBTI, 자기소개를 기입하여 서비스를 이용할 수 있습니다.            가입 및 이용 조건
            <br>2. 사용자는 정확한 정보를 제공해야 하며, 허위 정보 제공 시 서비스 이용이 제한될 수 있습니다.
            <br>  • 사용자는 언제든지 서비스에서 로그아웃하거나 탈퇴할 수 있으며, 탈퇴 시 모든 개인정보는 최대 7일 이내에 삭제됩니다.
            <br>3. 서비스 제공자의 책임
            <br>  • 서비스 제공자는 서비스의 안전성과 신뢰성을 유지하기 위해 최선을 다합니다. 천재지변, 해킹 등 불가항력적 사건으로 인한 서비스 중단, 데이터 손실 등에 대해서는 책임을 지지 않지만, 예정된 서비스 중단이나 점검 시 가능한 한 미리 사용자에게 공지합니다.
            <br>  • 이벤트가 종료되면 모든 사용자는 자동으로 탈퇴 처리되며, 그에 따라 사용자의 모든 개인정보는 삭제됩니다. 탈퇴 요청 후 개인정보는 최대 7일 이내에 삭제됩니다. 백업 데이터는 데이터 복구 목적으로 최대 3년 동안 보관될 수 있으며, 보관 기간이 끝나면 자동으로 영구 삭제됩니다.
            <br>4. 사용자의 의무
            <br>  • 사용자는 서비스 이용 중 다른 사용자의 권리를 침해하거나, 불법적인 행위를 해서는 안 됩니다.
            <br>  • 사용자는 서비스 내에서 타인의 개인정보를 수집, 저장, 공개하지 않습니다.
            <br>5. 서비스 이용 제한
            <br>  • 서비스 제공자는 사용자의 불법 행위, 약관 위반, 기타 부적절한 행위가 발견될 경우 서비스 이용을 제한하거나 중지할 수 있습니다.
            <br>6. 약관의 변경
            <br>  • 서비스 제공자는 필요에 따라 본 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력이 발생합니다. 사용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
          </p2>
          <p2 v-else-if="store_Login.termType === 'privacy'">
            <br>1. 수집하는 개인정보의 항목
            <br>  • 필수 항목: 닉네임, 생년월일, 성별, MBTI, 자기소개, 휴대폰 번호(인증용).
            <br>  • 추가 항목: 문의하기 또는 의견 남기기 기능을 통해 사용자가 자발적으로 제공하는 정보(예: 이메일 주소, 메시지 내용).
            <br>2. 개인정보 수집 및 이용 목적
            <br>  • 이벤트 내 사용자 매칭을 위한 기본 정보 제공.
            <br>  • 사용자 간의 원활한 소통과 매칭 서비스를 제공하기 위해 필요.
            <br>3. 개인정보 보유 및 이용 기간
            <br>  • 사용자가 탈퇴를 요청할 경우, 요청 후 최대 7일 이내에 탈퇴 처리 및 개인정보 삭제가 완료됩니다.
            <br>  • 이벤트가 종료되면 모든 사용자의 계정은 자동으로 탈퇴 처리되며, 개인정보는 삭제됩니다. 다만, 데이터 복구 목적으로 백업 데이터에 개인정보가 포함될 수 있으며, 이 경우 백업 데이터는 최대 3년 동안 보관된 후 영구적으로 삭제됩니다.
            <br>4. 개인정보의 보호
            <br>  • 수집된 개인정보는 SSL 암호화 기술을 통해 보호되며, 개인정보 접근은 최소화된 인원만 허용됩니다. (보안 조치 추가 필요, 개발자 의견 필요)
            <br>  • 백업 데이터는 데이터 복구를 위해 보관되며, 보관된 데이터는 철저한 보안 조치를 통해 보호됩니다.
            <br>5. 사용자의 권리
            <br>  • 사용자는 언제든지 자신의 개인정보에 대한 조회, 수정, 삭제를 요청할 수 있으며, 요청 시 최대 7일 이내에 처리됩니다.
            <br>  • 탈퇴 요청 시 개인정보는 최대 7일 이내에 삭제되며, 백업 데이터도 보유 기간이 지난 후 자동으로 삭제됩니다.
            <br>6. 개인정보 처리 방침의 변경
            <br>  • 본 개인정보 수집 및 이용 동의 내용이 변경될 경우, 변경된 내용을 공지하며, 사용자의 동의를 다시 받습니다.
          </p2>
        </div>
      </div>
      <div class="bottomSheet_bottom"></div>
    </div>
  </div>
</template>

<script setup>
import { loginStore } from '@/presentation/stores/loginStore.js';
import { useRouter } from 'vue-router';

const store_Login = loginStore();
const router = useRouter();

const closeBottomSheet = (type) => {
  store_Login.bottomSheetVisible[type] = false;
};

const toggleSubAgree = (type) => {
  store_Login.agreeState[type] = !store_Login.agreeState[type];

  // Update allAgree based on sub agrees
  store_Login.agreeState.all = store_Login.agreeState.service && store_Login.agreeState.privacy;
};
const toggleAllAgree = () => {
  store_Login.agreeState.all = !store_Login.agreeState.all;

  store_Login.agreeState.service = store_Login.agreeState.all;
  store_Login.agreeState.privacy = store_Login.agreeState.all;
};
const openTermBottomSheet = (type) => {
  store_Login.termType = type;
  store_Login.bottomSheetVisible.terms = true;
};

const navigateToSignUp = () => {
  if (store_Login.agreeState.service && store_Login.agreeState.privacy) {
    closeBottomSheet('agree');
    router.push('/signup/signup_mobileAuth');
  }
};
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
}

.bottomSheet {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 375px;
  height: auto;

  background: #FFFFFF;
  border-radius: 30px 30px 0px 0px;
}
.bottomSheet_header {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 28px 10px 28px;

  width: 375px;

  p {
    font-size: $textXXL_B;
    font-weight: $font_Bold;
    color: $dark;
  }
  img {
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
}
.bottomSheet_contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;


  width: 375px;
}
.bottomSheet_detailContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 28px;

  width: 375px;

  p {
    font-size: $textM;
    font-weight: $font_Regular;
    color: $dark;
  }
  p2 {
    font-size: $textXS;
    font-weight: $font_Regular;
    color: $dark;
  }
}
.bottomSheet_componentCotainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px 28px;
  gap: 10px;

  width: 375px;
}

.subAgreeContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  width: 315px;
}
.subAgree {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 10px 0px 0px;
  gap: 10px;

  width: 315px;
  height: 35px;

  p {
    font-weight: $font_Regular;
    font-size: $textMS;
    color: $gray;
    flex: 1;
  }
}
.subAgree.active p {
  color: $dark;
}
.agreeBtnS {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  position: relative;
  display: flex;
  background: $middle_gray;
}
.subAgree.active .agreeBtnS {
  background: $point; // 전체 동의 선택 시 색상
}
.agreeBtnS::after {
  content: '';
  display: block;
  width: 6px;
  height: 11px;
  border: solid $gray;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg); /* 체크마크를 45도 회전시켜 체크모양으로 만듭니다 */
  position: absolute; /* 위치를 절대값으로 지정하여 자유롭게 위치 조정이 가능하게 함 */
  top: 4.5px; /* 위쪽 여백 조정 */
  left: 8px; /* 왼쪽 여백 조정 */
}
.subAgree.active .agreeBtnS::after {
  border: solid $white;
  border-width: 0 2px 2px 0;
}
.arrowRight {
  width: 24px;
  height: 24px;
}
.allAgree {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px 0px 0px;
  gap: 10px;

  width: 315px;

  border-top: 2px solid #1C1C1C;
  p {
    font-size: $textXL_B;
    font-weight: $font_Bold;
    color: $dark;
    flex: 1;
  }
}
.agreeBtnL {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  display: flex;
  background: $middle_gray;
}
.allAgree.active .agreeBtnL {
  background: $point; // 전체 동의 선택 시 색상
}
.allAgree.active .agreeBtnL::after {
  border: solid $white;
  border-width: 0 3px 3px 0;
}
.agreeBtnL::after {
  content: '';
  display: block;
  width: 8px;
  height: 14px;
  border: solid $gray;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg); /* 체크마크를 45도 회전시켜 체크모양으로 만듭니다 */
  position: absolute; /* 위치를 절대값으로 지정하여 자유롭게 위치 조정이 가능하게 함 */
  top: 6px; /* 위쪽 여백 조정 */
  left: 10px; /* 왼쪽 여백 조정 */
}
.agreeBtn {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 315px;
  height: 50px;
  background-color: $middle_gray;
  border-radius: 7px;
  cursor: not-allowed;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $gray;
  }
}
.agreeBtn.active {
  background-color:  $point; // 모두 동의 시 활성화되는 버튼 색상
  cursor: pointer;
}
.agreeBtn.active p {
  color: $white;
}

.bottomSheet_bottom {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 29px;

  width: 375px;
  height: 70px;

  order: 2;
}
</style>
