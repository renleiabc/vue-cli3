/*
 * @Author: aFei
 * @Date: 2018-08-22 15:03:38
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 16:35:10
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
