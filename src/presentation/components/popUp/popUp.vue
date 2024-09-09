<template>
  <div class="frame">
    <button class="selectBtn" @click="openSelectBottomSheet"><p>이벤트 선택 BS</p></button>
    <button class="selectBtn" @click="openAgreeBottomSheet"><p>약관 동의 BS</p></button>
    <button class="selectBtn" @click="openTermBottomSheet"><p>약관 상세 BS</p></button>
    <button class="selectBtn" @click="openAlertModal1"><p>휴대폰 중복 MS</p></button>
    <button class="selectBtn" @click="openAlertModal2"><p>인증번호 불일치 MS</p></button>
    <button class="selectBtn" @click="openAlertModal3"><p>닉네임 중복 MS</p></button>
    <button class="selectBtn" @click="openAlertModal4"><p>가입완료 MS</p></button>
    <button class="selectBtn" @click="openAlertModalL_matchLanding"><p>매치 랜딩 ML</p></button>
    <button class="selectBtn" @click="openAlertModalL_deleteAccount"><p>계정 삭제 ML</p></button>
    <button class="selectBtn" @click="openAlertModalL_review"><p>리뷰 ML</p></button>
    <button class="selectBtn" @click="openAlertModalL_heart"><p>하트 ML</p></button>
    <button class="selectBtn" @click="openAlertModalL_card"><p>카드 ML</p></button>
    <button class="selectBtn" @click="opentostM_review"><p>리뷰 T</p></button>
    <button class="selectBtn" @click="opentostM_inquiry"><p>문의하기 T</p></button>
  </div>

  <div v-if="selectBottomSheetVisible" class="BS_Overlay" @click="closeSlectBottomSheet">
    <div class="bottomSheet" @click.stop>
      <div class="bottomSheet_header">
        <p>이벤트 선택</p>
        <img @click="closeSlectBottomSheet" src="@/assets/images/clear.png"/>
      </div>
      <div class="bottomSheet_contentContainer">
        <div class="bottomSheet_detailContainer">
          <p>~ 님의 계정이 n개 확인되었어요!<br>현재 어떤 축제에 계신가요?</p>
        </div>
        <div class="bottomSheet_componentCotainer">
          <div class="listBtn" @click="toggleDropdown">
            <p>{{ nowEvent }}</p>
            <img
                :class="{ rotated: isRotated }"
                src="@/assets/images/keyboard_arrowDown.png"
            />
          </div>
          <ul v-if="isDropdownVisible" class="dropdown">
            <li
                v-for="event in eventList"
                :key="event"
                @click="selectEvent(event)"
                :class="{ selected: event === nowEvent }"
            >
              {{ event }}
            </li>
          </ul>
        </div>
      </div>
      <div class="bottomSheet_bottom">
        <div class="selectBtn" @click="closeSlectBottomSheet">
          <p>선택 완료</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="agreeBottomSheetVisible" class="BS_Overlay" @click="closeAgreeBottomSheet">
    <div class="bottomSheet" @click.stop>
      <div class="bottomSheet_header">
        <p>약관 동의</p>
        <img @click="closeAgreeBottomSheet" src="@/assets/images/clear.png"/>
      </div>
      <div class="bottomSheet_contentContainer">
        <div class="bottomSheet_detailContainer">
          <p>회원가입을 위해 약관을 동의해주세요.</p>
        </div>
        <div class="bottomSheet_componentCotainer">
          <div class="subAgreeContainer">
            <div
                class="subAgree"
                :class="{ active: agreeState.service }"
            >
              <div
                  class="agreeBtnS"
                  @click="toggleSubAgree('service')"
              ></div>
              <p>[필수] 서비스 약관 동의</p>
              <img
                  class="arrowRight"
                  src="@/assets/images/keyboard_arrowRight.png"
                  @click="openTermBottomSheet('service')"
              />
            </div>
            <div
                class="subAgree"
                :class="{ active: agreeState.privacy }"
            >
              <div
                  class="agreeBtnS"
                  @click="toggleSubAgree('privacy')"

              ></div>
              <p>[필수] 개인정보 수집 및 이용 동의</p>
              <img
                  class="arrowRight"
                  src="@/assets/images/keyboard_arrowRight.png"
                  @click="openTermBottomSheet('privacy')"
              />
            </div>
            <div
                class="allAgree"
                :class="{ active: agreeState.all }"
            >
              <div
                  class="agreeBtnL"
                  @click="toggleAllAgree"
              ></div>
              <p>전체 동의</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomSheet_bottom">
        <div
            class="agreeBtn"
            :class="{ active: agreeState.service && agreeState.privacy }"
            @click="navigateToSignUp"
        >
          <p>확인</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="termBottomSheetVisible" class="BS_Overlay" @click="closeTermBottomSheet">
    <div class="bottomSheet" @click.stop>
      <div class="bottomSheet_header">
        <p v-if="termType === 'service'">서비스 약관</p>
        <p v-else-if="termType === 'privacy'">개인정보 관련 약관</p>
        <img @click="closeTermBottomSheet" src="@/assets/images/clear.png"/>
      </div>
      <div class="bottomSheet_contentContainer">
        <div class="bottomSheet_detailContainer">
          <p v-if="termType === 'service'">
            본 서비스는 수집된 항목(이름, 이메일, 휴대폰)을 활용하여 앱 푸시, 문자메시지, 이메일 등
            다양한 채널을 통해 회사 혹은 제휴사의 상품, 서비스를 추천하거나 맞춤형 광고(신구 서비스 개발, 쿠폰, 이벤트 행사 등)를
            제공하고, 설문조사(서비스 품질 향상을 위한 고객 만족도 조사)를 수행합니다. 회사는 해당 업무를 수행하기 위하여 수탁사를
            활용할 수 있고, 이에 대해서는 개인정보 처리방침을 통해 확인이 가능합니다.
            <br>
            <br>
            회사는 앱위 정보의 수신을 거부하시는 때까지 위 목적으로 상기 정보를 보유 및 이용할 예정입니다.
            <br>
            <br>
            선택 사항에 동의하지 않으셔도 서비스 가입 및 이용이 가능하나, 동의하지 않을 경우 제공 가능한 관련 편의사항
            등(맞춤형 혜택 등)이 제한될 수 있습니다.
          </p>
          <p v-else-if="termType === 'privacy'">
            회사는 서비스 제공을 위하여 다음의 개인정보를 수집합니다. 수집된 개인정보는 서비스 제공 및 운영을 위한 목적으로만 사용됩니다.
            <br>
            <br>
            1. 수집 항목: 이름, 이메일, 휴대폰 번호
            <br>
            2. 수집 목적: 서비스 가입 및 이용, 고객 상담, 이벤트 참여
            <br>
            <br>
            회사는 개인정보 보호법 등 관련 법령을 준수하여 귀하의 개인정보를 보호합니다.
            <br>
            <br>
            동의하지 않으셔도 서비스 이용이 가능하나, 일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </div>
      </div>
      <div class="bottomSheet_bottom">
      </div>
    </div>
  </div>

  <div v-if="alertModalVisible1" class="M_Overlay">
    <div class="modalS">
      <div class="modalS_body">
        <div class="modalS_contentContainer">
          <div class="modalS_titleContainer">
            <p>알림</p>
          </div>
          <div class="modalS_detailContainer">
            <p>이미 가입된 휴대폰 번호입니다.<br>다시 한 번 확인해주세요.</p>
          </div>
        </div>
      </div>
      <div class="modalS_btn" @click="closeAlertModal1">
        <p>확인</p>
      </div>
    </div>
  </div>
  <div v-if="alertModalVisible2" class="M_Overlay">
    <div class="modalS">
      <div class="modalS_body">
        <div class="modalS_contentContainer">
          <div class="modalS_titleContainer">
            <p>알림</p>
          </div>
          <div class="modalS_detailContainer">
            <p>인증 번호가 일치하지 않습니다.<br>다시 입력해주세요.</p>
          </div>
        </div>
      </div>
      <div class="modalS_btn" @click="closeAlertModal2">
        <p>확인</p>
      </div>
    </div>
  </div>
  <div v-if="alertModalVisible3" class="M_Overlay">
    <div class="modalS">
      <div class="modalS_body">
        <div class="modalS_contentContainer">
          <div class="modalS_titleContainer">
            <p>알림</p>
          </div>
          <div class="modalS_detailContainer">
            <p>이미 사용 중인 닉네임입니다.<br>다른 닉네임을 지어주세요.</p>
          </div>
        </div>
      </div>
      <div class="modalS_btn" @click="closeAlertModal3">
        <p>확인</p>
      </div>
    </div>
  </div>
  <div v-if="alertModalVisible4" class="M_Overlay">
    <div class="modalS">
      <div class="modalS_body">
        <div class="modalS_contentContainer">
          <div class="modalS_imgContainer">
            <img class="modalS_img" src="@/assets/images/MBTI_Avatar/avatar_MBTI_Male/avatar_ENTJ_Male.jpg.png"/>
          </div>
          <div class="modalS_titleContainer">
            <p>ENTJ 심심한 너구리님<br>회원가입 완료</p>
          </div>
          <div class="modalS_detailContainer">
            <p>어떤 인연이 기다리고 있을까요?<br>지금 바로 만나보세요.</p>
          </div>
        </div>
      </div>
      <div class="modalS_btn" @click="closeAlertModal4">
        <p>확인</p>
      </div>
    </div>
  </div>

  <div v-if="modalL_matchLanding" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>잠깐! 꼭 확인해주세요.</p>
          </div>
          <img
            class="modalL_clearContainer"
            src="@/assets/images/clear.png"
            @click="closeAlertModalL_matchLanding"
          >
        </div>
        <div class="slider">
          <div class="slider">
            <div class="slides" :style="{ transform: `translateX(-${currentStep * 100}%)` }">
              <div v-for="(image, index) in images" :key="index" class="slide">
                <div class="modalL_imgContainer">
                  <img :src="image" class="modalL_img" />
                </div>
              </div>
            </div>
            <div class="slide-left-area" @click="prevSlide"></div>
            <div class="slide-right-area" @click="nextSlide"></div>
          </div>
        </div>
        <div class="modalL_detailContainer">
          <p v-html="currentText"/>
          <div class="modalL_progressComponent">
            <div
                v-for="(circle, index) in 3"
                :key="index"
                :class="{'modalL_circle': true, 'active-circle': index === currentStep}"
            />
          </div>
        </div>
      </div>
      <div class="modalL_btn">
        <div
            class="modalL_btnBg"
            :class="{ active: currentStep === 2 }"
            @click="currentStep === 2 ? closeAlertModalL_matchLanding() : null"
        >
          <p>동의하고 계속하기</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalL_deleteAccount" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>잠깐! 진짜 떠나시나요?..</p>
          </div>
          <div class="modalL_clearContainer">
          </div>
        </div>
        <div class="modalL_imgContainer">
          <img src="@/assets/images/Modal_Image/modal_Crying.png" class="modalL_img" />
        </div>
        <div class="modalL_detailContainer">
          <p>
            축제가 끝나면 자동 탈퇴 후,<br>
            개인정보가 파기됩니다.<br>
            벌써 떠나실 건가요?
          </p>
        </div>
      </div>
      <div class="modalL_btn">
        <div class="modalL_btnBg">
          <p>탈퇴하기</p>
        </div>
        <div class="modalL_btnBg active" @click="closeAlertModalL_deleteAccount">
          <p>돌아가기</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalL_review" class="M_Overlay">
    <div class="modalL">
      <div class="modalL_contentContainer">
        <div class="modalL_header">
          <div class="modalL_titleContainer">
            <p>
              1분만!<br>시간 내주실 수 있나요?
            </p>
          </div>
          <div class="modalL_clearContainer">
          </div>
        </div>
        <div class="modalL_imgContainer">
          <img src="@/assets/images/Modal_Image/modal_Mailbox.png" class="modalL_img" />
        </div>
        <div class="modalL_detailContainer">
          <p>
            이용해 주셔서 감사합니다.<br>
            서비스 개선을 위해<br>
            소중한 의견을 남겨주세요.
          </p>
        </div>
      </div>
      <div class="modalL_btn">
        <div class="modalL_btnBg">
          <p>싫어요</p>
        </div>
        <div class="modalL_btnBg active" @click="closeAlertModalL_review">
          <p>좋아요</p>
        </div>
      </div>
    </div>
  </div>



  <div v-if="tostM_review" class="tostM_space">
    <div class="mContainer" @click="closetostM_review">
      <p>소중한 의견을 주셔서 감사합니다!</p>
    </div>
  </div>
  <div v-if="tostM_inquiry" class="tostM_space">
    <div class="mContainer" @click="closetostM_inquiry">
      <p>문의 내용이 정상 접수되었습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import matchLandingMobile from '/images/Modal_Image/modal_mobile.png';
