<template>
  <div class="view chat">
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ store.state.username }}</h1>
    </header>

    <section class="chat-box" ref="messageBody">
      <div
        v-for="message in store.state.messages"
        :key="message.key"
        :class="
          message.username == store.state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write a message..."
        />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted, ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import db from './../db';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const inputMessage = ref('');
    const messageBody = ref(null);

    const Logout = () => {
      store.username = '';
      router.replace('/login');
    };
    const handleSubmit = () => {
      const messagesRef = db.database().ref('messages');
      if (inputMessage.value === '' || inputMessage.value === null) {
        return;
      }
      const message = {
        username: store.state.username,
        content: inputMessage.value,
      };
      messagesRef.push(message);
      inputMessage.value = '';
    };
    watch(
      store.state.messages.length,
      () => {
        nextTick(() => {
          if (messageBody.value) {
            messageBody.value.scrollTop = messageBody.value.scrollHeight;
          }
        });
      },
      { deep: true, immediate: true }
    );
    onMounted(() => {
      const messagesRef = db.database().ref('messages');
      messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          });
        });
        store.state.messages = messages;

        setTimeout(() => {
          if (messageBody.value) {
            messageBody.value.scrollTop = messageBody.value.scrollHeight;
          }
        }, 200);
      });
    });

    return {
      store,
      messageBody,
      inputMessage,
      handleSubmit,
      Logout,
    };
  },
};
</script>

<style lang="scss">
.view {
  width: 44%;
  margin: auto;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;

  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #fff;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      overflow-y: scroll;
      scroll-behavior: smooth;
      max-height: 676px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type='text'] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

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

        input[type='submit'] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: #ea526f;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
