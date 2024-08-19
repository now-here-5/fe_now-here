<template>
  <h1>매칭</h1>
  <nav>
    <router-link to="/match" class="tab">매칭</router-link>
    <router-link to="/match/sent-hearts" class="tab">보낸 하트</router-link>
    <router-link to="/match/received-hearts" class="tab">받은 하트</router-link>
    <router-link to="/match/status" class="tab">매칭 현황</router-link>
  </nav>

  <!-- 하위 라우터에서 설정된 컴포넌트들이 여기에 렌더링됨 -->
  <router-view></router-view>
</template>

<script setup></script>
<style scoped>
/* 임시 css */
.tab {
  margin-right: 20px;
  text-decoration: none;
  color: black;
}
.tab.router-link-exact-active {
  font-weight: bold;
  color: blue;
}
</style>
