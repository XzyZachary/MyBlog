<template>
    <el-dropdown class="d2-mr">
        <span class="btn-text">你好 {{userName}}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOff">
                <z-icon name="power-off" class="d2-mr-5"/>
                注销
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState({
            userName: state => state.auth.name
        })
    },
    methods: {
        ...mapActions([
            'd2adminLogout'
        ]),
        logOff(){
            this.d2adminLogOut({
                vm: this,
                confirm: true
            })
        }
    }
}
</script>

<style>

</style>
