'use client';

import { Sociality } from '@/components/container/sociality';
import { Card } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components/loginForm';
import { RegisterForm } from '@/features/auth/components/registerForm';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Auth() {
  const params = useSearchParams();
  const isRegister = params.get('register');
  const [isLoginPage, setIsLoginPage] = React.useState(!isRegister);

  const toggleForm = () => {
    setIsLoginPage((prev) => !prev);
  };
  return (
    <Card className='z-50 w-full max-w-86.25 sm:max-w-111.5 sm:gap-5 lg:gap-6'>
      <Sociality />
      <h1 className='sm:text-display-xs text-neutral-25 text-center text-xl font-bold -tracking-[0.02rem] sm:tracking-normal'>
        {isLoginPage ? 'Welcome Back!' : 'Register'}
      </h1>

      {isLoginPage ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegisterForm toggleForm={toggleForm} />
      )}
    </Card>
  );
}
