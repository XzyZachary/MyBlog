<template>
    <el-dialog :title="dialogtitile" :visible.sync="dialogTableVisibel" class="edit-warpper" @close="close" width="80%">
        <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
            <el-form-item></el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>
