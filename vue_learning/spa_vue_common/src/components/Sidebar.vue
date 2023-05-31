<template>
    <aside>
        <div class="logo">
            <img :src="logo" alt="logo">
        </div>
        Sidebar
    </aside>
</template>

<script setup>
import logo from "../assets/vue.svg"
</script>

<style lang="scss" scoped>
aside{
    display: flex;
    flex-direction: column;
    // width:var(--sidebar-width);
    width: calc(2rem + 32px); // 2倍padding+icon 宽度
    min-height:100vh;
    overflow: hidden;
    padding: 1rem;

    background-color: var(--dark);
    color: var(--light);

    transition: 0.2s ease-out;

    .logo{
        margin-bottom: 2rem;
        img{
            width: 2rem;
        } ;
    }



    @media (min-width: 768px) {
        position:fixed;
        z-index:99;
    }

}
</style>
