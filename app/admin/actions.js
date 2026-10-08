"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/auth";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect(`/admin/login?error=${encodeURIComponent("Email dan password wajib diisi.")}`);
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.toString(),
    password: password.toString(),
  });

  if (error) {
    redirect(
      `/admin/login?error=${encodeURIComponent(
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : error.message
      )}`
    );
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createAdminClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

