<template>
  <div class="container">{{ errorText }}</div>
</template>

<script>
const map = {
  403: '无权限',
  404: '页面不存在',
}
export default {
  name: 'Error',
  computed: {
    errorText() {
      return map[this.$route.params.type] || '未知错误'
    },
  },
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
}
</style>
