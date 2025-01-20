<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form class="card-body" @submit="handleLogin">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered"
              v-model="form.username"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="form.password"
              required
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const auth = useAuthStore()
const form = ref<{ username: string; password: string }>({
  username: '',
  password: '',
})
const handleLogin = async (e: Event) => {
  try {
    e.preventDefault()
    const { success, message } = await auth.login({ ...form.value })
    if (!success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
      return
    }
    router.push('/')
  } catch (error) {
    console.error('Error logging in:', error)
  }
}
</script>

<style scoped></style>
