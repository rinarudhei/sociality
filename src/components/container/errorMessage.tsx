type ErrorMessageProp = {
  errorMessage: string;
};
export default function ErrorMessage({ errorMessage }: ErrorMessageProp) {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center text-red-600'>
        <h2 className='text-2xl font-bold'>Error Loading Data</h2>
        <p className='mt-2'>{errorMessage}</p>
      </div>
    </div>
  );
}
