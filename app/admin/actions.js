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

export async function gantiPassword(formData) {
  const supabase = await createAdminClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const passwordBaru = formData.get("password_baru");
  const konfirmasiPassword = formData.get("konfirmasi_password");

  if (!passwordBaru || passwordBaru.length < 8) {
    redirect(
      `/admin/password?error=${encodeURIComponent(
        "Password baru minimal 8 karakter."
      )}`
    );
  }

  if (passwordBaru !== konfirmasiPassword) {
    redirect(
      `/admin/password?error=${encodeURIComponent(
        "Konfirmasi password tidak cocok."
      )}`
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordBaru.toString(),
  });

  if (error) {
    redirect(`/admin/password?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/admin/password?success=${encodeURIComponent(
      "Password berhasil diganti."
    )}`
  );
}
