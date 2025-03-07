"use client";
import { SignInForm } from "@/components/signInForm";
import { useSearchParams } from "next/navigation";
import ErrorCard from "@/components/cards/errorCard";
import { useState, useEffect } from "react";

export default function SignInPage() {
  const params = useSearchParams();
  const errorParam = params.get("error");
  const [showError, setShowError] = useState(!!errorParam);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorParam) {
      setErrorMessage(errorParam.replaceAll("+", " "));
      setShowError(true);
    }
  }, [errorParam]);

  function dismissError() {
    setShowError(false);
  }

  return (
    <>
      {showError && (
        <ErrorCard title="Authentication Error" message={errorMessage} onDismiss={dismissError} />
      )}
      <SignInForm />
    </>
  );
}