import matchLandingCouple from '/images/Modal_Image/modal_Couple.png';
import matchLandingNotification from '/images/Modal_Image/modal_Notification.png';

const selectBottomSheetVisible = ref(false); // 모달의 가시성을 제어하는 상태 변수
const nowEvent = ref('건국대학교'); // 현재 선택된 이벤트 서버에서 받아와야 함
const eventList = ref(['건국대학교', '서울대학교', '고려대학교']); // 서버에서 받아온 이벤트 리스트
const isDropdownVisible = ref(false); // 드롭다운 리스트의 가시성을 제어하는 상태 변수
const isRotated = ref(false); // 이미지를 회전시킬지 여부를 제어하는 상태 변수

const agreeBottomSheetVisible = ref(false);
const agreeState = ref({
  service: false, // [필수] 서비스 약관 동의
  privacy: false, // [필수] 개인정보 수집 및 이용 동의
  all: false      // 전체 동의
});

const termBottomSheetVisible = ref(false);
const termType = ref(''); // 어떤 약관을 클릭했는지를 저장

const alertModalVisible1 = ref(false);
const alertModalVisible2 = ref(false);
const alertModalVisible3 = ref(false);
const alertModalVisible4 = ref(false);

const modalL_matchLanding = ref(false);
const currentStep = ref(0); // 현재 슬라이드 위치 (0부터 시작)
const images = [matchLandingMobile, matchLandingCouple, matchLandingNotification];
const texts = [
  '매칭이 성사되면 서로의 전화번호를<br>동시에 공유해드립니다.',
  '매칭 후의 모든 연락과 만남은<br>사용자의 판단과 책임 하에 이뤄집니다.',
  '서비스 사용 전,<br>주의사항을 꼭 확인해주세요.'
];
// 현재 이미지와 텍스트를 상태에 따라 가져옴
const currentText = computed(() => texts[currentStep.value]);

