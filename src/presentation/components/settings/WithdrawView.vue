<template>
  <main class="body">
    <div class="titleDesc">
      <span class="title">탈퇴 사유</span>
      <span class="desc">
        회원 탈퇴 시, 등록된 정보가 모두 삭제되며,<br />
        삭제된 정보는 복구할 수 없습니다.
      </span>
    </div>
      <div class="componentInput">
        <textarea
          class="input"
          placeholder="내용을 작성해주세요."
          v-model="contents"
          @input="formContents"
        />
        <span>{{ contents.length }}/30</span>
      </div>
  </main>
  <footer class="bottom">
    <SelectBtn :isActive="Active" buttonText="작성 완료" @click="handleSubmit" />
  </footer>
</template>

<script setup>
import SelectBtn from '@/presentation/components/SelectBtn.vue'
import { ref, watch } from 'vue'
import { useSettingStore } from '@/presentation/stores/settingStore.js'

const settingStore = useSettingStore()

const contents = ref('') // 문의 내용 추가
const Active = ref(false)

const handleSubmit = async () => {
  await settingStore.deleteAccount()
}
const formContents = () => {
  settingStore.textContent = contents.value
}
watch([contents], () => {
  Active.value = contents.value.length > 0
})
</script>

<style scoped lang="scss">
.body {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 15px 0;
  gap: 30px;
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
.componentInput {
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
  padding: 12px;
  width: 100%;
  height: 180px;
  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  resize: none;
  font-size: $textM_size;
  font-weight: $textS_weight;
  color: $dark;
  &::placeholder {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $gray;
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
/* 모바일 장치에 적용할 스타일 */
@media only screen and (max-width: 767px) {
  .body {
    height: 520px;
  }
}
/* 데스크톱에 적용할 스타일 */
@media only screen and (min-width: 767px) {
  .body {
    align-self: stretch;
    flex-grow: 1;
  }
}
</style>
