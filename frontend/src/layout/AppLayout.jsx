import { Box } from '@mui/material';
import Sidebar from './Sidebar'; import Navbar from './Navbar'; import Footer from './Footer';
export default function AppLayout({ children }) { return <Box sx={{ display: 'flex', minHeight: '100vh' }}><Sidebar /><Box sx={{ minWidth: 0, flex: 1 }}><Navbar /><Box component="main" sx={{ p: { xs: 2, md: 3 }, maxWidth: 1800, mx: 'auto' }}>{children}<Footer /></Box></Box></Box>; }