const modalL_deleteAccount = ref(false);
const modalL_review = ref(false);
const modalL_heart = ref(false);
const modalL_card = ref(false);

const tostM_review = ref(false);
const tostM_inquiry = ref(false);

const openSelectBottomSheet = () => {
  selectBottomSheetVisible.value = true;
};
const closeSlectBottomSheet = () => {
  selectBottomSheetVisible.value = false;
};
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  isRotated.value = !isRotated.value;
};
const selectEvent = (event) => {
  nowEvent.value = event;
  toggleDropdown(); // 이벤트 선택 후 드롭다운을 닫음
};

const openAgreeBottomSheet = () => {
  agreeState.value = {
    service: false,
    privacy: false,
    all: false
  };
  agreeBottomSheetVisible.value = true;
};
const closeAgreeBottomSheet = () => {
  agreeBottomSheetVisible.value = false;
};
const toggleSubAgree = (type) => {
  agreeState.value[type] = !agreeState.value[type];
  // subAgree 모두가 true인 경우 allAgree도 true로 설정
  if (agreeState.value.service && agreeState.value.privacy) {
    agreeState.value.all = true;
  } else {
    agreeState.value.all = false;
  }
};
const toggleAllAgree = () => {
  agreeState.value.all = !agreeState.value.all;

  // allAgree가 true인 경우 subAgree 모두를 true로 설정
  agreeState.value.service = agreeState.value.all;
  agreeState.value.privacy = agreeState.value.all;
};

