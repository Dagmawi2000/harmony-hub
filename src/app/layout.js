import './globals.css';
import { AuthProvider } from './providers';
import Navbar from '../components/Navigation/Navbar';

export const metadata = {
  title: 'Harmony Hub',
  description: 'Personal Wellness and Micro-Community Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
