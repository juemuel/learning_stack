<template>
    <div class="app">
      <Sidebar />
      <router-view />
    </div>
</template>
<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<style lang="scss" scoped>
:root{
  --primary: #aade8e;
  --grey: #64748b;
  --dark:#1e293b;
  --dark-alt: #334155;
  --light:#609fde;
  --sidebar-width: 380px;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background: var(--light);
}
// button{
//   cursor: pointer;
//   appearance: none;
//   border: none;
//   outline:none;
//   background:none;
// }
.app{
  display: flex;
  main{
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width:768px) {
      padding: 6rem;
    }
  }
}

</style>
