'use client';
import { Menu, Search, X } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import useMedia from 'use-media';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/stores/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateAvatarFallback } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearCurrentUser } from '../../features/auth/slices/userSlice';
import { clearToken } from '../../features/auth/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Sociality } from './sociality';
import { SearchResultDialog } from '@/features/user/components/searchResultDialog';
import Image from 'next/image';
import { setServers } from 'dns';
import { SearchResultSheet } from '@/features/user/components/searchResultSheet';

export const Navbar = () => {
  const [openSearchField, setOpenSearchField] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const isLargeIsh = useMedia({ minWidth: '640px' });
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showAuthbutton, setShowAuthButton] = React.useState(false);
  const [showSearchResult, setShowSearchResult] = React.useState(false);

  React.useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  }, [user]);

  React.useEffect(() => {
    if (isLargeIsh) {
      setShowAuthButton(false);
      setOpenSearchField(false);
    }
  }, [isLargeIsh]);

  const toggleShowSearchField = () => {
    setOpenSearchField((prev) => !prev);
    setShowAuthButton(false);
    setSearchText('');
  };

  const toggleShowAuthButton = () => {
    setShowAuthButton((prev) => !prev);
    setOpenSearchField(false);
    setSearchText('');
  };

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    dispatch(clearToken());
  };

  const router = useRouter();
  const handleSearch = (key: string) => {
    if (key === 'Enter') {
      setShowSearchResult(true);
    }
  };

  const handleOnChangeTextInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    setSearchText(e.target.value);
    setShowSearchResult(false);
  };

  return (
    <div className='flex-center fixed top-0 z-50 w-screen max-w-360 flex-col border-b border-neutral-900 bg-black focus:ring-0 focus:ring-offset-0 focus:outline-0'>
      {!openSearchField && (
        <nav
          className={clsx(
            'flex h-16 w-screen max-w-360 flex-row items-center justify-between gap-4 bg-black px-4 sm:h-20 sm:px-12 lg:px-30 xl:gap-0'
          )}
        >
          <Sociality />

          {/* Search input field */}

          <SearchResultDialog
            query={searchText}
            showSearchResult={showSearchResult}
            setShowSearchResult={setShowSearchResult}
          >
            <InputGroup
              onKeyDown={(e) => handleSearch(e.key)}
              className={clsx(
                'sm:flex-center hidden h-12 w-full gap-1.5 rounded-full border border-neutral-900 bg-neutral-950 px-0 py-2 shadow-none md:max-w-100 lg:max-w-122.75'
              )}
            >
              <InputGroupInput
                value={searchText}
                placeholder='Search'
                className='text-neutral-25 w-full text-start text-sm font-medium -tracking-[0.03rem] placeholder:text-neutral-600'
                onChange={(e) => setSearchText(e.target.value)}
              />
              <InputGroupAddon align='inline-start'>
                <div className='flex-center h-5 w-5'>
                  <Search size={20} className='text-neutral-500' />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </SearchResultDialog>

          {/* Login/Register Button*/}
          {!isLoggedIn && (
            <div className='sm:flex-center hidden gap-3'>
              <Button
                asChild
                variant='outline'
                size='default'
                className='w-32.5'
              >
                <Link href='/auth'>Login</Link>
              </Button>
              <Button
                asChild
                variant={'default'}
                size={'default'}
                className='w-32.5'
              >
                <Link href='/auth/?register=true'>Register</Link>
              </Button>
            </div>
          )}

          {/* Menus */}
          {(isLoggedIn || !isLargeIsh) && (
            <div className={clsx('flex-center gap-4 lg:gap-6')}>
              <Search
                size={24}
                onClick={toggleShowSearchField}
                className='inline-block sm:hidden'
              />
              {isLoggedIn && (
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex-center cursor-pointer gap-4'>
                    <Avatar size='default' className='sm:size-12'>
                      <AvatarImage
                        src={user.profilePhoto}
                        alt='User Profile Picture'
                        className='object-contain'
                      />
                      <AvatarFallback>
                        {generateAvatarFallback(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <p className='text-neutral-25 text-md hidden font-semibold -tracking-[0.02rem] text-nowrap sm:inline-block'>
                      {user.name}
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          href='/auth'
                          className='text-md cursor-pointer font-semibold tracking-[0.02rem] text-neutral-950'
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div className='inline-block sm:hidden'>
                {showAuthbutton ? (
                  <X
                    size={24}
                    className='cursor-pointer'
                    onClick={toggleShowAuthButton}
                  />
                ) : (
                  <React.Fragment>
                    {!isLoggedIn && (
                      <Menu
                        size={24}
                        className='cursor-pointer'
                        onClick={toggleShowAuthButton}
                      />
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Search input field */}
      {openSearchField && !isLargeIsh && (
        <div className='flex w-screen items-center justify-between gap-4 px-4 py-3'>
          <SearchResultSheet
            setShowSearchResult={setShowSearchResult}
            showSearchResult={showSearchResult}
            query={searchText}
          />
          <InputGroup
            onKeyDown={(e) => handleSearch(e.key)}
            className={clsx(
              'flex-center h-10 w-full gap-1.5 rounded-full border border-neutral-900 bg-neutral-950 px-0 py-2 shadow-none focus-visible:ring-0 md:max-w-122.75'
            )}
          >
            <InputGroupInput
              value={searchText}
              placeholder='Search'
              className='text-neutral-25 w-full text-start text-sm font-medium -tracking-[0.03rem] shadow-none placeholder:text-neutral-600'
              onChange={handleOnChangeTextInput}
            />
            <InputGroupAddon align='inline-start'>
              <div className='flex-center h-5 w-5'>
                <Search size={20} className='text-neutral-500' />
              </div>
            </InputGroupAddon>
            <InputGroupAddon
              align='inline-end'
              className='cursor-pointer'
              onClick={() => setSearchText('')}
            >
              <div className='flex-center h-5 w-5'>
                <Image
                  src='/svg/close-button-small.svg'
                  width={13}
                  height={13}
                  className='size-3.25 text-neutral-500'
                  alt='small close button svg'
                />
              </div>
            </InputGroupAddon>
          </InputGroup>
          <X
            size={24}
            onClick={toggleShowSearchField}
            className='cursor-pointer'
          />
        </div>
      )}

      {/* Login/Register Button*/}
      {showAuthbutton && (
        <div className='flex w-full flex-row items-start justify-center gap-3 px-4 pb-4'>
          <Button
            variant='outline'
            size='default'
            className='h-10 flex-1 gap-2 p-2'
          >
            <Link
              href='/auth'
              className='flex h-full w-full items-center justify-center'
            >
              Login
            </Link>
          </Button>
          <Button
            variant={'default'}
            size={'default'}
            className='h-10 flex-1 gap-2 p-2'
          >
            <Link
              href='/auth/?register=true'
              className='flex h-full w-full items-center justify-center'
            >
              Register
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
