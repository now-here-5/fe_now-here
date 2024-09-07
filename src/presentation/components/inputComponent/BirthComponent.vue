<template>
  <div class="birthComponent">
    <div class="componentText_mention">
      <p1>생년월일</p1>
      <p2>매칭 카드에 표시될 나이를 자동 계산해 드릴게요.</p2>
    </div>
    <div class="numberContainer" @click="focusInput">
      <div
        v-for="(char, index) in 6"
        :key="index"
        class="numberInput"
        :class="{ filled: birthInput[index] }"
      >
        <p>{{ birthInput[index] || (index < 2 ? 'Y' : index < 4 ? 'M' : 'D') }}</p>
      </div>
    </div>
    <input
      ref="hiddenInput"
      type="tel"
      maxlength="6"
      class="hiddenInput"
      v-model="birthInput"
      @input="updateBirth"
    />
    <p v-if="birthAlertVisible">{{ birthAlertMessage }}</p>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})

const birthInput = ref(props.store.birth ? props.store.birth.replace(/-/g, '').slice(2) : '')
const hiddenInput = ref(null)
const birthAlertVisible = ref(false)
const birthAlertMessage = ref('')
const birthAlertInventory = ['01-12 사이의 값을 입력해주세요.', '올바른 날짜를 입력해 주세요.']

const focusInput = () => {
  nextTick(() => {
    hiddenInput.value.focus()
  })
}

const updateBirth = (event) => {
  let inputValue = event.target.value.replace(/\D/g, '').slice(0, 6)
  birthInput.value = inputValue

  const yearPart = inputValue.slice(0, 2)
  let monthPart = inputValue.slice(2, 4)
  let dayPart = inputValue.slice(4, 6)

  let isValid = true
  if (monthPart.length === 2) {
    const month = parseInt(monthPart, 10)
    if (month < 1 || month > 12) {
      inputValue = yearPart
      birthInput.value = inputValue
      birthAlertMessage.value = birthAlertInventory[0]
      isValid = false
    }
  }

  if (dayPart.length === 2 && isValid) {
    const month = parseInt(monthPart, 10)
    const day = parseInt(dayPart, 10)
    const maxDays = getMaxDaysInMonth(month)
    if (day < 1 || day > maxDays) {
      inputValue = yearPart + monthPart
      birthInput.value = inputValue
      birthAlertMessage.value = birthAlertInventory[1]
      isValid = false
    }
  }

  birthAlertVisible.value = !isValid

  if (inputValue.length === 6 && isValid) {
    const currentYear = new Date().getFullYear()
    const currentYearTwoDigits = currentYear % 100
    const userInputYear = parseInt(yearPart, 10)
    const century = userInputYear > currentYearTwoDigits ? '19' : '20'
    props.store.birth = `${century}${yearPart}-${monthPart}-${dayPart}`
    console.log('store Birth', props.store.birth)
  } else {
    props.store.birth = ''
  }
}

const getMaxDaysInMonth = (month) => {
  const currentYear = new Date().getFullYear()
  const yearPrefix = parseInt(birthInput.value.slice(0, 2)) > currentYear % 100 ? 1900 : 2000
  const fullYear = yearPrefix + parseInt(birthInput.value.slice(0, 2))
  const daysInMonth = {
    1: 31,
    2: isLeapYear(fullYear) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
  return daysInMonth[month] || 31
}

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
</script>

<style scoped lang="scss">
.birthComponent {
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0px 0px;
  gap: 10px;

  width: 100%;
  p {
    font-size: $textS_size;
    font-weight: $textS_weight;
    color: $red; /* 닉네임 중복 시 */
  }
}
.componentText_mention {
  display: flex;
  flex-direction: column;
  p1 {
    font-size: $textL_size;
    font-weight: $textB_weight;
    color: $dark;
  }
  p2 {
    font-size: $textMS_size;
    font-weight: $textS_weight;
    color: $gray;
  }
}
.numberContainer {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 325px;
  height: 55px;
}
.numberInput {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  gap: 10px;

  width: 45px;
  height: 55px;

  background: $light_gray;
  border: 1px solid $gray;
  border-radius: 5px;
  p {
    font-size: $textM_size;
    font-weight: $textB_weight;
    color: $gray;
  }
}
.numberInput.filled {
  background: $point;
  p {
    color: $white;
  }
}
.hiddenInput {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
