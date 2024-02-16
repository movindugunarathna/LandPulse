"use client";

import { register } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form className="flex flex-col items-center gap-6 p-8 bg-gray-100" action={formAction}>
      <input
        type="text"
        placeholder="username"
        name="username"
        className="p-4 bg-gray-200 text-gray-700 rounded"
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        className="p-4 bg-gray-200 text-gray-700 rounded"
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        className="p-4 bg-gray-200 text-gray-700 rounded"
      />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
        className="p-4 bg-gray-200 text-gray-700 rounded"
      />
      <button
        type="submit"
        className="p-4 cursor-pointer bg-blue-500 text-white font-bold rounded"
      >
        Register
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
