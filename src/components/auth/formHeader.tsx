export function FormHeader() {
  return (
    <>
      <h3 className='text-3xl font-semibold mb-5'>Sign up</h3>
      <p className='mb-5'>
        Have an account?{" "}
        <a href='/' className='text-blue-600 dark:text-blue-500 underline'>
          Sign in
        </a>
      </p>
    </>
  );
}
