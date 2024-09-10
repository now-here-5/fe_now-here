<template>
  <div
    v-if="popupStore.bottomSheetVisible.terms"
    class="overlay"
    @click="closeBottomSheet('terms')"
  >
    <div class="bottomSheet" @click.stop>
      <div class="header">
        <span v-if="popupStore.termType === 'service'">서비스 약관</span>
        <span v-else>개인정보 수집 및<br/>이용 동의</span>
        <img @click="closeBottomSheet('terms')" src="/images/clear.png" alt="clear"/>
      </div>
      <div class="contentContainer">
        <div class="descContainer">
          <span v-if="popupStore.termType === 'service'" class="title">
            1. 서비스 설명
            <br />
            <span class="indent">
              • 'Now, Here'는 특정 이벤트에 참여하는 사용자가 서로를 매칭하여 새로운 인연을
              맺을 수 있도록 도와주는 온라인 매칭 서비스입니다.
              이 서비스는 휴대폰 번호 인증을 통해 가입할 수 있으며,
              닉네임, 생년월일, 성별, MBTI, 자기소개를 기입하여 서비스를 이용할 수 있습니다.
            </span>
            <br />2. 가입 및 이용 조건 <br />
            <span class="indent">
              • 사용자는 정확한 정보를 제공해야 하며,
              허위 정보 제공 시 서비스 이용이 제한될 수 있습니다.
            </span>
            <br />
            <span class="indent">
            • 사용자는 언제든지 서비스에서 로그아웃하거나 탈퇴할 수 있으며,
              탈퇴 시 모든 개인정보는 최대 7일 이내에 삭제됩니다.
            </span>
            <br />
            3. 서비스 제공자의 책임
            <br />
            <span class="indent">
              • 서비스 제공자는 서비스의 안전성과 신뢰성을 유지하기 위해 최선을 다합니다.
              천재지변, 해킹 등 불가항력적 사건으로 인한 서비스 중단, 데이터 손실 등에 대해서는
              책임을 지지 않지만, 예정된 서비스 중단이나 점검 시 가능한 한 미리 사용자에게 공지합니다.
            </span>
            <br />
            <span class="indent">
              • 이벤트가 종료되면 모든 사용자는 자동으로 탈퇴 처리되며,
              그에 따라 사용자의 모든 개인정보는 삭제됩니다.
              탈퇴 요청 후 개인정보는 최대 7일 이내에 삭제됩니다.
              백업 데이터는 데이터 복구 목적으로 최대 3년 동안 보관될 수 있으며,
              보관 기간이 끝나면 자동으로 영구 삭제됩니다.
            </span>
            <br />
            4. 사용자의 의무
            <br />
            <span class="indent">
              • 사용자는 서비스 이용 중 다른 사용자의 권리를 침해하거나,
              불법적인 행위를 해서는 안됩니다.
            </span>
            <br />
            <span class="indent">
              • 사용자는 서비스 내에서 타인의 개인정보를 수집, 저장, 공개하지 않습니다.
            </span>
            <br />
            5. 서비스 이용 제한
            <br />
            <span class="indent">
              • 서비스 제공자는 사용자의 불법 행위, 약관 위반, 기타 부적절한 행위가 발견될 경우
              서비스 이용을 제한하거나 중지할 수 있습니다.
            </span>
            <br />
            6. 약관의 변경
            <br />
            <span class="indent">
              • 서비스 제공자는 필요에 따라 본 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력이 발생합니다.
              사용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
            </span>
          </span>
          <span v-else-if="popupStore.termType === 'privacy'" class="title">
            1. 수집하는 개인정보의 항목
            <br />
            <span class="indent">
              • 필수 항목: 닉네임, 생년월일, 성별, MBTI, 자기소개, 휴대폰 번호(인증용).
            </span>
            <br />
            <span class="indent">
              • 추가 항목: 문의하기 또는 의견 남기기 기능을 통해 사용자가 자발적으로 제공하는 정보(예: 이메일 주소, 메시지 내용).
            </span>
            <br />
            2. 개인정보 수집 및 이용 목적
            <br />
            <span class="indent">
              • 이벤트 내 사용자 매칭을 위한 기본 정보 제공.
            </span>
            <br />
            <span class="indent">
              • 사용자 간의 원활한 소통과 매칭 서비스를 제공하기 위해 필요.
            </span>
            <br />
            3. 개인정보 보유 및 이용 기간
            <br />
            <span class="indent">• 사용자가 탈퇴를 요청할 경우, 요청 후 최대 7일 이내에 탈퇴 처리 및 개인정보 삭제가
              완료됩니다.
            </span>
            <br />
            <span class="indent">
              • 이벤트가 종료되면 모든 사용자의 계정은 자동으로 탈퇴 처리되며,
              개인정보는 삭제됩니다. 다만, 데이터 복구 목적으로 백업 데이터에 개인정보가 포함될 수 있으며,
              이 경우 백업 데이터는 최대 3년 동안 보관된 후 영구적으로 삭제됩니다.
            </span>
            <br />
            4. 개인정보의 보호
            <br />
            <span class="indent">
              • 수집된 개인정보는 SSL 암호화 기술을 통해 보호되며,
              개인정보 접근은 최소화된 인원만 허용됩니다. (보안 조치 추가 필요, 개발자 의견 필요)
            </span>
            <br />
            <span class="indent">
              • 백업 데이터는 데이터 복구를 위해 보관되며, 보관된 데이터는 철저한 보안 조치를 통해 보호됩니다.
            </span>
            <br />
            5. 사용자의 권리
            <br />
            <span class="indent">
              • 사용자는 언제든지 자신의 개인정보에 대한 조회, 수정, 삭제를 요청할 수 있으며,
              요청 시 최대 7일 이내에 처리됩니다.
            </span>
            <br />
            <span class="indent">
              • 탈퇴 요청 시 개인정보는 최대 7일 이내에 삭제되며,
              백업 데이터도 보유 기간이 지난 후 자동으로 삭제됩니다.
            </span>
            <br />
            6. 개인정보 처리 방침의 변경
            <br />
            <span class="indent">
              • 본 개인정보 수집 및 이용 동의 내용이 변경될 경우, 변경된 내용을 공지하며,
              사용자의 동의를 다시 받습니다.
            </span>
          </span>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script setup>
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const popupStore = usePopupStore()

const closeBottomSheet = (type) => {
  popupStore.bottomSheetVisible[type] = false
}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: auto;
  background: $white;
  border-radius: 30px 30px 0 0;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 28px 10px 28px;
  width: 375px;
  span {
    font-size: $textXXL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  img {
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
}
.contentContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
}
.descContainer {
  display: flex;
  align-items: flex-start;
  padding: 0 28px;
  height: 400px;
  width: 375px;
  overflow-y: auto;
  .title {
    font-size: $textM_size;
    font-weight: $textS_weight;
    color: $dark;
  }
  .indent {
    padding-left: 10px;
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $dark;
  }
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 29px;
  width: 375px;
  height: 70px;
}
</style>
