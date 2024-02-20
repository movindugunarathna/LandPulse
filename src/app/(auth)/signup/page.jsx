import RegisterForm from './components/registerForm/registerForm';

export default function SignUpPage() {
  return (
    <>
    <div className="flex items-center justify-center">
      <div className="w-500 bg-gray-300 p-10 flex flex-col items-center gap-6 rounded">
        <p>ssgf</p>
        <RegisterForm/>
      </div>
    </div>        
    </>
  );
}

