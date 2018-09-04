<template>
    <el-dialog :title="dialogtitile" :visible.sync="dialogTableVisible" class="edit-warpper" @close="close" width="80%">
        <el-form :model="BlogInfo" :rules="rules" ref="form" label-width="100px" class="form">
            <el-form-item label="类型" prop="type">
                <el-select v-model="BlogInfo.type" multiple clearable placeholder="请选择类型" class="block">
                    <el-option v-for="item in blogTypes" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <el-input type="text" v-model="BlogInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="desc">
                <el-input type="textarea" v-model="BlogInfo.desc"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="markdown">
                <!-- <el-input type="textarea" v-model="BlogInfo.markdown"></el-input> -->
            </el-form-item>
            <el-form-item label="级别" prop="album">
                 <el-select v-model="BlogInfo.level" placeholder="请选择级别" class="block">
                    <el-option v-for="item in [1,2,3,4,5,6]" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="releaseTime">
                <el-date-picker class="block" v-model="BlogInfo.releaseTime" type="date" placeholder="选择时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否可见" prop="isVisible" class="left-item">
                <el-switch v-model="BlogInfo.isVisible"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')" :loading="loading">更新</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['info','dialogtitile'],
    data() {
        return{
            BlogInfo :Object,
            dialogTableVisible:true,
            loading: false,
            rules: {
                type: [
                    { required: true, message:'请选择至少一个文章类型',trigger: 'change',type: 'array'}
                ],
                title: [
                    {required: true, message: '请填写文章标题', trigger:'blur'}
                ],
                desc: [
                    { required: true,message:'请填写文章描述', trigger:'blur'}
                ],
                markdown: [
                    {required: true, message:'请填写文章内容', trigger: 'blur'}
                ],
                releaseTime: [
                    { required: true,message:'请选择文章发布时间',trigger: 'change',type:'date'}
                ]
            }
        }
    },
    mounted() {
        let _BlogInfo = JSON.parse(JSON.stringify(this.info));
        _BlogInfo.releaseTime = new Date(_BlogInfo.releaseTime)
        // let _BlogInfo =Objehis.info));
        this.BlogInfo = _BlogInfo
    },
    methods: {
        close() {
            //console.log('23123')
            this.$emit('close')
        },
        submitForm(formName) {
            this.loading = true
            this.$refs[formName].validate( async (valid) => {
                console.log(valid);
                if(valid){
                    try{
                        this.BlogInfo.html = this.BlogInfo.markdown
                        await this.$store.dispatch('updateBlog', this.BlogInfo)
                        this.loading = false
                        this.close()
                    }catch(e){
                        this.loading = false
                    }
                }else{
                    console.log('error submit')
                     this.loading = false
                    return false
                }
            })
        }
    },
    computed: {
        ...mapGetters([
            'blogTypes'
        ])
    }

}
</script>

<style lang="less" scoped>

.edit-warpper{
    .block{
        width: 100%;
        display: block
    }
    .submit{
        width: 100px
    }
}

</style>