const openTermBottomSheet = (type) => {
  termType.value = type;
  termBottomSheetVisible.value = true;
};
const closeTermBottomSheet = () => {
  termBottomSheetVisible.value = false;
};

const openAlertModal1 = () => {
  alertModalVisible1.value = true;
};
const closeAlertModal1 = () => {
  alertModalVisible1.value = false;
};
const openAlertModal2 = () => {
  alertModalVisible2.value = true;
};
const closeAlertModal2 = () => {
  alertModalVisible2.value = false;
};
const openAlertModal3 = () => {
  alertModalVisible3.value = true;
};
const closeAlertModal3 = () => {
  alertModalVisible3.value = false;
};
const openAlertModal4 = () => {
  alertModalVisible4.value = true;
};
const closeAlertModal4 = () => {
  alertModalVisible4.value = false;
};

const openAlertModalL_matchLanding = () => {
  modalL_matchLanding.value = true;
};
const closeAlertModalL_matchLanding = () => {
  modalL_matchLanding.value = false;
};
const prevSlide = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
const nextSlide = () => {
  if (currentStep.value < images.length - 1) {
    currentStep.value++;
  }
};

const openAlertModalL_deleteAccount = () => {
  modalL_deleteAccount.value = true;
};
const closeAlertModalL_deleteAccount = () => {
  modalL_deleteAccount.value = false;
};

