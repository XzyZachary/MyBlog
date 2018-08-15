<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
            <el-form-item  prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-circle-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码">
                <i slot="prepend" class="fa fa-keyboard-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input type="text" v-model="formLogin.code" placeholder="- - - -">
                <template slot="prepend">验证码</template>
                <template slot="append">
                  <img class="login-code" src="./image/login-code.png">
                </template>
              </el-input>
            </el-form-item>
            <el-button @click="submit" type="primary" class="button-login">登录</el-button>
          </el-form>
        </el-card>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单
      formLogin: {
        username: "admin",
        password: "123456",
        code: "v9am"
      },
      // 校验
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登陆信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isHidden = true;
          this.$store
            .dispatch("auth/Login", {
              username: this.formLogin.username,
              password: this.formLogin.password
            })
            .then(() => {
              console.log('登陆成功')
              this.$router.push({ name: "index" });
            })
            .catch(err => {
              console.log(err);
              this.isHidden = false;
              this.error = false;
              switch (err) {
                case -1:
                   this.$message.error("用户名不存在");
                  break;
                case -2:
                   this.$message.error("密码错误");
                  break;
              }
            });
        } else {
          // 登陆表单校验失败
          this.$message.error("表单校验失败");
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
