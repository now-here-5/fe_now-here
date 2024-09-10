<template>
  <div class="frame">
    <BackspaceHeader :title="type === 'inquiry' ? '문의하기' : '의견 남기기'" />
    <main class="body">
      <div class="textComponent">
        <div class="titleDesc">
          <span class="title" v-if="type === 'inquiry'">휴대폰 번호</span>
          <span class="title" v-else>별점 등록</span>
          <span class="desc" v-if="type === 'inquiry'">
            답변받을 휴대폰 번호를 입력해주세요.
          </span>
          <span class="desc" v-else>Now Here를 이용해 주셔서 감사합니다.<br/>
            서비스 개선을 위해 소중한 의견을 남겨주세요.
          </span>
        </div>
        <input
          v-if="type === 'inquiry'"
          class="componentInquiry"
          type="tel"
          placeholder="010-0000-0000"
          v-model="phoneNumber"
          @input="handlePhoneNumberInput"
          maxlength="13"
        />
        <div v-if="type === 'feedback'" class="componentFeedback">
          <img
            v-for="n in 5"
            :key="n"
            :src="n <= rate ? starFilled : starUnfilled"
            alt="star"
            class="star"
            @click="setRating(n)"
          />
        </div>
      </div>
      <div class="titleInput">
        <span v-if="type === 'inquiry'">문의 내용</span>
        <span v-else>의견 작성</span>
        <div class="inputContainer">
          <textarea
            class="input"
            :placeholder="type === 'inquiry' ? '문의 내용을 작성해주세요.' : '내용을 작성해주세요.'"
            v-model="contents"
            @input="formContents"
          />
          <span>{{ contents.length }}/30</span>
        </div>
      </div>
    </main>
    <footer class="bottom">
      <SelectBtn
        :isActive="Active"
        buttonText="작성완료"
        @click="handleSubmit"
      />
    </footer>
  </div>
</template>

<script setup>
import BackspaceHeader from '@/presentation/components/BackspaceHeader.vue'
import SelectBtn from '@/presentation/components/SelectBtn.vue'
import starFilled from '/images/star_filled.png'
import starUnfilled from '/images/star.png'
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { formPhoneNumber } from '@/Composition/FormNumber.js'
import { useInteractionStore } from '@/presentation/stores/interactionStore.js'
import { usePopupStore } from '@/presentation/stores/popupStore.js'

const route = useRoute()
const router = useRouter()
const type = route.params.type
const interactionStore = useInteractionStore()
const popupStore = usePopupStore()
const phoneNumber = ref(interactionStore.number)
const contents = ref(interactionStore.textContent || '')
const rate = ref(0)
const Active = ref(false)

const setRating = (rating) => {
  interactionStore.rate = rate.value = rating;
}
const handlePhoneNumberInput = () => {
  phoneNumber.value = formPhoneNumber(phoneNumber.value)
  interactionStore.inquiry_Num = phoneNumber.value
}
const formContents = () => {
  interactionStore.textContent = contents.value
}
const handleSubmit = async () => {
  const isSuccess = await interactionStore.sendInteraction(type)
  if (isSuccess) {
    router.back() // 3초 후에 뒤로 가기
    setTimeout(() => {
      popupStore.tostMessage.visible = false
    }, 3000)
  }
}
watch([phoneNumber, contents, rate], () => {
  if (type === 'inquiry') {
    Active.value = phoneNumber.value.length === 13 && contents.value.length > 0
  } else {
    Active.value = contents.value.length > 0 && rate.value > 0
  }
})
onMounted(() => {
  contents.value = interactionStore.textContent = ''
  interactionStore.rate = 0
  interactionStore.inquiry_Num = ''
})
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px 25px;
  height: 100vh;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0;
  gap: 30px;
  width: 100%;
}
.textComponent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}
.titleDesc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
  .title {
    font-size: $textXL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  .desc {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $dark;
  }
}
.componentInquiry {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 36px;
  border: none;
  border-bottom: 1px solid $gray;
  border-radius: 0;
  outline: none;
  font-size: $textL_size;
  font-weight: $textB_weight;
  &::placeholder {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.componentFeedback {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
}
.star {
  width: 55px;
  height: 55px;
}
.titleInput {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  span {
    font-size: $textXL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
}
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  width: 100%;
  span {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
}
.input {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 12px;
  gap: 10px;
  width: 100%;
  height: 180px;
  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  outline: none;
  resize: none;
  font-size: $textM_size;
  font-weight: $textS_weight;
  &::placeholder {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $gray;
    text-align: left; // 가로 정렬을 왼쪽으로 설정
  }
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  height: 110px;
}
@media only screen and (max-width: 767px) {
  .body {
    height: 520px;
  }
}
@media only screen and (min-width: 767px) {
  .body {
    align-self: stretch;
    flex-grow: 1;
  }
}
</style>