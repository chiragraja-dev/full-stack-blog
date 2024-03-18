import LoginForm from "@/components/LoginForm";


export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {


  return (
    <div className=" flex flex-col w-1/3 m-auto  px-8 items-center h-screen justify-center gap-2">
      <LoginForm />
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
