'use client';

import { Button } from '@/components/ui/button';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { registerSchema } from '@/features/auth/schemas/registerSchema';
import { useRegister } from '@/features/auth/hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

type RegisterFormProps = {
  toggleForm: () => void;
};
export const RegisterForm = ({ toggleForm }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate, isPending } = useRegister(toggleForm);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    mutate({
      name: data.name,
      email: data.email,
      phone: data.phoneNumber,
      password: data.password,
    });
  }

  return (
    <form
      id='form-register'
      onSubmit={registerForm.handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <FieldGroup>
        <Controller
          name='name'
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='form-login-name'>Name</FieldLabel>
              <Input
                {...field}
                id='form-login-name'
                aria-invalid={fieldState.invalid}
                placeholder=''
                autoComplete='off'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='email'
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='form-login-email'>Email</FieldLabel>
              <Input
                {...field}
                id='form-login-email'
                aria-invalid={fieldState.invalid}
                placeholder=''
                autoComplete='off'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='phoneNumber'
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='form-login-phone-number'>
                Nomor Handphone
              </FieldLabel>
              <Input
                {...field}
                id='form-login-phone-number'
                aria-invalid={fieldState.invalid}
                placeholder=''
                autoComplete='off'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='password'
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='form-login-password'>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id='form-login-password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder=''
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
                        className='text-neutral-950'
                      />
                    ) : (
                      <EyeOff
                        width={20}
                        height={20}
                        className='text-neutral-950'
                      />
                    )}
                  </div>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='confirmPassword'
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='form-login-confirm-password'>
                Confirm Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id='form-login-confirm-password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder=''
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
                        className='text-neutral-950'
                      />
                    ) : (
                      <EyeOff
                        width={20}
                        height={20}
                        className='text-neutral-950'
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
      <Button
        type='submit'
        form='form-register'
        className='w-full'
        disabled={isPending}
      >
        {isPending ? <Spinner /> : 'Submit'}
      </Button>
      <p className='sm:text-md text-center text-sm font-semibold -tracking-[0.02rem] text-neutral-950'>
        Already have an account?{' '}
        <span
          className='text-primary-300 cursor-pointer font-bold -tracking-[0.02rem]'
          onClick={toggleForm}
        >
          Log In
        </span>
      </p>
    </form>
  );
};
