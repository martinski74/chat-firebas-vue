<template>
  <div class="login">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to FireChat</h1>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Please enter your username..."
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const inputUsername = ref("");
    const store = useStore();
    const router = useRouter();

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        store.dispatch("setUser", inputUsername.value);
        router.replace("/home");
      }
    };

    return {
      inputUsername,
      Login,
    };
  },
};
</script>

<style lang="scss">
.login {
  width: 44%;
  margin: auto;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;
  align-items: center;
  .login-form {
    display: block;
    width: 100%;
    padding: 15px;

    .form-inner {
      display: block;
      background-color: #fff;
      padding: 50px 15px;
      border-radius: 16px;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
      h1 {
        color: #aaa;
        font-size: 28px;
        margin-bottom: 30px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        color: #aaa;
        font-size: 16px;
        transition: 0.4s;
      }
      input[type="text"] {
        appearance: none;
        border: none;
        outline: none;
        background: none;
        display: block;
        width: 100%;
        padding: 10px 15px;
        border-radius: 8px;
        margin-bottom: 15px;

        color: #333;
        font-size: 18px;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
        background-color: #f3f3f3;
        transition: 0.4s;
        &::placeholder {
          color: #888;
          transition: 0.4s;
        }
      }
      input[type="submit"] {
        appearance: none;
        border: none;
        outline: none;
        background: none;
        display: block;
        width: 100%;
        padding: 10px 15px;
        background-color: #ea526f;
        border-radius: 8px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
      }
      &:focus-within {
        label {
          color: #ea526f;
        }
        input[type="text"] {
          background-color: #fff;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
          &::placeholder {
            color: #666;
          }
        }
      }
    }
  }
}
</style>