const openAlertModalL_review = () => {
  modalL_review.value = true;
};
const closeAlertModalL_review = () => {
  modalL_review.value = false;
};

const openAlertModalL_heart = () => {
  modalL_heart.value = true;
};
const closeAlertModalL_heart = () => {
  modalL_heart.value = false;
};

const openAlertModalL_card = () => {
  modalL_card.value = true;
};
const closeAlertModalL_card = () => {
  modalL_card.value = false;
};

const opentostM_review = () => {
  tostM_review.value = true;
};
const closetostM_review = () => {
  tostM_review.value = false;
};

const opentostM_inquiry = () => {
  tostM_inquiry.value = true;
};
const closetostM_inquiry = () => {
  tostM_inquiry.value = false;
};
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;

  height: 100vh;
}
.selectBtn {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 315px;
  height: 50px;
  background-color: $point;
  border-radius: 7px;
  cursor: pointer;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $white;
  }
}

/* BS 오버레이 */
.BS_Overlay {
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
/* BS */
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
  align-items: center;
  padding: 0px 28px;

  width: 375px;
  height: 90px;
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

.listBtn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  width: 315px;
  height: 45px;
  background: #ffffff;
  border: 2px solid #1c1c1c;
  border-radius: 10px;
  z-index: 20;
  position: relative;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $dark;
  }
  img {
    width: 26px;
    height: 26px;
  }
}
.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
.dropdown {
  list-style: none;
  padding: 0;
  margin: -25px 0 0 0;
  width: 315px;
  border: 2px solid #1c1c1c;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 10;
  position: relative;
}
.dropdown li {
  margin: 0 10px 0 10px;
  padding: 7px 0 7px 0;
  cursor: pointer;
  border-bottom: 1px solid $gray;
}
.dropdown li:first-child {
  margin: 15px 10px 0 10px;
  padding: 2px 0 3px 0;
}
.dropdown li:last-child {
  border-bottom: none;
}
.dropdown li:hover {
  background-color: $light_gray;
}
/* 선택된 항목에 대한 스타일 */
.selected:not(:last-child) {
  font-weight: $font_Bold;
  color: $point;
  border-bottom: 2px solid $point !important; /* 우선순위를 높이기 위해 !important 사용 */
}
.selected:last-child {
  font-weight: $font_Bold;
  color: $point;
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

/* modal 오버레이 */
.M_Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
/* modalS */
.modalS {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 205px;

  background: $white;
  border-radius: 12px;
}
.modalS_body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 12px;

  width: 100%;
}
.modalS_contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  border-radius: 12px;
}
.modalS_imgContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 17px 0px 0px;

  width: 100%;
}
.modalS_img {
  width: 150px;
  height: 150px;

  border: 3px solid #1C1C1C;
  border-radius: 8px;
}
.modalS_titleContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 17px 0px 0px;

  width: 100%;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $dark;
    text-align: center;
  }
}
.modalS_detailContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 205px;
  min-height: 65px;

  border-bottom: 1px solid $dark;
  p {
    font-size: $textS;
    font-weight: $font_Regular;
    color: $dark;
    text-align: center;
  }
}
.modalS_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 12px 12px;

  width: 100%;
  p {
    font-size: $textMS_B;
    font-weight: $font_Bold;
    color: $dark;
    cursor: pointer;
  }
}

