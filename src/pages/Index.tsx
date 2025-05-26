import AuthForm from '@/components/AuthForm';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AuthForm />
    </div>
  );
}
