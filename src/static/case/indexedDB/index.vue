<template>
    <div class="content">
        <div class="end">
            <el-input v-model="searchName" placeholder="请输入需要查询的姓名" />
            <div>
                <el-button @click="addUser" type="success" circle :icon="Plus" />
                <el-button @click="getList" type="primary" circle :icon="Search" />
            </div>
        </div>
        <el-table :data="tableData" :border="baseConfig.isBorder">
            <el-table-column v-if="baseConfig.isSelected" type="selection" width="55" />
            <el-table-column :="col" v-for="(col,index) in tableCol" :key="index" />
            <el-table-column v-if="baseConfig.isEvent" label="操作" :align="baseConfig.eventAligin">
                <template #default="{row}">
                    <el-button type="primary" :icon="Edit" circle @click="updateRow(row)" />
                    <el-button type="danger" :icon="Delete" circle @click="deleteRow(row)" />
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="showForm" width="500px" :title="isEdit?'编辑':'新增'">
            <el-form :model="userForm" ref="formRef" label-width="120px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="userForm.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="userForm.sex">
                        <el-option value="男">男</el-option>
                        <el-option value="女">女</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm" type="primary" class="ml30" :icon="Promotion" circle></el-button>
                    <el-button @click="reset" class="ml30" :icon="Refresh" circle></el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
    
<script setup>
// 插件
import { Plus, Edit, Delete, Search, Promotion, Refresh } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { ElMessage } from "element-plus";
// 自己的方法
import { add, read, readAll, update, remove, getDB , searchByName} from './index'

// ====================table基础配置开始==========================>
const baseConfig = {
    isBorder: true,
    isSelected: true,
    isEvent: true,
    eventAligin: 'center'
}
// table列
const tableCol = [
    { label: 'ID', prop: 'id', width: 60, align: 'center' },
    { label: '姓名', prop: 'name', width: 'auto', align: 'center' },
    { label: '年龄', prop: 'age', width: 'auto', align: 'center' },
    { label: '性别', prop: 'sex', width: 'auto', align: 'center' }
]
const tableData = ref([])
// <====================table基础配置结束==========================

// ======================form基础配置开始==========================>
const userForm = reactive({
    age: '',
    name: '',
    sex: '男'
})

const formRef = ref(null)
const showForm = ref(false)
const isEdit = ref(false)
const editId = ref(null)
// <======================form基础配置结束==========================

// 获取列表信息
const searchName = ref('')
const getList = () => {
    if(searchName.value){
        searchByName(searchName.value).then(res=>{
            tableData.value = [res]
        })
    }else{
        readAll().then(res => {
            tableData.value = res
        })
    }

}

// 由于indexedDB是异步的，可能此时并没有加载完成。所以使用事件当其加载完成的时候去执行getList()
const timer = setInterval(() => {
    if (getDB()) {
        getList()
        clearInterval(timer)
    }
}, 1000)

// 删除
const deleteRow = row => {
    remove(row.id).then(res => {
        ElMessage.success("删除成功");
        getList()
    })
}

// 新增
const addUser = () => {
    isEdit.value = false
    showForm.value = true
    userForm.age = ''
    userForm.name = ''
    userForm.sex = ''
}

// 编辑
const updateRow = row => {
    isEdit.value = true
    showForm.value = true
    userForm.age = row.age
    userForm.name = row.name
    userForm.sex = row.sex
    editId.value = row.id
}

const submitForm = () => {
    if (isEdit.value) {
        update({ ...userForm, id: editId.value }).then(res => {
            ElMessage.success("编辑成功");
            getList()
        }).catch(err => {
            ElMessage.error("编辑失败");
            console.log(err);
        }).finally(() => {
            showForm.value = false
        })
    } else {
        add(userForm).then(res => {
            getList()
            ElMessage.success("新增成功");
        }).catch(err => {
            console.log(err);
            ElMessage.error("新增失败");
        }).finally(() => {
            showForm.value = false
        })
    }

}

// 重置表单
const reset = () => formRef.value.resetFields()
</script>

<style scoped>
.content{
    padding:0 20px;
}
.end {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
}

.end .el-input{
    width: 300px;
}

.el-select {
    width: 100%;
}

.ml30 {
    margin-left: 30px;
}
</style>