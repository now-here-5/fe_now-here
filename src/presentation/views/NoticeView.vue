<template>
  <div class="notice-container">
    <div class="normal-header">
      <img src="/images/backspace.png" @click="router.push('/')" />
      <span class="title">알림</span>
    </div>
    <div class="notice-content">
      <template v-if="notificationList.length">
        <div
          v-for="(item, idx) in notificationList"
          :key="idx"
          class="notice-item"
          @click="routeTo(item.title)"
        >
          <span class="notice-item__title">{{ item.title }}</span>
          <span class="notice-item__desc">{{ item.content }}</span>
          <img src="/images/navigate_next.png" />
        </div>
      </template>
      <div class="no-content" v-else>
        <span class="title">새로운 알림이 없어요...</span>
        <span class="desc">활발한 매칭을 시도해보세요!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMatchingStore } from '../stores/matchingStore'
import { useRouter } from 'vue-router'

const notificationList = ref([])
const matchingStore = useMatchingStore()
const router = useRouter()

const routeTo = (title) => {
  if (title === '받은 하트') router.push('/match/received-hearts')
  else if (title === '매칭 성공!') router.push('/match/status')
}

onMounted(async () => {
  const res = await matchingStore.getMatchingNotificationList()
  notificationList.value = res
})
</script>

<style lang="scss">
.normal-header {
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  img {
    position: absolute;
    left: 0;
    width: 30px;
    cursor: pointer;
  }
  .title {
    font-size: $textXL_size;
    font-weight: $Bold_weight;
  }
}
.notice-container {
  width: 100%;
  padding-bottom: 20px;

  .notice-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: auto;
    /* background-color: aliceblue; */
    margin-top: 10px;

    .notice-item {
      width: 100%;
      height: 85px;
      background-color: $light_gray;
      border-radius: 11px;
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: center;
      padding: 20px;
      cursor: pointer;

      &__title {
        font-size: $textM_size;
        font-weight: $Bold_weight;
      }
      img {
        position: absolute;
        right: 15px;
        width: 24px;
      }
    }
  }

  .no-content {
    display: flex;
    height: calc(80vh - 60px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      font-size: $textXXL_size;
      font-weight: $Bold_weight;
    }
  }
}
</style>
