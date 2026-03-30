import { TaskProvider } from '@/context/TaskContext';
import './globals.css';

import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Job Hunt Tracker',
  description: 'Manage your job hunting tasks and schedule visually and effectively.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
