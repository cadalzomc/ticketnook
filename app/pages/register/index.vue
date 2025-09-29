<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <template #header>
        <ULink to="/" class="flex items-center justify-center space-x-2 mb-10">
          <AppLogo class="w-auto h-8" />
        </ULink>

        <UAuthForm
          title="Sign Up"
          description="Welcome aboard! Create an account to get started."
          :fields="fields"
          :providers="providers"
          :validate-on="[]"
          @submit="onSubmit"
          :submit="{
            label: 'Sign Up',
          }"
          :schema="zodLogin"
        />
      </template>

      <template #footer>
        <div class="flex flex-col justify-between text-sm">
          <span>
            Already have an account?
            <ULink to="/login"> Login </ULink>
          </span>
        </div>
      </template>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import type { FormSubmitEvent } from "@nuxt/ui";
import { type loginSchema, zodLogin } from "~/lib/zod";

const toast = useToast();

const fields = [
  {
    name: "name",
    type: "text" as const,
    label: "Fullname",
    placeholder: "Enter your name",
    required: true,
  },
  {
    name: "email",
    type: "text" as const,
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password" as const,
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "remember",
    label: "Remember me",
    type: "checkbox" as const,
  },
];

const providers = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    onClick: () => {
      toast.add({ title: "Google", description: "Login with Google" });
    },
  },
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    onClick: () => {
      toast.add({ title: "GitHub", description: "Login with GitHub" });
    },
  },
];

const onSubmit = (payload: FormSubmitEvent<loginSchema>) => {
  console.log("Submitted", payload);
};
</script>
