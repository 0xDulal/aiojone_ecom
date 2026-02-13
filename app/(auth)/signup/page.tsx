import { SignupForm } from "@/features/auth/signup-form";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                        Aio<span className="text-primary italic">Jone</span>
                    </h1>
                    <p className="text-muted-foreground">Start your shopping journey today</p>
                </div>
                <SignupForm />
            </div>
        </div>
    );
}
