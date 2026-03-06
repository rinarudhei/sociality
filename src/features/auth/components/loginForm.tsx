'use client';

import { loginSchema } from '@/features/auth/schemas/loginSchema';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '../../../components/ui/field';
import { Input } from '../../../components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/hooks/auth';
import { Spinner } from '@/components/ui/spinner';

type LoginFormProps = {
  toggleForm: () => void;
};
export const LoginForm = ({ toggleForm }: LoginFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate, isPending } = useLogin();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    mutate({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <form
      id='form-login'
      onSubmit={loginForm.handleSubmit(onSubmit)}
      className='flex flex-col gap-5'
    >
      <FieldGroup>
        <Controller
          name='email'
          control={loginForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor='form-login-email'
                className='text-sm font-bold -tracking-[0.02rem] text-white'
              >
                Email
              </FieldLabel>
              <Input
                {...field}
                id='form-login-email'
                aria-invalid={fieldState.invalid}
                placeholder='Enter your email'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='password'
          control={loginForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor='form-login-password'
                className='text-sm font-bold -tracking-[0.02rem] text-white'
              >
                Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id='form-login-password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='h-12'
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align={'inline-end'}>
                  <div
                    className='h-5 w-5 cursor-pointer'
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Eye
                        width={20}
                        height={20}
                        className='text-neutral-500'
                      />
                    ) : (
                      <EyeOff
                        width={20}
                        height={20}
                        className='text-neutral-500'
                      />
                    )}
                  </div>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className='flex-center flex-col gap-4'>
        <Button type='submit' form='form-login' disabled={isPending}>
          {isPending ? <Spinner /> : 'Login'}
        </Button>
        <p className='sm:text-md text-neutral-25 text-center text-sm font-semibold -tracking-[0.02rem]'>
          Don&apos;t have an account?{' '}
          <span
            className='text-primary-200 cursor-pointer font-bold -tracking-[0.02rem]'
            onClick={toggleForm}
          >
            Register
          </span>
        </p>
      </div>
    </form>
  );
};
