<template>
    <el-dropdown class="d2-mr">
        <span class="btn-text">你好 {{authname}}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOff">
                <z-icon name="power-off" class="d2-mr-5"/>
                注销
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapState, mapActions,mapGetters} from 'vuex'
export default {
    computed: {
       ...mapGetters(["authname"])
    },
    methods: {
        ...mapActions([
            'adminLogout'
        ]),
        logOff(){
            this.adminLogout({
                vm: this,
                confirm: true
            })
        }
    }
}
</script>

<style>

</style>
