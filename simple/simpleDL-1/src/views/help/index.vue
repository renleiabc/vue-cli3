/*
 * @Author: aFei
 * @Date: 2018-07-10 15:52:29
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-07-31 17:06:33
*/
<template>
    <transition name="fade-transform"
                mode="out-in">
        <router-view>
        </router-view>
    </transition>
</template>

<script>
export default {
  name: 'index'
}
</script>