/* modalL */
.modalL {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 250px;
}
.modalL_contentContainer {
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 100%;

  background: $white;
  border-bottom: 1px solid $dark;
  border-radius: 15px 15px 0px 0px;
}
.modalL_header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 10px 0px;

  width: 100%;
  height: 60px;
}
.modalL_titleContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0px 0px 0px 34px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $dark;
    text-align: center;
  }
}
.modalL_clearContainer {
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.modalL_imgContainer {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
}
.modalL_img {
  width: 150px;
  height: 150px;
}
.modalL_detailContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 20px;
  gap: 15px;

  width: 100%;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  p {
    font-size: $textS_B;
    font-weight: $font_Bold;
    color: $dark;
    text-align: center;
  }
}
.modalL_progressComponent {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  width: 55px;
}
.modalL_circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: $middle_gray;
}
.active-circle {
  background: $dark;
}
.modalL_btn {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;

  width: 100%;

  background: $white;
  border-radius: 0px 0px 15px 15px;
}
.modalL_btnBg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 40px;

  background: $middle_gray;
  border-radius: 12px;

  flex-grow: 1;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $gray;
  }
  &.active {
    background: $point; /* active 클래스가 있을 때의 배경 색상 */
    p {
      color: $white;
    }
  }
}
.modalL_btnBg.active {
  background: $point;
  cursor: pointer;
}
.modalL_btnBg.active p {
  color: $white;
}

.slider {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  justify-content: center;
}
.slides {
  display: flex;
  transition: transform 0.5s ease;
}
.slide {
  min-width: 100%;
}

.slide-left-area, .slide-right-area {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  cursor: pointer;
}
.slide-left-area {
  left: 0;
}
.slide-right-area {
  right: 0;
}

.card_L {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  background: $light_gray;
  box-shadow: 0px 1px 2px rgba($dark, 0.3), 0px 2px 6px 2px rgba($dark, 0.15);
  border-radius: 13px 13px 0 0 ;
}
.infoContainer {
  position: relative;

  width: 250px;
  height: 250px;
}
.scoreContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 80px;
  height: 64px;
  left: 170px;
  z-index: 10; /* imgContainer보다 위에 위치하도록 설정 */

  background: $point;
  box-shadow: 0px 8px 12px 6px rgba($dark, 0.15), 0px 4px 4px rgba($dark, 0.3);
  border-radius: 0px 12px 0px 7px;

  p1 {
    font-size: $textXXL_B;
    font-weight: $font_Bold;
    color: $white;
    text-align: center;

    line-height: 30pt;
  }

  p2 {
    font-size: $textMS_B;
    font-weight: $font_Bold;
    color: $white;
    text-align: center;

    line-height: 9pt;
  }
}

.detailContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  gap: 5px;

  position: absolute;
  width: 100%;
  height: 50%;
  top: 125px;

  background: linear-gradient(180deg, rgba($white, 0) 0%, #2E2E2E 100%);
  z-index: 5; /* imgContainer보다 위에 위치하도록 설정 */
}
.mbtiContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;


  background: $white;
  box-shadow: 0px 4px 4px rgba($dark, 0.25);
  border-radius: 5px;
  p {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: #1C1C1C;
  }
}
.nameContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 2px;

  width: 100%;
  p1 {
    font-size: $textM_B;
    font-weight: $font_Bold;
    color: $white;
    align-self: stretch;
    flex-grow: 0;
  }

  p2 {
    font-size: $textS;
    font-weight: $font_Regular;
    color: $white;
    align-self: stretch;
    flex-grow: 0;
  }
}

.imgContainer {
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  width: 250px;
  height: 250px;
  left: 0px;
  top: 0px;
  z-index: 1; /* 다른 요소들보다 아래에 위치 */
}
.MBTIimg {
  width: 250px;
  height: 250px;

  border-radius: 12px;
}

.contentContainer {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  border-radius: 8px;
}
.textContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 12px;

  height: 64px;

  background: $white;
  box-shadow: 0px 1px 2px rgba($dark, 0.3), 0px 1px 3px 1px rgba($dark, 0.15);
  border-radius: 0px 0px 10px 10px;

  p {
    font-size: $textS_B;
    font-weight: $font_Bold;
    color: #1C1C1C;

    display: flex;
    align-items: center;

    align-self: stretch;
    flex-grow: 1;
  }
}

.tostM_space {
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 135px;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.mContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;

  height: 45px;

  background: $white;
  border-radius: 15px;
  border: 3px solid $point;

  align-self: stretch;
  flex-grow: 0;
  p {
    color: $dark;
    font-size: $textMS_B;
    font-weight: $font_Bold;
    text-align: center;
  }
}
</style>