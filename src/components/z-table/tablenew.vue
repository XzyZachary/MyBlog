<template>
    <div>
        <div class="search">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search"
                v-model="keyword" @keydown.enter.native="getList"></el-input>
            <el-button type="primary" icon="el-icon-search" :loading="loading"
                @click="getList">搜索</el-button>
        </div>
        <el-table ref="multipleTable" :data="list" tooltip-effect="dark"
         stripe border>
            <el-table-column type="index" width="55" align="center"
                header-align="center" :index="increment"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="!item.hidden &&
            !item.filters" v-for="(item,index) in headerOptions" :key="index"
            :label="itam.label" :prop="item.prop"
            :header-align="item.headerAlign" :align="item.align"
            :sortable="item.sort" :min-width="item.minWidth || 150" >
                <template slot-scope="scopr">
                    <div v-if="scope.column.property == 'IsActive'">{{scope.row[scope.column.property]?'是':'否'}}</div>
                    <div v-else-if="scope.column.property == 'releaseTime'">{{scope.row[scope.column.property] | parseTime('{y}--{m}--{d}')}}</div>
                    <div v-else-if="scope.column.property.indexOf('Date') >= 0">{{scope.row[scope.column.property] | parseTime('{y}--{m}--{d}')}}</div>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip v-else-if="!item.hidden && 
            item.filters" :key="index" :label="item.label" :prop="item.prop" 
            :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"
            :filter-method="filterTage" :filters="item.filters" :min-width="item.minWidth || 200">
                <template slot-scope="scope">
                    <el-tag class="tag" type="primary" close-transition v-for="(tag,index) in scope.row.type" :key="index" >
                        {{tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pageination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageindex"
            :page-sizes="size_scoped"
            :page-size="pagesize"
            layout="total,sizes,prev,pager,next,jumer"
            :total="DataTotal"></el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return{
            keyword: '',
            editShow:false,
            loading:false,
            pageindex:1,
            pagesize:10,
            size_scoped:[10,20,30,40],
            headerOptions:[],
            multipleSelection:[]
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        increment(index){
            return index + 1+ ((this.pageindex - 1)* this.pagesize)
        },
        close(){
            this.editShow = false;
            this.getList()
        },
        handleSizeChange(val){
            this.pagesize = val
            this.getList()
        },
        handleCurrentChange(val){
            this.pageindex = val
            this.getList()
        },
        async getList(){
            this.loading = true
            try{
                await this.$store.dispatch(this.getMethod,{
                    keyword: this.keyword,
                    pageindex: this.pageindex,
                    pagesize: this.pagesize
                })
                this.loading = false
            }catch(e){
                this.loading = false
            }
        },
        del(scope){
            this.$confirm('此操作将删除该文件，是否继续操作?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning',
                center: true
            }).then(async () => {
                try{
                    await this.$store.dispatch(this.delMethod, scope.row._id)
                    this.list.splice(scope.$index, 1)
                }catch(e){}
                this.$message({
                    type:'success',
                    message: '删除成功'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message:'已取消删除'
                })
            })
        },
        edit(scope){
            this.editShow = true
            scope.row.releaseTime = new Date(scope.row.releaseTime)
            this.info = scope.row
        }

    }
}
</script>

<style>

</style>
